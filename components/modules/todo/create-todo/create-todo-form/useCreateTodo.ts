import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { type Resolver, useForm, useWatch } from "react-hook-form";

import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import { handleFormValidationErrors } from "@/lib/error/handleFormValidationErrors";
import {
  useCreateTodoMutation,
  useGetAllTodoTagsQuery,
} from "@/store/api/todo/todo-api";
import { ETodoStatus, type TCreateTodoArgs } from "@/store/api/todo/todo.types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
import { useToast } from "@/components/ui/use-toast";

import type { TFormInputs } from "./types";
import { initialState } from "./utils";
import validationSchema from "./validator";

const useCreateTodo = () => {
  const { setClose } = useDialogContext();
  const { data: getAllTodoTagsRes, ...getAllTodoTagsApiState } =
    useGetAllTodoTagsQuery();
  const getAllTodoTagsData = getAllTodoTagsRes?.data;
  const [createTodo] = useCreateTodoMutation();
  const { toast } = useToast();

  const createTodoFormProps = useForm<TFormInputs>({
    defaultValues: initialState,
    resolver: yupResolver(validationSchema) as unknown as Resolver<TFormInputs>,
  });

  const tags = useWatch({
    control: createTodoFormProps.control,
    name: "tags",
    defaultValue: [],
  });

  const priority = useWatch({
    control: createTodoFormProps.control,
    name: "priority",
    defaultValue: false,
  });

  const tagOptions: IOption[] = useMemo(
    () =>
      getAllTodoTagsData?.map(
        (tag): IOption => ({
          label: tag ?? "",
          value: String(tag ?? -1),
        }),
      ) ?? [],
    [getAllTodoTagsData],
  );

  const onSubmit = createTodoFormProps?.handleSubmit(
    async (data: TFormInputs) => {
      const toastId = toast({
        variant: "loading",
        title: "Creating To-Do Item",
        description: "Please wait while we create your to-do item.",
      });
      const dueDate = convertLocalToUTC({
        localDateTime: data?.dueDate ?? undefined,
      });
      try {
        const formData: TCreateTodoArgs = {
          ...data,
          dueDate,
          tags: data?.tags?.map((tag) => String(tag?.value ?? "-1")),
          status: ETodoStatus.NOT_COMPLETED,
        };

        await createTodo(formData).unwrap();

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Successfully Created To-Do Item",
          description:
            "Congratulations! You have successfully added to your list.",
        });

        createTodoFormProps.reset();
        setClose();
      } catch (error) {
        console.error("🚀 ~ create todo api ~ error:", error);

        handleFormValidationErrors(error, createTodoFormProps.setError);
        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Failed to Create To-Do Item",
          description: getApiErrorMessage(error, "Please try again later."),
        });
      }
    },
  );

  const addANewTodoTag = async (newTodoName: string) => {
    const toastId = toast({
      variant: "loading",
      title: "Creating To-Do Tag Item",
      description: "Please wait while we create your tag.",
    });
    try {
      toastId?.update({
        id: toastId.id,
        variant: "success",
        title: "Successfully Created To-Do Tag Item",
        description:
          "Congratulations! You have successfully added a new tag to your list.",
      });
      createTodoFormProps.reset();
      setClose();
    } catch (error) {
      console.error("🚀 ~ create todo api ~ error:", error);
      toastId?.update({
        id: toastId.id,
        variant: "error",
        title: "Failed to Create To-Do Tag Item",
        description: "Please try again later.",
      });
    }
  };

  return {
    createTodoFormProps,
    onSubmit,
    tagOptions,
    getAllTodoTagsApiState,
    addANewTodoTag,
    tags,
    priority,
  };
};

export default useCreateTodo;
