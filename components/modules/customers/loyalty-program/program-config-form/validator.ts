import * as Yup from "yup";

import { ERedemptionType } from "@/store/api/loyalty-program/loyalty-program.types";

// Main validation schema for creating a loyalty program
export const loyaltyProgramSchema = Yup.object().shape({
  enabled: Yup.boolean().required("Enabled status is required"),

  pointsPerSpent: Yup.number()
    .typeError("Points per spent must be a valid number")
    .positive("Points per spent must be a positive number")
    .integer("Points per spent must be an integer ")
    .required("Points per spent is required"),

  rewardValue: Yup.number()
    .typeError("Points per spent must be a valid number")
    .positive("Points per spent must be a positive number")
    .required("Points per spent is required"),

  redemptionThresholds: Yup.array(
    Yup.object().shape({
      points: Yup.number()
        .typeError("Points must be a valid number")
        .positive("Points must be greater than 0")
        .required("Points are required"),
      dollarValue: Yup.number()
        .typeError("Dollar value must be a valid number")
        .positive("Dollar value must be greater than 0")
        .required("Dollar value is required"),
    }),
  ).when("redemptionType", {
    is: ERedemptionType.THRESHOLD,
    then: (schema) =>
      schema.required(
        "Redemption thresholds are required when redemptionType is THRESHOLD",
      ),
    otherwise: (schema) => schema.notRequired(),
  }),

  emailNotificationEnabled: Yup.boolean().required(
    "Email notification  is required",
  ),

  notificationPoint: Yup.number()
    .typeError("Notification point must be a valid number")
    .nullable()
    .when("emailNotificationEnabled", {
      is: true,
      then: (schema) =>
        schema
          .required(
            "Notification point is required when email notifications are enabled",
          )
          .min(1, "Notification point must be at least 1"),
      otherwise: (schema) =>
        schema
          .transform((value) => (value === "" ? null : value))
          .notRequired(),
    }),
  streakValue: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" || value === 0 ? undefined : value,
    )
    .typeError("Streak Value must be a valid number")
    .positive("Streak Value must be a positive number")
    .optional(),

  streakReward: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" || value === 0 ? undefined : value,
    )
    .typeError("Streak Reward must be a valid number")
    .positive("Streak Reward must be a positive number")
    .optional(),
});
