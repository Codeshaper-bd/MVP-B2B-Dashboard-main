import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import {
  type Resolver,
  useForm,
  useWatch,
  type UseFormReturn,
} from "react-hook-form";

import { contentPerPageOptions } from "@/config/client-config";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import {
  useCreateAnAddOnMutation,
  useGetAnAddOnQuery,
  useUpdateAnAddOnMutation,
} from "@/store/api/add-ons/add-ons-api";
import type {
  TAddOn,
  TCreateAddOnArgs,
  TCreateAnAddOnMutation,
  TUpdateAnAddOnMutation,
} from "@/store/api/add-ons/add-ons.types";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetAllMediaQuery } from "@/store/api/media/media-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { IAddonFormProps } from ".";
import { initialAddonsFormValues, type TAddonFormInputs } from "./utils";
import createAddonFormValidationSchema from "./validator";

const useAddonForms = ({
  isEdit,
  selectedSlug,
  onSuccess,
  isSubmitting,
  setIsSubmitting,
}: IAddonFormProps) => {
  const [createAnAddOn] = useCreateAnAddOnMutation();
  const [updateAnAddOn] = useUpdateAnAddOnMutation();

  const { data: getAnAddonDataRes, ...getAnAddOnApiState } = useGetAnAddOnQuery(
    {
      slug: selectedSlug,
    },
    {
      skip: !selectedSlug,
    },
  );

  const getAnAddonData = getAnAddonDataRes?.data;

  const { data: getAllMediaRes, ...getAllMediaApiState } = useGetAllMediaQuery({
    pageSize: contentPerPageOptions[16],
    tags: ["AddOn"],
  });
  const getAllMediaData = getAllMediaRes?.data;

  const toastHookProps = useToast();
  const { setClose } = useDialogContext();

  const formProps = useForm<TAddonFormInputs>({
    defaultValues: initialAddonsFormValues,
    resolver: yupResolver(
      createAddonFormValidationSchema(isEdit),
    ) as unknown as Resolver<TAddonFormInputs>,
  });

  const icon = useWatch({
    control: formProps.control,
    name: "icon",
    defaultValue: initialAddonsFormValues?.icon,
  });

  useEffect(() => {
    if (isEdit && getAnAddonData) {
      formProps.reset({
        name: getAnAddonData?.name ?? "",
        description: getAnAddonData?.description ?? "",
        price: getAnAddonData?.price ?? "",
        maxQty: getAnAddonData?.maxQty ?? -1,
        status: getAnAddonData?.status ?? "Active",
        icon: {
          id: getAnAddonData?.media?.id ?? -1,
          isFeatured: getAnAddonData?.media?.isFeatured ?? false,
        },
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAnAddonData, isEdit, selectedSlug]);

  const onSubmit = useCallback(
    ({
      toastHookProps,
      createAnAddOn,
      updateAnAddOn,
      formProps,
      setClose,
      onSuccess,
      isEdit,
      selectedSlug,
    }: {
      toastHookProps: TUseToastReturnType;
      createAnAddOn: TCreateAnAddOnMutation;
      updateAnAddOn: TUpdateAnAddOnMutation;
      formProps: UseFormReturn<TAddonFormInputs>;
      setClose: () => void;
      isEdit: boolean | undefined;
      selectedSlug: string | TNullish;
      onSuccess?: (data: TAddOn) => void;
      isSubmitting?: boolean;
      setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    }) =>
      async (data: TAddonFormInputs) => {
        const toastId = toastHookProps.toast({
          variant: "loading",
          title: `${isEdit ? "Updating" : "Creating"} Addons`,
          description: `Please wait while we ${isEdit ? "update" : "create"} the Addons`,
        });
        setIsSubmitting?.(true);
        const formData: TCreateAddOnArgs = {
          name: data?.name,
          description: data?.description,
          price: Number(data?.price),
          maxQty: Number(data?.maxQty),
          status: data?.status,
          media: {
            id: Number(data?.icon?.id ?? -1),
            isFeatured: data?.icon?.isFeatured ?? false,
          },
        };

        try {
          if (isEdit) {
            if (!selectedSlug) {
              throw new Error("Slug is required to update an add-on.");
            }

            const updateAddonsRes = await updateAnAddOn({
              slug: selectedSlug,
              body: formData,
            }).unwrap();

            if (!updateAddonsRes?.success) {
              throw new Error(
                updateAddonsRes?.message || "Failed to update an add-on.",
              );
            }

            if (!updateAddonsRes?.data) {
              throw new Error(
                "No addon data found in the response of update an add-on.",
              );
            }

            onSuccess?.(updateAddonsRes?.data);
            setIsSubmitting?.(false);
          } else {
            const createAddonsRes = await createAnAddOn(formData).unwrap();

            if (!createAddonsRes?.success) {
              throw new Error(
                createAddonsRes?.message || "Failed to create an AddOn.",
              );
            }

            if (!createAddonsRes?.data) {
              throw new Error(
                "No addon data found in the response of create an addon.",
              );
            }

            onSuccess?.(createAddonsRes?.data);
            setIsSubmitting?.(false);
          }

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: `Add-on ${isEdit ? "Updated" : "Created"} Successfully!`,
            description: `The add-on details have been successfully ${isEdit ? "updated" : "created"}.`,
          });

          formProps.reset();
          setClose();
        } catch (error) {
          console.error("Error creating ticket tier:", error);
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: `Add-on ${isEdit ? "Update" : "Creation"} Failed`,
              description: `An error occurred while ${isEdit ? "updating" : "creating"} the add-on.`,
            }),
          });
          setIsSubmitting?.(false);
        }
      },
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    formProps,
    onSubmit,
    onSubmitAssistProps: {
      toastHookProps,
      createAnAddOn,
      updateAnAddOn,
      formProps,
      setClose,
      onSuccess,
      isEdit,
      selectedSlug,
      isSubmitting,
      setIsSubmitting,
    },
    toastHookProps,
    getAllMediaApiState,
    getAllMediaData,
    getAnAddonData,
    getAnAddOnApiState,
    icon,
  };
};

export default useAddonForms;
