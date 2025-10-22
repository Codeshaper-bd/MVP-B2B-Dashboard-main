import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { combineDateAndTimeToUTC } from "@/lib/date-time/utc-date";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import {
  uploadOnlyRequiredImages,
  type IUploadRequiredImagesProps,
} from "@/lib/media/upload-only-required-images";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TCreateAnEventArgs,
  TCreateAnEventMutation,
  TOtherScheduleEventStatus,
  TRequiredRecurring,
  TScheduleEventStatus,
} from "@/store/api/events/events.types";
import type { TUploadAMediaMutation } from "@/store/api/media/media.types";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

import type { TEventDetailsInputs } from "../../steps/step-one/types";
import type { TEventParams } from "../../useEventStepperForm";

export type TPrepareCreateEventDataProps = {
  eventDetails: TEventDetailsInputs;
  uploadAMedia: TUploadAMediaMutation;
  toastProps: IUploadRequiredImagesProps["toastProps"];
  mediaList: IUploadRequiredImagesProps["mediaList"];
};

// type predicate to check if event is of type TScheduleEventStatus
const checkIsScheduleEvent = (
  event: TEventDetailsInputs | TNullish,
): event is TEventDetailsInputs & TScheduleEventStatus =>
  event?.status === "Scheduled";

export const prepareCreateEventData = async ({
  eventDetails,
  uploadAMedia,
  toastProps,
  mediaList,
}: TPrepareCreateEventDataProps) => {
  const formData: TCreateAnEventArgs = {
    // data time related fields
    startTime: combineDateAndTimeToUTC({
      date: eventDetails?.startTimeDateField,
      time: eventDetails?.startTimeTimeField,
    }),
    endTime: combineDateAndTimeToUTC({
      date: eventDetails?.endTimeDateField,
      time: eventDetails?.endTimeTimeField,
    }),
    checkInEnd: combineDateAndTimeToUTC({
      date: eventDetails?.checkInEndDateField,
      time: eventDetails?.checkInEndTimeField,
    }),
    hideGuestlist: eventDetails?.hideGuestlist,
    isCrowdMeterEnabled: eventDetails?.isCrowdMeterEnabled,
    description: eventDetails.description ?? "",
    name: eventDetails.name,
    venueId: eventDetails.venueId,
    media: [],
    // gratuity
    isGratuity: undefined,
    gratuityValue: undefined,

    // recurring
    isRecurring: undefined,
    recurringFor: undefined,

    // tax
    isTaxEnabled: eventDetails?.isTaxEnabled,
    taxId: eventDetails?.taxId,
    taxName: eventDetails?.taxName,
    taxRate: eventDetails?.taxRate,
  };

  // status
  if (
    eventDetails?.status === "Published" ||
    eventDetails?.status === "Draft" ||
    eventDetails?.status === "Archived"
  ) {
    formData.status = eventDetails.status;
  } else if (checkIsScheduleEvent(eventDetails)) {
    (
      formData as Exclude<TCreateAnEventArgs, TOtherScheduleEventStatus>
    ).status = eventDetails.status;
    (
      formData as Exclude<TCreateAnEventArgs, TOtherScheduleEventStatus>
    ).publishDate = eventDetails.publishDate;
  }

  formData.media = (
    await uploadOnlyRequiredImages({
      filesData: {
        mainImage: eventDetails?.media?.[0],
        galleryImages: eventDetails?.media?.slice(1),
      },
      mediaList,
      uploadAMedia,
      toastProps,
      toastMode: "group",
    })
  )?.finalMediaList;

  // gratuity
  formData.isGratuity = false;
  formData.gratuityValue = undefined;

  // recurring
  if (
    eventDetails.isRecurring &&
    eventDetails.recurringFor !== null &&
    eventDetails.recurringFor !== undefined &&
    typeof eventDetails.recurringFor === "string"
  ) {
    (formData.isRecurring as TRequiredRecurring["isRecurring"]) =
      eventDetails.isRecurring;
    (formData.recurringFor as unknown as TRequiredRecurring["recurringFor"]) =
      eventDetails.recurringFor;
  } else if (!eventDetails.isRecurring) {
    formData.isRecurring = false;
    formData.recurringFor = undefined;
  }

  return {
    createEventData: formData,
  };
};

export type THandleCreateEventProps = {
  toastProps: TUseToastReturnType;
  eventDetails: TEventDetailsInputs;
  uploadAMedia: TUploadAMediaMutation;
  createAnEvent: TCreateAnEventMutation;
  updateMultipleParam: (
    paramsToUpdate: Partial<TEventParams>,
    options?: void | NavigateOptions | null | undefined,
  ) => void;
};

export const handleCreateEvent = async ({
  eventDetails,
  uploadAMedia,
  createAnEvent,
  updateMultipleParam,
  toastProps: { toast },
  toastProps,
}: THandleCreateEventProps): Promise<boolean> => {
  const toastId = toast({
    title: "Creating event...",
    description: "Please wait while we create your event.",
    variant: "loading",
  });

  try {
    const { createEventData } = await prepareCreateEventData({
      eventDetails,
      uploadAMedia,
      toastProps,
      mediaList: [],
    });
    const createEventRes = await createAnEvent(createEventData).unwrap();

    if (!createEventRes?.success) {
      throw new Error("Failed to create event");
    }

    if (!createEventRes?.data?.details?.slug) {
      throw new Error("Event slug not found");
    }

    updateMultipleParam({
      eventSlug: createEventRes?.data?.details?.slug,
    });

    toastId?.update({
      id: toastId.id,
      title: "Event created!",
      description: "Your event has been created successfully.",
      variant: "success",
    });

    return true;
  } catch (error) {
    console.error("Error in handleNext:", error);
    toastId?.update({
      id: toastId.id,
      variant: "error",
      ...getApiErrorMessages({
        error,
        title: "Failed to create event",
        description: "Please try again later.",
      }),
    });
    return false;
  }
};
