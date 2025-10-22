"use client";
import { memo } from "react";

import FormContent from "./FormContent";
import useManageEventForm from "./useManageEventForm";

export interface IStepOneProps {
  isMediaLoading: boolean;
}

function StepOne({ isMediaLoading }: IStepOneProps) {
  const {
    formContextProps,
    // date time related fields
    startTimeDateField,
    startTimeTimeField,
    endTimeDateField,
    endTimeTimeField,
    checkInEndDateField,
    checkInEndTimeField,
    // date time related fields
    media,
    venueId,
    venueOptions,
    eventSlug,
    getAllVenueApiState,
  } = useManageEventForm();

  return (
    <FormContent
      startTimeDateField={startTimeDateField}
      startTimeTimeField={startTimeTimeField}
      endTimeDateField={endTimeDateField}
      endTimeTimeField={endTimeTimeField}
      checkInEndDateField={checkInEndDateField}
      checkInEndTimeField={checkInEndTimeField}
      eventSlug={eventSlug}
      venueOptions={venueOptions}
      media={media}
      venueId={venueId}
      formContextProps={formContextProps}
      isVenueLoading={
        getAllVenueApiState.isLoading || getAllVenueApiState.isFetching
      }
      isMediaLoading={isMediaLoading}
    />
  );
}

export default memo(StepOne);
