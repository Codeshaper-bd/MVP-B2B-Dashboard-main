import * as Yup from "yup";

import type { TChallengeTypeOption } from "./types";

export const validationSchema = Yup.object({
  // common fields
  name: Yup.string()
    .required("Name is required")
    .max(100, "Name cannot be longer than 100 characters"),
  dateRange: Yup.object()
    .shape({
      from: Yup.date().required("Start date is required"),
      to: Yup.date()
        .required("End date is required")
        .min(Yup.ref("from"), "End date cannot be before start date"),
    })
    .required("Date range is required"),
  pointesEarned: Yup.number()
    .required("Points earned is required")
    .min(1, "Points earned cannot be negative and less than 1"),
  maxRedemptionPerNight: Yup.number()
    .required("Max redemption per night is required")
    .min(1, "Max redemption per night cannot be less than 1"),

  description: Yup.string()
    .required("Description is required")
    .max(500, "Description cannot be longer than 500 characters"),

  // type specific fields
  typeOfChallenge: Yup.object({
    label: Yup.string().required("Type of challenge is required"),
    value: Yup.mixed().required("Type of challenge is required"),
  }).required("Type of challenge is required"),
  amountSpent: Yup.mixed().when("typeOfChallenge", (value, schema) => {
    const typeOfChallengeValue = (
      value as TChallengeTypeOption[] | undefined
    )?.[0]?.value;
    return typeOfChallengeValue === "SPENT"
      ? Yup.number()
          .required("Amount spent is required")
          .min(0, "Amount spent cannot be less than 0")
      : Yup.mixed().notRequired().nullable();
  }),
  numberOfFriends: Yup.number().when("typeOfChallenge", (value, schema) => {
    const typeOfChallengeValue = (
      value as TChallengeTypeOption[] | undefined
    )?.[0]?.value;
    return typeOfChallengeValue === "INVITE_FRIENDS"
      ? Yup.number()
          .required("Number of friends data is required")
          .min(0, "Number of friends data cannot be less than 0")
      : Yup.mixed().notRequired().nullable();
  }),
  purchaseQuantity: Yup.number().when("typeOfChallenge", (value, schema) => {
    const typeOfChallengeValue = (
      value as TChallengeTypeOption[] | undefined
    )?.[0]?.value;
    return typeOfChallengeValue === "PURCHASE"
      ? Yup.number()
          .required("Purchase quantity is required")
          .min(1, "Purchase quantity cannot be less than 1")
      : Yup.mixed().notRequired().nullable();
  }),
  checkInTime: Yup.string().when("typeOfChallenge", (value, schema) => {
    const typeOfChallengeValue = (
      value as TChallengeTypeOption[] | undefined
    )?.[0]?.value;
    return typeOfChallengeValue === "CHECK_IN_BEFORE"
      ? Yup.string().required("Check-in time is required")
      : Yup.mixed().notRequired().nullable();
  }),
  item: Yup.object().when("typeOfChallenge", (value, schema) => {
    const typeOfChallengeValue = (
      value as TChallengeTypeOption[] | undefined
    )?.[0]?.value;
    return typeOfChallengeValue === "PURCHASE"
      ? Yup.object()
          .shape({
            id: Yup.number().required("Item is required"),
          })
          .required("Item is required")
      : Yup.mixed().notRequired().nullable();
  }),
});
