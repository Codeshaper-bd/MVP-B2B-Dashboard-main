import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { type Resolver, useForm } from "react-hook-form";

import { getApiErrorMessage } from "@/lib/error/get-api-error-message";
import { handleFormValidationErrors } from "@/lib/error/handleFormValidationErrors";
import { compareFilesAndMediaList } from "@/lib/media/compare-files-and-media-list";
import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";
import {
  useCreateABarMutation,
  useGetABarQuery,
  useUpdateABarMutation,
} from "@/store/api/bars/bars-api";
import type { TCreateBarArgs } from "@/store/api/bars/bars.types";
import type { TStatus } from "@/store/api/common-api-types";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast, type TUseToastReturnType } from "@/components/ui/use-toast";

import type { ICreateBarFormProps } from "./bar-form";
import type { TBarFormInputs } from "./types";
import { initialBarFormValues } from "./utils";
import { validationSchema } from "./validator";

const useBarForm = ({ isEdit, barSlug }: ICreateBarFormProps) => {
  const [uploadAMedia] = useUploadAMediaMutation();
  const [createABar] = useCreateABarMutation();
  const [updateABar] = useUpdateABarMutation();

  const { data: getABarRes, ...getABarApiState } = useGetABarQuery({
    slug: barSlug,
  });
  const getABarData = getABarRes?.data;

  const { setClose } = useDialogContext();

  const formProps = useForm<TBarFormInputs>({
    defaultValues: initialBarFormValues,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<TBarFormInputs>,
  });
  const toastHookProps = useToast();

  // roles data

  useEffect(() => {
    if (isEdit && getABarData) {
      const fetchData = async () => {
        const formData = {
          name: getABarData?.name ?? "",
          status: (getABarData?.status ?? "") as TStatus,
          barImage: null as File | null,
        };
        const profileImage = getABarData?.media;
        if (profileImage) {
          formData.barImage = await urlToFile({
            url: profileImage.url ?? "",
            filename: profileImage.originalName ?? undefined,
            mimeType: profileImage.type as TMimeType,
            lastModified: new Date(
              profileImage?.updatedAt ||
                profileImage?.deletedAt ||
                profileImage?.createdAt ||
                new Date(),
            ).getTime(),
          });
        }

        formProps.reset(formData);
      };
      fetchData();
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getABarData, isEdit, barSlug]);

  const onSubmit =
    ({
      toastHookProps,
      setIsSubmitting,
    }: {
      toastHookProps: TUseToastReturnType;
      setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    }) =>
    async (data: TBarFormInputs) => {
      setIsSubmitting?.(true);
      const toastId = toastHookProps.toast({
        variant: "loading",
        title: isEdit ? "Updating Bar" : "Creating Bar",
        description: isEdit
          ? "Please wait while we update the Bar"
          : "Please wait while we create your Bar",
      });

      try {
        const finalData: TCreateBarArgs = {
          name: data?.name,
          status: data?.status,
          media: undefined,
        };

        // compare image

        const { categorizedFiles, isAllExistingFiles } =
          compareFilesAndMediaList({
            files: [data.barImage],
            mediaList: [getABarData?.media],
            options: {
              checkLastModified: true,
              normalizeMimeType: true,
            },
          });

        if (!isAllExistingFiles) {
          for (const file of categorizedFiles || []) {
            if (file?.type === "new") {
              const uploadedFileRes = await uploadAMedia({
                file: file?.file,
                tags: ["BarMenu"],
              }).unwrap();

              if (uploadedFileRes?.data) {
                finalData.media = {
                  id: uploadedFileRes?.data?.id,
                  isFeatured: true,
                };
              }
            }
          }
        }

        if (isEdit) {
          await updateABar({
            slug: barSlug,
            body: finalData,
          }).unwrap();
        } else {
          await createABar(finalData).unwrap();
        }

        toastId.update({
          id: toastId.id,
          variant: "success",
          title: isEdit
            ? "Bar Updated Successfully!"
            : "Bar Created Successfully!",
          description: isEdit
            ? "The Bar details have been successfully updated."
            : "Congratulations! You have successfully created an Bar.",
        });

        formProps.reset();
        setClose();
      } catch (error: unknown) {
        console.error("Error creating Bar:", error);

        handleFormValidationErrors<TBarFormInputs>(error, formProps.setError);

        toastId.update({
          id: toastId.id,
          variant: "error",
          title: `${isEdit ? "Bar Update" : "Bar Creation"} Failed`,
          description: getApiErrorMessage(error, "An error occurred"),
        });
      } finally {
        setIsSubmitting?.(false);
      }
    };
  return {
    formProps,
    onSubmit,
    toastHookProps,
    getABarData,
    getABarApiState,
  };
};

export default useBarForm;
