"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, type Resolver } from "react-hook-form";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { useCreateBarMenuMutation } from "@/store/api/bar-menu/bar-menu-api";
import type { TCreateBarMenuArgs } from "@/store/api/bar-menu/bar-menu.types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
// import FileUploader from "@/components/form/file-uploader";
import FileUploader from "@/components/form/file-uploader2";
import InfoIcon from "@/components/icons/InfoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { initialValues, type TBarMenuFormType } from "./utils";
import { validationSchema } from "./validation-schema";

function CategoryForm() {
  const { setClose } = useDialogContext();
  const [uploadAMedia] = useUploadAMediaMutation();
  const [createBarMenu] = useCreateBarMenuMutation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<TBarMenuFormType>({
    defaultValues: initialValues,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<TBarMenuFormType>,
  });

  const onSubmit = async (data: TBarMenuFormType) => {
    const toastId = toast({
      variant: "loading",
      title: "Creating Category",
      description: "Please wait while we create your category",
    });

    try {
      const formData: TCreateBarMenuArgs = {
        name: data?.name,
        status: "Active",
      };

      if (data?.media?.length) {
        for (let i = 0; i < data?.media?.length; i++) {
          const mediaCurrentData = data?.media[i];

          const { data: mediaData } =
            (await uploadAMedia({
              file: mediaCurrentData,
              tags: ["BarMenu"],
            }).unwrap()) || {};

          if (mediaData) {
            formData.media = {
              id: mediaData?.id,
              isFeatured: true,
            };
          }
        }
      }

      await createBarMenu(formData).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Category Created Successfully!",
        description: getApiErrorMessage(
          undefined,
          "Congratulations! You have successfully created a new category.",
        ),
      });

      setClose();
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Category Creation Failed",
          description:
            "There was an error creating the category. Please try again later.",
        }),
      });
      setClose();
    }
  };

  const media = useWatch({
    name: "media",
    control,
    defaultValue: initialValues?.media,
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mt-1 space-y-4"
    >
      <Input
        type="text"
        placeholder="Enter Name"
        label="Name"
        {...register("name")}
        error={errors.name?.message}
        rightContent={
          errors.name && <InfoIcon className="me-2 h-4 w-4 text-[#F97066]" />
        }
        required
      />

      <FileUploader
        files={media}
        setFiles={(newFiles) => {
          setValue("media", newFiles);
        }}
        isMultiple={false}
        aspectRatio={16 / 9}
        cropShape="rect"
        cropWidth={500}
        cropHeight={300}
        label="Upload New image"
        error={errors?.media?.message}
      />

      <div className="grid grid-cols-2 gap-3">
        <Button
          fullWidth
          size="lg"
          color="secondary"
          type="button"
          onClick={setClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          size="lg"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          rounded="lg"
        >
          <ButtonLoadingContent
            isLoading={isSubmitting}
            actionContent="Add"
            loadingContent="Creating"
          />
        </Button>
      </div>
    </form>
  );
}

export default CategoryForm;
