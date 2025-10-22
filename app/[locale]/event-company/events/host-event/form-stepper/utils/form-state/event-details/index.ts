import {
  convertUTCToLocal,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import type { TEvent } from "@/store/api/events/events.types";

import type { TEventDetailsInputs } from "../../../steps/step-one/types";
import { defaultValues } from "../../../values";

export type TPrepareEventDetailsFormStateDataProps = {
  getAnEventData: TEvent;
};

export const prepareEventDetailsFormStateData = async ({
  getAnEventData,
}: TPrepareEventDetailsFormStateDataProps) => {
  /* step 1 start */
  const eventDetails: TEventDetailsInputs = {
    ...defaultValues.eventDetails,
    ...getAnEventData?.details,
    venueId: getAnEventData?.venue?.id,
    startTimeDateField: convertUTCToLocalDate({
      utcDateTime: getAnEventData?.details?.startTime,
    }),
    startTimeTimeField: convertUTCToLocal({
      utcDateTime: getAnEventData?.details?.startTime,
      format: "HH:mm",
    }),
    endTimeDateField: convertUTCToLocalDate({
      utcDateTime: getAnEventData?.details?.endTime,
    }),
    endTimeTimeField: convertUTCToLocal({
      utcDateTime: getAnEventData?.details?.endTime,
      format: "HH:mm",
    }),
    checkInEndDateField: convertUTCToLocalDate({
      utcDateTime: getAnEventData?.details?.checkInEnd,
    }),
    checkInEndTimeField: convertUTCToLocal({
      utcDateTime: getAnEventData?.details?.checkInEnd,
      format: "HH:mm",
    }),
    media: null,
  };

  // recurring
  if (
    getAnEventData?.details?.isRecurring &&
    getAnEventData?.details?.recurringFor !== null &&
    getAnEventData?.details?.recurringFor !== undefined &&
    typeof getAnEventData?.details?.recurringFor === "string"
  ) {
    eventDetails.isRecurring = true;
    eventDetails.recurringFor = getAnEventData?.details?.recurringFor;
  } else if (!getAnEventData?.details?.isRecurring) {
    eventDetails.isRecurring = false;
    eventDetails.recurringFor = undefined;
  }
  /* step 1 end */

  return {
    eventDetails,
  };
};
