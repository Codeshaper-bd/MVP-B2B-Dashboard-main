import * as Yup from "yup";

import {
  ETicketTierType,
  type TTicketTierType,
} from "@/store/api/ticket-tier/ticket-tier.types";

const tierFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .min(0, "Price must be 0 or greater")
    .required("Price is required"),
  maxQty: Yup.number()
    .min(1, "Max quantity must be greater then 0")
    .required("Max quantity is required"),
  maxTicketsPerCustomer: Yup.number()
    .min(1, "Max tickets per customer must be greater then 0")
    .required("Max tickets per customer is required"),
  type: Yup.string<TTicketTierType>()
    .oneOf(Object.values(ETicketTierType))
    .optional(),
  isPrivate: Yup.boolean().optional(),
  status: Yup.string().optional(),
  isAutoRelease: Yup.boolean().optional(),
  startDate: Yup.string().when("isAutoRelease", (value, schema) => {
    const isAutoRelease = (value as boolean[] | undefined)?.[0];

    return isAutoRelease
      ? Yup.string().required(
          "Start date is required when auto-release is enabled",
        )
      : Yup.string().optional().nullable().notRequired();
  }),

  endDate: Yup.string().when("isAutoRelease", (value, schema) => {
    const isAutoRelease = (value as boolean[] | undefined)?.[0];

    return isAutoRelease
      ? Yup.string().required(
          "End date is required when auto-release is enabled",
        )
      : Yup.string().optional().nullable().notRequired();
  }),
});

export default tierFormValidationSchema;
