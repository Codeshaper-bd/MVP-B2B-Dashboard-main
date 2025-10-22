import * as Yup from "yup";

import { EEventRecurringFor } from "@/store/api/events/events.types";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const validateTime = (text: string) =>
  Yup.string()
    .required(`${text} is required`)
    .matches(timeRegex, "Start time must be in HH:mm format");

const eventDetailsValidationSchema = Yup.object().shape({
  // time related fields
  startTimeDateField: Yup.string().required("Event date is required"),
  startTimeTimeField: validateTime("Start time"),
  endTimeDateField: Yup.string().required("End date is required"),
  endTimeTimeField: validateTime("End time"),
  checkInEndDateField: Yup.string().required("Check-in end date is required"),
  checkInEndTimeField: validateTime("Check-in end time"),

  // recurring
  isRecurring: Yup.boolean().required("isRecurring is required"),
  recurringFor: Yup.string().when("isRecurring", (value, schema) => {
    const isRecurring = (value as boolean[] | undefined)?.[0];

    return isRecurring
      ? Yup.string()
          .oneOf(Object.values(EEventRecurringFor) as string[])
          .required("recurringFor is required when isRecurring is true")
      : Yup.string().notRequired().nullable().optional();
  }),

  name: Yup.string().required("Event name is required"),
  description: Yup.string().optional(),
  venueId: Yup.number()
    .min(1, "Venue is required")
    .required("Venue is required"),

  status: Yup.string().optional().default("Draft"),

  media: Yup.array(Yup.mixed().required("File is required"))
    .required("Event Image is required")
    .min(1, "At least one file is required"),
  taxId: Yup.string().when("isTaxEnabled", (value, schema) => {
    const isTaxEnabled = (value as boolean[] | undefined)?.[0];
    return isTaxEnabled
      ? Yup.string().required("Tax ID is required when taxes are enabled")
      : Yup.string().notRequired().nullable().optional();
  }),
  taxName: Yup.string().when("isTaxEnabled", (value, schema) => {
    const isTaxEnabled = (value as boolean[] | undefined)?.[0];
    return isTaxEnabled
      ? Yup.string().required("Tax Name is required when taxes are enabled")
      : Yup.string().notRequired().nullable().optional();
  }),
  taxRate: Yup.number().when("isTaxEnabled", (value, schema) => {
    const isTaxEnabled = (value as boolean[] | undefined)?.[0];
    return isTaxEnabled
      ? Yup.number()
          .min(1, "Tax Rate must be at least 1%")
          .max(100, "Tax Rate cannot exceed 100%")
          .required("Tax Rate is required when taxes are enabled")
      : Yup.number().notRequired().nullable().optional();
  }),
});

export default eventDetailsValidationSchema;
