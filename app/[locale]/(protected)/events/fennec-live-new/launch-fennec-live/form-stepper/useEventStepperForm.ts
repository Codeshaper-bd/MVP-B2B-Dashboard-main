import { yupResolver } from "@hookform/resolvers/yup";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";

import useSearchParamStepper from "@/hooks/use-search-param-stepper";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { compareDateRangesWithTime } from "@/lib/date-time/compare-date-ranges";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { localStorageUtil } from "@/lib/localStorageUtil";
import { fetchMediaListToFileListByRtk } from "@/lib/media/url-to-file/using-rtk-query.ts/fetch-media-list-to-file-list-by-rtk";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import {
  useCreateAnEventMutation,
  useGetAnEventQuery,
  useUpdateAnEventMutation,
  useUpdateAnEventRelationMutation,
} from "@/store/api/events/events-api";
import type {
  TCreateAnEventArgs,
  TRelationInput,
} from "@/store/api/events/events.types";
import { useLazyFetchFileQuery } from "@/store/api/files-api/fetch-file-api";
import { useUploadAMediaMutation } from "@/store/api/media/media-api";
import { useToast } from "@/components/ui/use-toast";

import { steps } from "./steps";
import type { IStepFormInputs } from "./type";
import { prepareChallengeFormStateData } from "./utils/form-state/challenge";
import { prepareEventDetailsFormStateData } from "./utils/form-state/event-details";
import { preparePromotionFormStateData } from "./utils/form-state/promotions";
import {
  handleCreateEvent,
  prepareCreateEventData,
} from "./utils/submission/event";
import validationSchema from "./validation-schema";
import { defaultValues } from "./values";

interface IPageParams extends Params {
  locale?: string;
}

const stepFields: Record<number, keyof IStepFormInputs> = {
  0: "eventDetails",
  1: "table",
  2: "challenges",
  3: "promotions",
};
const totalSteps = steps.length;

export type TEventParams = {
  eventSlug: string;
  isEditMode: boolean;
  currentStep: number;
};

export const useEventStepperForm = () => {
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmittingOrUpdating, setIsSubmittingOrUpdating] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);
  const [isUserConfirmed, setIsUserConfirmed] = useState(false);
  const [pendingUpdateData, setPendingUpdateData] =
    useState<TCreateAnEventArgs | null>(null);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [isDateRangeModalLoading, setIsDateRangeModalLoading] = useState(false);

  const handleProceed = async () => {
    setIsDateRangeModalLoading(true);

    // Execute the pending update
    if (pendingUpdateData) {
      try {
        await updateAnEvent({
          slug: eventSlug,
          body: pendingUpdateData,
        }).unwrap();

        // Reset states and continue with step
        setPendingUpdateData(null);
        setIsUserConfirmed(true);
        setPendingStep(currentStep);
        setIsDateRangeModalOpen(false);
        setIsDateRangeModalLoading(false);
      } catch (error) {
        setPendingUpdateData(null);
        setIsUserConfirmed(false);
        setPendingStep(null);
        setIsDateRangeModalLoading(false);
      }
    }
  };

  const handleDateRangeCancel = () => {
    setIsDateRangeModalOpen(false);
    setPendingUpdateData(null);
    setIsUserConfirmed(false);
    setPendingStep(null);
    setIsDateRangeModalLoading(false);
  };
  const searchParamProps = useManageSearchParams<TEventParams>();
  const { updateMultipleParam, updateAParam, getAParamValue } =
    searchParamProps;
  const stepperProps = useSearchParamStepper({
    initialStep: 0,
    totalSteps: steps.length,
    currentStep: getAParamValue("currentStep") || 0,
    getCurrentStepValue: getAParamValue,
    setCurrentStep: updateAParam,
  });
  const eventSlug = getAParamValue("eventSlug") || "";
  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });
  const { data: getAnEventRes, ...getAnEventApiState } = useGetAnEventQuery(
    {
      slug: eventSlug,
    },
    {
      skip: !isProbableValidSlugFound,
    },
  );
  const getAnEventData = getAnEventRes?.data;
  const eventId = getAnEventData?.details?.id;
  const isValidEventId = checkIsValidId(eventId, {
    type: "number",
  });
  const formProps = useForm<IStepFormInputs>({
    resolver: yupResolver(
      validationSchema,
    ) as unknown as Resolver<IStepFormInputs>,
    defaultValues,
  });

  const { trigger, getValues, setValue } = formProps;

  const { currentStep, nextStep, isLastStep, setStep } = stepperProps;

  // Handle continuing with step after user confirms date change
  useEffect(() => {
    if (isUserConfirmed && pendingStep !== null) {
      setPendingStep(null);
      setIsUserConfirmed(false);
      // Continue with the step
      nextStep();
    }
  }, [isUserConfirmed, pendingStep, nextStep]);

  // Reset loading state when modal opens
  useEffect(() => {
    if (isDateRangeModalOpen) {
      setIsDateRangeModalLoading(false);
    }
  }, [isDateRangeModalOpen]);

  const [createAnEvent] = useCreateAnEventMutation();
  const [updateAnEvent] = useUpdateAnEventMutation();
  const [uploadAMedia] = useUploadAMediaMutation();
  const [updateAnEventRelation] = useUpdateAnEventRelationMutation();
  const toastProps = useToast();
  const router = useRouter();
  const { locale } = useParams<IPageParams>();

  // publish event
  const onSubmit = async (data: IStepFormInputs) => {
    const toastId = toastProps.toast({
      title: "Publishing Event",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      if (getAnEventData?.details?.status === "Published") {
        toastId.update({
          id: toastId.id,
          title: "Event Already Published",
          description:
            "This event has already been published and cannot be published again.",
          variant: "error",
        });
        return;
      }
      const updateEventRes = await updateAnEvent({
        slug: eventSlug,
        body: {
          status: "Published",
        },
      }).unwrap();

      if (!updateEventRes?.success) {
        throw new Error(updateEventRes?.message || "Failed to update event");
      }

      setIsPublished(true);
      toastId.update({
        id: toastId.id,
        title: "Event Published",
        description: "Event has been published successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error in publishing event: ", error);
      toastProps.toast({
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Failed to publish",
          description: "Failed to publish event. Please try again later.",
        }),
      });
    }
  };

  const handleUpdateAnEvent = async (step: number): Promise<boolean> => {
    try {
      const { eventDetails, challenges, promotions } = getValues();
      switch (step) {
        case 0: {
          const { createEventData } = await prepareCreateEventData({
            eventDetails,
            uploadAMedia,
            toastProps,
            mediaList: getAnEventData?.details?.media,
          });

          const comparison = compareDateRangesWithTime({
            formDateRange: {
              from: createEventData.startTime
                ? new Date(createEventData.startTime)
                : undefined,
              to: createEventData.endTime
                ? new Date(createEventData.endTime)
                : undefined,
            },
            apiStartDate: getAnEventData?.details?.startTime,
            apiEndDate: getAnEventData?.details?.endTime,
          });

          if (comparison?.isDateRangeChanged) {
            setPendingUpdateData(createEventData);
            setIsDateRangeModalOpen(true);
            return false;
          } else {
            const updateEventRes = await updateAnEvent({
              slug: eventSlug,
              body: createEventData,
            }).unwrap();

            if (!updateEventRes?.success) {
              throw new Error(
                updateEventRes?.message || "Failed to update event",
              );
            }
            return true;
          }
        }

        case 1: {
          return true;
        }

        case 2: {
          const challengeData: TRelationInput[] | undefined =
            challenges?.map(
              (challenge): TRelationInput => ({
                id: challenge.id,
              }),
            ) ?? [];

          const updateAnEventRelationRes = await updateAnEventRelation({
            slug: eventSlug,
            body: {
              challenges: challengeData,
            },
          }).unwrap();

          if (!updateAnEventRelationRes?.success) {
            throw new Error(
              updateAnEventRelationRes?.message ||
                "Failed to update challenge & event relation",
            );
          }

          const challengesLocallyRemoveRes =
            await localStorageUtil.removeItemAsync("challenges");

          if (!challengesLocallyRemoveRes?.success) {
            throw new Error(
              challengesLocallyRemoveRes?.message ||
                "Failed to remove challenge from local storage",
            );
          }

          return true;
        }

        case 3: {
          const promotionData: TRelationInput[] | undefined =
            promotions?.map(
              (promotion): TRelationInput => ({
                id: promotion.id,
              }),
            ) ?? [];

          const updateAnEventRelationRes = await updateAnEventRelation({
            slug: eventSlug,
            body: {
              promotions: promotionData,
            },
          }).unwrap();

          if (!updateAnEventRelationRes?.success) {
            throw new Error(
              updateAnEventRelationRes?.message ||
                "Failed to update promotion & event relation",
            );
          }

          const promotionsLocallyRemoveRes =
            await localStorageUtil.removeItemAsync("promotions");

          if (!promotionsLocallyRemoveRes?.success) {
            throw new Error(
              promotionsLocallyRemoveRes?.message ||
                "Failed to remove promotion from local storage",
            );
          }

          return true;
        }

        default: {
          return false;
        }
      }
    } catch (error) {
      console.error("Error in updating event: ", error);
      toastProps.toast({
        ...getApiErrorMessages({
          error,
          title: "Failed to proceed",
          description: "Failed to update event. Please try again later.",
        }),
        variant: "error",
      });
      return false;
    }
  };

  const handleNext = async (): Promise<boolean> => {
    try {
      const { eventDetails, table, challenges, promotions } = getValues();
      setIsSubmittingOrUpdating(true);

      switch (currentStep) {
        case 0: {
          const fieldsToValidate = stepFields?.[currentStep];
          const isStepValid = await trigger(fieldsToValidate);

          if (!isStepValid) {
            throw new Error(
              "Form validation failed. Please fill the required fields.",
            );
          }

          if (!checkIsValidId(eventId)) {
            // create event
            const isEventCreated = await handleCreateEvent({
              eventDetails,
              uploadAMedia,
              createAnEvent,
              updateMultipleParam,
              toastProps,
            });
            if (!isEventCreated) {
              return false;
            }
          } else {
            // update event
            const isUpdated = await handleUpdateAnEvent(currentStep);
            console.info("🚀 ~ handleNext ~ isUpdated:", isUpdated);
            if (!isUpdated) {
              return false;
            }
          }
          nextStep();
          return true;
        }

        case 1: {
          nextStep();
          return true;
        }

        case 2: {
          if (!checkIsValidId(eventId)) {
            throw new Error("Event ID not found");
          }

          const isUpdated = await handleUpdateAnEvent(currentStep);
          console.info("🚀 ~ handleNext ~ isUpdated:", isUpdated);
          if (!isUpdated) {
            return false;
          }

          nextStep();
          return true;
        }

        case 3: {
          if (!checkIsValidId(eventId)) {
            throw new Error("Event ID not found");
          }

          const isUpdated = await handleUpdateAnEvent(currentStep);
          console.info("🚀 ~ handleNext ~ isUpdated:", isUpdated);
          if (!isUpdated) {
            return false;
          }

          nextStep();
          return true;
        }

        default: {
          return false;
        }
      }

      // if (!isLastStep) {
      //   nextStep();
      // }
    } catch (error) {
      toastProps.toast({
        ...getApiErrorMessages({
          error,
          title: "Failed to proceed",
          description: "Form validation failed. Please try again later.",
        }),
        variant: "error",
      });
      console.error("Error in handleNext:", error);
      return false;
    } finally {
      setIsSubmittingOrUpdating(false);
    }
  };

  const handleSaveAsDraft = () => {};

  const handleCancel = () => {
    router.push(`/${locale}/events/upcoming-events`);
  };

  const [fetchFile] = useLazyFetchFileQuery();

  // this effect will update the form state with the data from the API
  useEffect(() => {
    const iife = async () => {
      if (
        !getAnEventApiState?.isLoading &&
        !getAnEventApiState?.isFetching &&
        !getAnEventApiState?.isError &&
        !getAnEventApiState?.isUninitialized &&
        getAnEventData
      ) {
        /* step 0 start */
        const { eventDetails } = await prepareEventDetailsFormStateData({
          getAnEventData,
        });
        // Note: processing and updating media in a separate useEffect

        setValue("eventDetails", eventDetails);
        /* step 0 end */

        /* ---------------------------- */

        /* step 1 start */

        /* step 1 start */
        /* step 1 end */

        /* ---------------------------- */

        /* step 2 start */
        const { challenges } = await prepareChallengeFormStateData({
          getAnEventData,
        });

        setValue("challenges", challenges);
        /* step 2 end */

        /* ---------------------------- */

        /* step 3 start */
        const { promotions } = await preparePromotionFormStateData({
          getAnEventData,
        });

        setValue("promotions", promotions);
        /* step 3 end */
      }
    };
    iife();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAnEventData,
    getAnEventApiState?.isError,
    getAnEventApiState?.isFetching,
    getAnEventApiState?.isLoading,
    getAnEventApiState?.isUninitialized,
  ]);

  // set media to form state
  useEffect(() => {
    const iife = async () => {
      if (
        !getAnEventApiState?.isLoading &&
        !getAnEventApiState?.isFetching &&
        !getAnEventApiState?.isError &&
        !getAnEventApiState?.isUninitialized &&
        getAnEventData?.details?.media
      ) {
        setIsMediaLoading(true);
        const { data } = await fetchMediaListToFileListByRtk({
          mediaList: getAnEventData?.details?.media,
          lazyFetchFileQueryFunction: fetchFile,
        });
        setIsMediaLoading(false);
        setValue("eventDetails.media", data);
      }
    };
    iife();
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAnEventData?.details?.media,
    getAnEventApiState?.isError,
    getAnEventApiState?.isFetching,
    getAnEventApiState?.isLoading,
    getAnEventApiState?.isUninitialized,
  ]);

  // protection against invalid step & slug
  useEffect(() => {
    if (
      (currentStep > 0 && !checkIsValidId(eventSlug, { type: "string" })) ||
      Number.isNaN(currentStep) ||
      (!Number.isNaN(currentStep) && currentStep > totalSteps) ||
      (!Number.isNaN(currentStep) && currentStep < 0)
    ) {
      updateAParam({
        key: "currentStep",
        value: 0,
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // protection against deleted/invalid event
  useEffect(() => {
    if (
      !getAnEventApiState?.isLoading &&
      !getAnEventApiState?.isFetching &&
      !getAnEventApiState?.isSuccess &&
      !getAnEventApiState?.isUninitialized &&
      !getAnEventData &&
      getAnEventApiState?.isError &&
      getAnEventApiState?.error &&
      currentStep > 0
    ) {
      updateAParam({
        key: "currentStep",
        value: 0,
      });
    }

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAnEventData,
    getAnEventApiState?.isLoading,
    getAnEventApiState?.isFetching,
    getAnEventApiState?.isSuccess,
    getAnEventApiState?.isUninitialized,
    getAnEventApiState?.isError,
    getAnEventApiState?.error,
  ]);

  return {
    formProps,
    eventPublished: {
      isPublished,
      setIsPublished,
    },
    onSubmit,
    stepperProps,
    handleNext,
    handleCancel,
    searchParamProps,
    handleSaveAsDraft,
    getAnEventApiState,
    getAnEventRes,
    getAnEventData,
    eventSlug,
    eventId,
    handleUpdateAnEvent,
    isProbableValidSlugFound,
    isValidEventId,
    isMediaLoading,
    isSubmittingOrUpdating,
    isDateRangeModalOpen,
    setIsDateRangeModalOpen,
    handleProceed,
    handleDateRangeCancel,
    isDateRangeModalLoading,
  };
};
