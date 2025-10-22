import type { IRecurringOption, TEventDetailsInputs } from "./types";

export const eventDetailsValues: TEventDetailsInputs = {
  // time related fields
  startTimeDateField: null,
  startTimeTimeField: "",
  endTimeDateField: null,
  endTimeTimeField: "",
  checkInEndDateField: null,
  checkInEndTimeField: "",

  // recurring
  isRecurring: false,
  recurringFor: "" as TEventDetailsInputs["recurringFor"],

  // gratuity
  isGratuity: false,
  gratuityValue: 0,
  hideGuestlist: false,
  description: "",
  // isFreeGuestList: false,
  media: null,
  name: "",
  status: "Draft",
  venueId: -1,
  isCrowdMeterEnabled: false,
  // tax
  isTaxEnabled: false,
  taxId: "",
  taxName: "",
  taxRate: 0,
};

export const recurringOptions: IRecurringOption[] = [
  {
    label: "One Time",
    value: "ONE_TIME",
    radioProps: {
      ringColor: "success",
    },
  },
  {
    label: "Every Week",
    value: "EVERY_WEEK",
    radioProps: {
      ringColor: "success",
    },
  },
  {
    label: "Every Month",
    value: "EVERY_MONTH",
    radioProps: {
      ringColor: "success",
    },
  },
  {
    label: "Every Year",
    value: "EVERY_YEAR",
    radioProps: {
      ringColor: "success",
    },
  },
];
