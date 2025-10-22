"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { uploadOnlyRequiredImages } from "@/lib/media/upload-only-required-images";
import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";
import type { TNullish } from "@/store/api/common-api-types";
import { useUpdateAnInventoryItemMutation } from "@/store/api/inventory-item/inventory-item-api";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import FileUploader from "@/components/form/file-uploader";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import { useToast } from "@/components/ui/use-toast";

import { defaultFormValues, type IFormInput } from "./utils";

interface IChangeImageFormProps {
  item?: TGroupInventoryItemData | TNullish;
}
function ChangeImageForm({ item }: IChangeImageFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [updateAnInventoryItem] = useUpdateAnInventoryItemMutation();
  const [uploadAMedia] = useUploadAMediaMutation();
  const { setClose } = useDialogContext();
  const toastProps = useToast();

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
      const fetchImagesToUrl = async () => {
        setIsLoading(true);
        const files: File[] = [];
        for (let index = 0; index < (item?.media?.length ?? 0); index++) {
          const media = item?.media?.[index];
          const file = await urlToFile({
            url: media?.url ?? "",
            filename: media?.originalName ?? undefined,
            mimeType: media?.type as TMimeType,
            lastModified: new Date(
              media?.updatedAt ||
                media?.deletedAt ||
                media?.createdAt ||
                new Date(),
            ).getTime(),
          });
          if (file) {
            files.push(file);
          }
        }

        if (files?.length) {
          setValue("media", files);
        }
        setIsLoading(false);
      };

      fetchImagesToUrl();
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
    const toastId = toastProps?.toast({
      variant: "loading",
      title: "Updating Product Category Image",
      description: "Please wait while we update your product category image",
    });

    try {
      // compare media
      const { finalMediaList, isAllExistingFiles } =
        await uploadOnlyRequiredImages({
          filesData: {
            mainImage: data?.media?.[0],
            galleryImages: data?.media?.slice(1),
          },
          mediaList: item?.media,
          tags: ["Product"],
          uploadAMedia,
          toastProps,
          toastMode: "group",
        });

      if (isAllExistingFiles) {
        toastId.update({
          id: toastId.id,
          variant: "success",
          title: "Existing Image cannot be updated",
          description:
            "The Product Category image you provided is already available in the system hence skipping the upload",
        });
        setClose();
        return;
      }

      const res = await updateAnInventoryItem({
        slug: item?.slug,
        body: {
          media: finalMediaList,
        },
      }).unwrap();

      if (!res?.success) {
        throw new Error(res?.message || "Something went wrong!");
      }

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Product Category Image Updated",
        description: "The product category image has been updated successfully",
      });
      setClose();
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
      <LabelErrorWrapper error={errors?.media?.message}>
        <FileUploader
          files={media}
          setFiles={(newFiles) => {
            setValue("media", newFiles);
          }}
          isMultiple={false}
          isLoading={isLoading}
        />
      </LabelErrorWrapper>

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
