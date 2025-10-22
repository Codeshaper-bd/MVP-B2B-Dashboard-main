"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { compareFilesAndMediaList } from "@/lib/media/compare-files-and-media-list";
import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";
import { useUpdateABarMenuMutation } from "@/store/api/bar-menu/bar-menu-api";
import type { TBarMenu } from "@/store/api/bar-menu/bar-menu.types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
// import FileUploader from "@/components/form/file-uploader";
import FileUploader from "@/components/form/file-uploader2";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { defaultFormValues, type IFormInput } from "./utils";

interface IChangeImageFormProps {
  item?: TBarMenu;
}
function ChangeImageForm({ item }: IChangeImageFormProps) {
  const [uploadAMedia] = useUploadAMediaMutation();
  const [updateABarMenu] = useUpdateABarMenuMutation();
  const { setClose } = useDialogContext();
  const { toast } = useToast();
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<IFormInput>({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (item?.media) {
      setIsLoadingImage(true);
      const fetchImageToUrl = async () => {
        try {
          const file = await urlToFile({
            url: item?.media?.url ?? "",
            filename: item?.media?.originalName ?? undefined,
            mimeType: item?.media?.type as TMimeType,
            lastModified: new Date(
              item?.media?.updatedAt ||
                item?.media?.deletedAt ||
                item?.media?.createdAt ||
                new Date(),
            ).getTime(),
          });
          if (file) {
            setValue("media", [file]);
          }
        } catch (error) {
          console.error("Error loading image:", error);
        } finally {
          setIsLoadingImage(false);
        }
      };
      fetchImageToUrl();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.media]);

  const media = useWatch({
    control,
    name: "media",
    defaultValue: defaultFormValues.media,
  });
  const onSubmit = async (data: IFormInput) => {
    const toastId = toast({
      variant: "loading",
      title: "Updating Product Category Image",
      description: "Please wait while we update your product category image",
    });
    try {
      // compare media
      const { categorizedFiles, isAllExistingFiles } = compareFilesAndMediaList(
        {
          files: data.media,
          mediaList: item?.media ? [item.media] : null,
          options: {
            checkLastModified: true,
            normalizeMimeType: true,
          },
        },
      );
      if (isAllExistingFiles) {
        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Existing Image cannot be updated",
          description:
            "The Product Category image is already in use and cannot be updated",
        });
      }
      if (!isAllExistingFiles) {
        // upload a new file
        categorizedFiles?.map(async (file) => {
          if (file?.type === "new") {
            const uploadedFileRes = await uploadAMedia({
              file: file?.file,
              tags: ["BarMenu"],
            }).unwrap();

            // update product category
            if (uploadedFileRes?.success) {
              await updateABarMenu({
                slug: item?.slug,
                body: {
                  media: {
                    id: uploadedFileRes?.data?.id ?? 0,
                    isFeatured: item?.media?.isFeatured ?? false,
                  },
                },
              }).unwrap();

              toastId.update({
                id: toastId.id,
                variant: "success",
                title: "Product Category Image Updated",
                description:
                  "The product category image has been updated successfully",
              });
              setClose();
            }
          }
        });
      }
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Product Category Image Update Failed",
          description:
            "Something went wrong while updating product category image.",
        }),
      });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* <LabelErrorWrapper error={errors?.media?.message}>
        <FileUploader
          files={media}
          setFiles={(newFiles) => {
            setValue("media", newFiles);
          }}
          isMultiple={false}
        />
      </LabelErrorWrapper> */}
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
        // label="Upload New image"
        isLoading={isLoadingImage}
        error={errors?.media?.message}
      />

      <div className="grid grid-cols-2 gap-4 pt-4">
        <Button
          color="secondary"
          fullWidth
          type="button"
          onClick={setClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button color="primary" fullWidth type="submit" disabled={isSubmitting}>
          <ButtonLoadingContent
            isLoading={isSubmitting}
            actionContent="Change Image"
          />
        </Button>
      </div>
    </form>
  );
}

export default ChangeImageForm;
