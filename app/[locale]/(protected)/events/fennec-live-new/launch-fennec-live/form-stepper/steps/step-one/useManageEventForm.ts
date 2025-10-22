import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTimezoneSelect } from "react-timezone-select";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllVenueQuery } from "@/store/api/venues/venues-api";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { IStepFormInputs } from "../../type";
import type { TEventParams } from "../../useEventStepperForm";
import { defaultValues } from "../../values";

function useManageEventForm() {
  const { getAParamValue } = useManageSearchParams<TEventParams>();

  const eventSlug = getAParamValue("eventSlug") || "";
  const { data: getAllVenueRes, ...getAllVenueApiState } =
    useGetAllVenueQuery();
  const getAllVenueData = getAllVenueRes?.data;

  const venueOptions: IOption[] = useMemo(
    (): IOption[] =>
      getAllVenueData?.map(
        (venue): IOption => ({
          label: venue.name,
          value: venue.id,
        }),
      ) ?? [],
    [getAllVenueData],
  );

  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle: "original",
    // timezones: allTimezones,
  });

  const formContextProps = useFormContext<IStepFormInputs>();
  // date time related fields
  const startTimeDateField = useWatch({
    control: formContextProps.control,
    name: "eventDetails.startTimeDateField",
    defaultValue: defaultValues.eventDetails?.startTimeDateField,
  });
  const startTimeTimeField = useWatch({
    control: formContextProps.control,
    name: "eventDetails.startTimeTimeField",
    defaultValue: defaultValues.eventDetails?.startTimeTimeField,
  });
  const endTimeDateField = useWatch({
    control: formContextProps.control,
    name: "eventDetails.endTimeDateField",
    defaultValue: defaultValues.eventDetails?.endTimeDateField,
  });
  const endTimeTimeField = useWatch({
    control: formContextProps.control,
    name: "eventDetails.endTimeTimeField",
    defaultValue: defaultValues.eventDetails?.endTimeTimeField,
  });
  const checkInEndDateField = useWatch({
    control: formContextProps.control,
    name: "eventDetails.checkInEndDateField",
    defaultValue: defaultValues.eventDetails?.checkInEndDateField,
  });
  const checkInEndTimeField = useWatch({
    control: formContextProps.control,
    name: "eventDetails.checkInEndTimeField",
    defaultValue: defaultValues.eventDetails?.checkInEndTimeField,
  });

  const media = useWatch({
    control: formContextProps.control,
    name: "eventDetails.media",
    defaultValue: defaultValues.eventDetails.media,
  });
  const venueId = useWatch({
    control: formContextProps.control,
    name: "eventDetails.venueId",
    defaultValue: defaultValues.eventDetails.venueId,
  });

  return {
    venueOptions,
    formContextProps,
    // date related fields start
    startTimeDateField,
    startTimeTimeField,
    endTimeDateField,
    endTimeTimeField,
    checkInEndDateField,
    checkInEndTimeField,
    // date related fields end
    media,
    venueId,
    options,
    parseTimezone,
    getAllVenueApiState,
    eventSlug,
  };
}

export default useManageEventForm;
