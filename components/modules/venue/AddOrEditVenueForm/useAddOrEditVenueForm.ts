import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect } from "react";
import {
  type Resolver,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";

import {
  getApiErrorMessage,
  getApiErrorMessages,
} from "@/lib/error/get-api-error-message";
import { uploadOnlyRequiredImages } from "@/lib/media/upload-only-required-images";
import {
  urlToFile,
  type TMimeType,
} from "@/lib/media/url-to-file/using-fetch-api/url-to-file";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import {
  useCreateAVenueMutation,
  useGetAVenueQuery,
  useUpdateAVenueMutation,
} from "@/store/api/venues/venues-api";
import { type TCreateVenueArgs } from "@/store/api/venues/venues.types";
import { useDialogContext } from "@/components/CustomizedDialog/DialogContext";
import { useToast } from "@/components/ui/use-toast";

import {
  type IAddOrEditVenueProps,
  type TOnHandleSubmit,
  type IAddOrEditVenueFormData,
} from "./types";
import { initialState } from "./utils";
import { validationSchema } from "./validator";

const useAddOrEditVenueForm = (
  props: Omit<IAddOrEditVenueProps, "targetButton">,
) => {
  const { isEditMode, slug, isPrimaryMode, onSuccessAddVenue } = props || {};
  const dialogHookProps = useDialogContext();
  const toastHookProps = useToast();
  const [createAVenue] = useCreateAVenueMutation();
  const [updateAVenue] = useUpdateAVenueMutation();
  const { data: getAVenueRes, ...getAVenueApiState } = useGetAVenueQuery(
    {
      slug,
    },
    {
      skip: !slug,
    },
  );
  const getAVenueData = getAVenueRes?.data;
  const [uploadAMedia] = useUploadAMediaMutation();
  const addOrEditVenueFormProps = useForm<IAddOrEditVenueFormData>({
    defaultValues: initialState,
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<IAddOrEditVenueFormData>,
  });

  useEffect(() => {
    if (isEditMode && slug && getAVenueData) {
      const mainImage = getAVenueData?.media?.find((m) => m.isFeatured);
      const galleryMultipleImages = getAVenueData?.media?.filter(
        (aMedia) => aMedia?.id !== mainImage?.id,
      );

      const fetchImagesToFiles = async () => {
        const formData: IAddOrEditVenueFormData = {
          name: getAVenueData?.name,
          email: getAVenueData?.email,
          phone: getAVenueData?.phone,
          address: getAVenueData?.address,
          city: getAVenueData?.city,
          state: getAVenueData?.state,
          postalCode: getAVenueData?.postalCode,
          countryCode: getAVenueData?.countryCode,
          latitude: getAVenueData?.latitude,
          longitude: getAVenueData?.longitude,
          capacity: getAVenueData?.capacity,
          status: getAVenueData?.status,
          isPrimary: isPrimaryMode || getAVenueData?.isPrimary,
          mainImage: null,
          galleryMultipleImages: null,
        };

        // main image url to file
        if (mainImage) {
          formData.mainImage = await urlToFile({
            url: mainImage.url ?? "",
            filename: mainImage.originalName ?? undefined,
            mimeType: mainImage.type as TMimeType,
            lastModified: new Date(
              mainImage?.updatedAt ||
                mainImage?.deletedAt ||
                mainImage?.createdAt ||
                new Date(),
            ).getTime(),
          });
        }

        // gallery images url to files
        if (galleryMultipleImages?.length) {
          const galleryImagesFiles: File[] = [];

          for (let index = 0; index < galleryMultipleImages.length; index++) {
            const galleryMultipleImageMedia = galleryMultipleImages?.[index];

            const convertedFile = await urlToFile({
              url: galleryMultipleImageMedia.url ?? "",
              filename: galleryMultipleImageMedia.originalName ?? undefined,
              mimeType: galleryMultipleImageMedia.type as TMimeType,
              lastModified: new Date(
                galleryMultipleImageMedia?.updatedAt ||
                  galleryMultipleImageMedia?.deletedAt ||
                  galleryMultipleImageMedia?.createdAt ||
                  new Date(),
              ).getTime(),
            });

            if (convertedFile) {
              galleryImagesFiles.push(convertedFile);
            }
          }

          formData.galleryMultipleImages = galleryImagesFiles?.length
            ? galleryImagesFiles
            : null;
        }

        // set form data
        addOrEditVenueFormProps.reset(formData);
      };
      fetchImagesToFiles();
    }

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, slug, getAVenueData, isPrimaryMode]);

  const galleryMultipleImages = useWatch({
    control: addOrEditVenueFormProps.control,
    name: "galleryMultipleImages",
    defaultValue: initialState?.galleryMultipleImages,
  });

  const mainImage = useWatch({
    control: addOrEditVenueFormProps.control,
    name: "mainImage",
    defaultValue: initialState?.mainImage,
  });

  const isPrimary = useWatch({
    control: addOrEditVenueFormProps.control,
    name: "isPrimary",
    defaultValue: initialState?.isPrimary,
  });

  const handleOnSubmit: TOnHandleSubmit = useCallback(
    ({
      reset,
      dialogHookProps: { setClose },
      toastHookProps: { toast },
      uploadAMedia,
      createAVenue,
      updateAVenue,
      getAVenueData,
      toastHookProps,
      isEditMode,
      setIsSubmitting,
    }): SubmitHandler<IAddOrEditVenueFormData> =>
      async (data) => {
        const toastId = toast({
          variant: "loading",
          title: `Venue is ${isEditMode ? "updating" : "creating"}`,
          description: `Please wait while the venue is being ${isEditMode ? "updated" : "created"}`,
        });

        try {
          setIsSubmitting?.(true);
          // data
          const formData: TCreateVenueArgs = {
            name: data?.name || "",
            email: data?.email || "",
            phone: data?.phone || "",
            address: data?.address || "",
            city: data?.city || "",
            state: data?.state || "",
            postalCode: data?.postalCode || "",
            countryCode: data?.countryCode || "",
            latitude: data?.latitude,
            longitude: data?.longitude,
            capacity: data?.capacity || 0,
            status: data?.status,
            media: undefined,
            isPrimary: data?.isPrimary,
          };

          formData.media = (
            await uploadOnlyRequiredImages({
              filesData: {
                mainImage: data?.mainImage,
                galleryImages: data?.galleryMultipleImages,
              },
              mediaList: getAVenueData?.media,
              uploadAMedia,
              toastProps: toastHookProps,
            })
          )?.finalMediaList;

          if (isEditMode) {
            await updateAVenue({
              slug: getAVenueData?.slug,
              body: formData,
            }).unwrap();
          } else {
            const createdVenue = await createAVenue(formData).unwrap();
            if (createdVenue?.data && onSuccessAddVenue) {
              onSuccessAddVenue(createdVenue.data);
            }
          }

          toastId.update({
            id: toastId.id,
            variant: "success",
            title: `Venue ${isEditMode ? "updated" : "created"}`,
            description: getApiErrorMessage(
              undefined,
              `The Venue has been ${isEditMode ? "updated" : "created"} successfully`,
            ),
          });
        } catch (error) {
          console.error(error);
          toastId.update({
            id: toastId.id,
            variant: "error",
            ...getApiErrorMessages({
              error,
              title: `Failed to ${isEditMode ? "update" : "create"} venue`,
              description: `Oops! Failed to ${isEditMode ? "update" : "create"} the venue. Please try again`,
            }),
          });
        } finally {
          setIsSubmitting?.(false);
        }
        reset();
        setClose();
      },
    [onSuccessAddVenue],
  );

  return {
    handleOnSubmit,
    addOrEditVenueFormProps,
    dialogHookProps,
    toastHookProps,
    galleryMultipleImages,
    mainImage,
    isPrimary,
    uploadAMedia,
    getAVenueData,
    getAVenueApiState,
    updateAVenue,
    createAVenue,
    handleSubmitAssistProps: {
      reset: addOrEditVenueFormProps.reset,
      dialogHookProps,
      toastHookProps,
      uploadAMedia,
      createAVenue,
      updateAVenue,
      getAVenueData,
      isEditMode: !!isEditMode && !!slug,
      setIsSubmitting: props?.setIsSubmitting,
    },
  };
};

export default useAddOrEditVenueForm;
