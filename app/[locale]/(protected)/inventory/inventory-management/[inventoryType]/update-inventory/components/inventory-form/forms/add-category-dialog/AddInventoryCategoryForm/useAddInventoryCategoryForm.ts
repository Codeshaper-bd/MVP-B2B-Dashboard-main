import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import {
  type Resolver,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";

import { convertToNumber } from "@/lib/data-types/number";
import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { compareFilesAndMediaList } from "@/lib/media/compare-files-and-media-list";
import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateInventoryCategoryMutation,
  useGetAnInventoryCategoryQuery,
  useUpdateAnInventoryCategoryMutation,
} from "@/store/api/inventory-category/inventory-category-api";
import type {
  TCommonCreateInventoryCategoryArgs,
  TCreateAlcoholicInventoryCategoryArgs,
  TCreateInventoryCategoryArgs,
  TCreateNonAlcoholicInventoryCategoryArgs,
} from "@/store/api/inventory-category/inventory-category.types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast } from "@/components/ui/use-toast";

import {
  type IAddInventoryCategoryProps,
  type TOnHandleSubmit,
  type IAddInventoryCategoryFormData,
} from "./types";
import {
  initialState,
  isAlcoholicCategory,
  isNonAlcoholicCategory,
} from "./utils";
import { validationSchema } from "./validator";

const useAddInventoryCategoryForm = (
  props: Omit<IAddInventoryCategoryProps, "targetButton">,
) => {
  const [createInventoryCategory] = useCreateInventoryCategoryMutation();
  const [updateInventoryCategory] = useUpdateAnInventoryCategoryMutation();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const dialogHookProps = useDialogContext();
  const toastHookProps = useToast();
  const { data: getAnInventoryCategoryRes, ...getAnInventoryCategoryApiState } =
    useGetAnInventoryCategoryQuery(
      {
        slug: props?.slug,
      },
      {
        skip: !checkIsValidId(props?.slug, {
          type: "string",
        }),
      },
    );
  const [uploadAMedia] = useUploadAMediaMutation();
  const addOrEditInventoryCategoryFormProps =
    useForm<IAddInventoryCategoryFormData>({
      defaultValues: initialState,
      resolver: yupResolver(
        validationSchema,
      ) as unknown as Resolver<IAddInventoryCategoryFormData>,
    });

  const categoryType = useWatch({
    control: addOrEditInventoryCategoryFormProps.control,
    name: "categoryType",
    defaultValue: initialState?.categoryType,
  });

  const unit = useWatch({
    control: addOrEditInventoryCategoryFormProps.control,
    name: "unit",
    defaultValue: initialState?.unit,
  });

  const handleOnSubmit: TOnHandleSubmit = useCallback(
    ({
      reset,
      dialogHookProps: { setClose },
      toastHookProps: { toast },
      uploadAMedia,
      createInventoryCategory,
      updateInventoryCategory,
      toastHookProps,
      setIsSubmitting,
      isEditMode,
      slug,
    }): SubmitHandler<IAddInventoryCategoryFormData> =>
      async (data) => {
        const toastId = toast({
          variant: "loading",
          title: "Creating Inventory Category...",
          description: "Please wait while we create your Inventory Category",
        });

        try {
          setIsSubmitting?.(true);
          let payload: TCreateInventoryCategoryArgs | null = null;
          const commonPayload: TCommonCreateInventoryCategoryArgs = {
            name: data?.name,
            unit: data?.unit,
            notes: data?.notes ?? "",
            status: data?.status,
            media: undefined,
          };

          // compare image

          const { categorizedFiles, isAllExistingFiles } =
            compareFilesAndMediaList({
              files: [data?.image],
              mediaList: getAnInventoryCategoryRes?.data?.media
                ? [getAnInventoryCategoryRes.data.media]
                : [],
              options: {
                checkLastModified: false,
                normalizeMimeType: true,
              },
            });

          if (!isAllExistingFiles) {
            for (const file of categorizedFiles || []) {
              if (file?.type === "new") {
                const uploadedFileRes = await uploadAMedia({
                  file: file?.file,
                  tags: ["Product"],
                }).unwrap();

                if (uploadedFileRes?.data) {
                  commonPayload.media = {
                    id: uploadedFileRes?.data?.id,
                    isFeatured: true,
                  };
                }
              }
            }
          }

          if (data?.categoryType === "ALCOHOLIC") {
            const alcoholicPayload: TCreateAlcoholicInventoryCategoryArgs = {
              categoryType: data?.categoryType,
              density: convertToNumber({
                value:
                  typeof data === "object" &&
                  "density" in data &&
                  data?.density,
                digit: 2,
              }),
            };
            payload = {
              ...commonPayload,
              ...alcoholicPayload,
            };
          } else if (data?.categoryType === "NON_ALCOHOLIC") {
            const nonAlcoholicPayload: TCreateNonAlcoholicInventoryCategoryArgs =
              {
                categoryType: data?.categoryType,
              };
            payload = {
              ...commonPayload,
              ...nonAlcoholicPayload,
            };
          }

          if (!payload) {
            throw new Error(
              "Inventory Category payload is not valid. Please check the form data.",
            );
          }

          if (isEditMode) {
            if (
              !checkIsValidId(props?.slug, {
                type: "string",
              })
            ) {
              throw new Error(
                "Inventory Category slug is required for editing",
              );
            }
            await updateInventoryCategory({
              slug,
              body: payload,
            }).unwrap();
          } else {
            await createInventoryCategory(payload).unwrap();
          }

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: `Inventory Category created`,
            description: getApiErrorMessage(
              undefined,
              `The Inventory Category has been created successfully`,
            ),
          });
          reset();
          setClose();
        } catch (error) {
          console.error(error);
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: "Failed to create Inventory Category",
              description:
                "Something went wrong while creating Inventory Category",
            }),
          });
        } finally {
          setIsSubmitting?.(false);
        }
      },
    [props?.slug, getAnInventoryCategoryRes?.data],
  );

  useEffect(() => {
    if (
      props?.isEditMode &&
      props?.slug &&
      !getAnInventoryCategoryApiState?.isLoading &&
      !getAnInventoryCategoryApiState?.isFetching &&
      !getAnInventoryCategoryApiState?.isError &&
      getAnInventoryCategoryApiState?.isSuccess &&
      getAnInventoryCategoryRes?.data
    ) {
      const fetchImageToFiles = async () => {
        let formdata: IAddInventoryCategoryFormData | null = null;
        const commonPayload: Omit<
          TCommonCreateInventoryCategoryArgs,
          "media"
        > & {
          image?: File | null;
        } = {
          name: getAnInventoryCategoryRes?.data?.name ?? "",
          unit: getAnInventoryCategoryRes?.data?.unit ?? "G_PER_ML",
          notes: getAnInventoryCategoryRes?.data?.notes,
          status: getAnInventoryCategoryRes?.data?.status,
          image: undefined,
        };

        if (isAlcoholicCategory(getAnInventoryCategoryRes?.data)) {
          const alcoholicPayload: TCreateAlcoholicInventoryCategoryArgs = {
            categoryType: getAnInventoryCategoryRes?.data?.categoryType,
            density: convertToNumber({
              value: getAnInventoryCategoryRes?.data?.density,
              digit: 2,
            }),
          };
          formdata = {
            ...commonPayload,
            ...alcoholicPayload,
          };
        } else if (isNonAlcoholicCategory(getAnInventoryCategoryRes?.data)) {
          const nonAlcoholicPayload: TCreateNonAlcoholicInventoryCategoryArgs =
            {
              categoryType: getAnInventoryCategoryRes?.data?.categoryType,
            };
          formdata = {
            ...commonPayload,
            ...nonAlcoholicPayload,
          };
        }
        if (!formdata) {
          throw new Error(
            "Inventory Category formdata is not valid. Please check the form data.",
          );
        }

        addOrEditInventoryCategoryFormProps.reset(formdata);
      };
      fetchImageToFiles();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.isEditMode,
    props?.slug,
    getAnInventoryCategoryRes?.data,
    getAnInventoryCategoryApiState?.isLoading,
    getAnInventoryCategoryApiState?.isFetching,
    getAnInventoryCategoryApiState?.isError,
    getAnInventoryCategoryApiState?.isSuccess,
  ]);

  /* responsible for fetching the image file and updating the form state start */
  useEffect(() => {
    if (
      props?.isEditMode &&
      props?.slug &&
      !getAnInventoryCategoryApiState?.isLoading &&
      !getAnInventoryCategoryApiState?.isFetching &&
      !getAnInventoryCategoryApiState?.isError &&
      getAnInventoryCategoryApiState?.isSuccess &&
      getAnInventoryCategoryRes?.data
    ) {
      const iife = async () => {
        const categoryImage = getAnInventoryCategoryRes?.data?.media;
        if (categoryImage) {
          setIsImageLoading(true);
          const mediaFile =
            (await urlToFile({
              url: categoryImage.url ?? "",
              filename: categoryImage.originalName ?? undefined,
              mimeType: categoryImage.type as TMimeType,
              lastModified: new Date(
                categoryImage?.updatedAt ||
                  categoryImage?.deletedAt ||
                  categoryImage?.createdAt ||
                  new Date(),
              ).getTime(),
            })) ?? null;
          addOrEditInventoryCategoryFormProps.setValue("image", mediaFile);
          setIsImageLoading(false);
        }
      };
      iife();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.isEditMode,
    props?.slug,
    getAnInventoryCategoryRes?.data,
    getAnInventoryCategoryApiState?.isLoading,
    getAnInventoryCategoryApiState?.isFetching,
    getAnInventoryCategoryApiState?.isError,
    getAnInventoryCategoryApiState?.isSuccess,
  ]);
  /* responsible for fetching the image file and updating the form state end */

  useEffect(() => {
    if (props?.categoryType) {
      addOrEditInventoryCategoryFormProps.setValue(
        "categoryType",
        props?.categoryType,
      );
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.categoryType]);

  return {
    handleOnSubmit,
    addOrEditInventoryCategoryFormProps,
    dialogHookProps,
    toastHookProps,
    uploadAMedia,
    watchValues: {
      categoryType,
      unit,
    },
    handleSubmitAssistProps: {
      reset: addOrEditInventoryCategoryFormProps.reset,
      dialogHookProps,
      toastHookProps,
      uploadAMedia,
      setIsSubmitting: props?.setIsSubmitting,
      createInventoryCategory,
      updateInventoryCategory,
      isEditMode: props?.isEditMode,
      slug: props?.slug,
    },
    isImageLoading,
  };
};

export default useAddInventoryCategoryForm;
