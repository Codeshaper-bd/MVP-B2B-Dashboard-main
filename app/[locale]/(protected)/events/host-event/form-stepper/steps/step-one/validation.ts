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
  // .test("is-future-date", "Event date must be a future date.", (value) => {
  //   const parsedDate = dayjs(value, "YYYY-MM-DD", true);
  //   return parsedDate.isValid() && parsedDate.isAfter(dayjs(), "day");
  // }),
  startTimeTimeField: validateTime("Start time"),
  endTimeDateField: Yup.string().required("End date is required"),
  // .test("is-future-date", "Event date must be a future date.", (value) => {
  //   const parsedDate = dayjs(value, "YYYY-MM-DD", true);
  //   return parsedDate.isValid() && parsedDate.isAfter(dayjs(), "day");
  // }),
  // endTimeDateField: Yup.string()
  //   .required("End date is required")
  //   .test("is-future-date-end", "End date must be a future date.", (value) => {
  //     if (!value) {
  //       return false;
  //     }
  //     const parsedDate = dayjs(value, "YYYY-MM-DD", true);
  //     return parsedDate.isValid() && parsedDate.isAfter(dayjs(), "day");
  //   })
  //   .test(
  //     "is-after-start-date",
  //     "End date must be greater than start date",
  //     function (value) {
  //       const { startTimeDateField } = this.parent;
  //       if (!value || !startTimeDateField) {
  //         return false;
  //       }

  //       const startDate = dayjs(startTimeDateField, "YYYY-MM-DD", true);
  //       const endDate = dayjs(value, "YYYY-MM-DD", true);
  //       if (!startDate.isValid() || !endDate.isValid()) {
  //         return false;
  //       }

  //       return endDate.isAfter(startDate, "day");
  //     },
  //   ),
  endTimeTimeField: validateTime("End time"),
  checkInEndDateField: Yup.string().required("Check-in end date is required"),
  // .test(
  //   "is-future-date",
  //   "Check-in end date must be a future date.",
  //   (value) => {
  //     const parsedDate = dayjs(value, "YYYY-MM-DD", true);
  //     return parsedDate.isValid() && parsedDate.isAfter(dayjs(), "day");
  //   },
  // ),
  checkInEndTimeField: validateTime("Check-in end time"),

  // gratuity
  isGratuity: Yup.boolean().required("isGratuity is required"),
  gratuityValue: Yup.number().when("isGratuity", (value, schema) => {
    const isGratuity = (value as boolean[] | undefined)?.[0];

    return isGratuity
      ? Yup.number()
          .min(0.000001, "Gratuity value must be greater than 0")
          .default(0)
          .required("Gratuity value is required when isGratuity is true")
      : Yup.number().notRequired().nullable().optional();
  }),

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
  // isFreeGuestList: Yup.boolean().default(false),
  description: Yup.string().optional(),
  venueId: Yup.number()
    .min(1, "Venue is required")
    .required("Venue is required"),

  status: Yup.string().optional().default("Draft"),

  // media: Yup.array(Yup.mixed().required("File is required")).optional(),
  media: Yup.array(Yup.mixed().required("Event Graphic Required to proceed"))
    .required("Event Graphic Required to proceed")
    .min(1, "Event Graphic Required to proceed"),
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
