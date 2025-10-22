import * as Yup from "yup";

import type { TDiscountType } from "@/store/api/discounts/discounts.types";
import type { TGuestListOn } from "@/store/api/events/events.types";

import { ticketingValues } from "./values";

export const objectIDNumberRequiredSchema = Yup.object().shape({
  id: Yup.number().min(1, "Invalid id").required("ID is required"),
});

type TGuestListField = keyof Pick<
  TGuestListOn,
  "guestListLimit" | "guestListLimitType" | "perUserGuestListLimitQty"
>;

type TFieldType = "string" | "number";

const discountOptions: TDiscountType[] = ["PERCENTAGE", "FIXED_AMOUNT"];

export const conditionalGuestListSchema = ({
  fieldName,
  fieldType,
}: {
  fieldName: TGuestListField;
  fieldType: TFieldType;
}) => {
  const isGuestListCheck = ["isFreeGuestList"];

  // Handle string fields
  if (fieldType === "string" && fieldName === "guestListLimitType") {
    return Yup.string().when(isGuestListCheck, (value, schema) => {
      const [isFreeGuestList] =
        (value as [boolean | undefined] | undefined) || [];

      if (!isFreeGuestList) {
        return schema.optional().notRequired().nullable();
      }

      return schema
        .oneOf(
          discountOptions,
          `Invalid value. Allowed: ${discountOptions.join(", ")}`,
        )
        .required("Guest List Limit Type is required");
    });
  }

  // Handle number fields
  if (fieldType === "number") {
    switch (fieldName) {
      case "guestListLimit":
        return Yup.number().when(isGuestListCheck, (value, schema) => {
          const [isFreeGuestList] =
            (value as [boolean | undefined] | undefined) || [];

          if (!isFreeGuestList) {
            return schema.optional().notRequired().nullable();
          }

          return schema.when("guestListLimitType", (value, nestedSchema) => {
            const [limitType] =
              (value as [TDiscountType | undefined] | undefined) || [];
            if (limitType === "FIXED_AMOUNT") {
              return nestedSchema
                .positive("Guest list limit must be positive")
                .integer("Guest list limit must be an integer")
                .required("Guest list limit is required");
            }

            if (limitType === "PERCENTAGE") {
              return nestedSchema
                .min(-100, "Minimum -100% is allowed")
                .max(100, "Maximum 100% is allowed")
                .required("Guest list limit is required");
            }

            return nestedSchema.optional().notRequired().nullable();
          });
        });

      case "perUserGuestListLimitQty":
        return Yup.number().when(
          isGuestListCheck,
          ([isFreeGuestList], schema) => {
            if (!isFreeGuestList) {
              return schema.optional().notRequired().nullable();
            }

            return schema
              .positive("Per user guest list limit quantity must be positive")
              .integer("Must be an integer")
              .required("Per user guest list limit quantity is required");
          },
        );

      default:
        break;
    }
  }

  // Default fallback: allow anything
  return Yup.mixed().optional().notRequired();
};

export const ticketTierSchema = Yup.object().shape({
  ticketTier: Yup.array().when(["isFreeGuestList"], (value, schema) => {
    const isFreeGuestList = (value as [boolean, boolean] | undefined)?.[0];

    if (isFreeGuestList) {
      return Yup.array()
        .of(objectIDNumberRequiredSchema)
        .optional()
        .notRequired()
        .nullable();
    }

    return Yup.array()
      .of(objectIDNumberRequiredSchema.required("Ticket Tier is required"))
      .min(1, "Minimum one ticket tier is required")
      .required("Ticket tier is required");
  }),
});

export const groupDiscountSchema = Yup.object().shape({
  // hasGroupDiscount: conditionalBooleanSchema({ fieldName: "hasGroupDiscount" }),

  groupDiscount: Yup.object().when(
    ["isFreeGuestList", "hasGroupDiscount"],
    (value, schema) => {
      const isFreeGuestList = (value as [boolean, boolean] | undefined)?.[0];
      const hasGroupDiscount = (value as [boolean, boolean] | undefined)?.[1];

      // if (isFreeGuestList || !hasGroupDiscount) {
      //   return objectIDNumberRequiredSchema.optional().notRequired().nullable();
      // }

      // return objectIDNumberRequiredSchema.required("Group Discount is required");

      return objectIDNumberRequiredSchema.optional().notRequired().nullable();
    },
  ),
});

export const discountSchema = Yup.object().shape({
  // hasDiscount: conditionalBooleanSchema({ fieldName: "hasDiscount" }),

  discounts: Yup.array().when("isFreeGuestList", (value, schema) =>
    Yup.array()
      .of(objectIDNumberRequiredSchema)
      .optional()
      .notRequired()
      .nullable(),
  ),
});

export const linkTrackingSchema = Yup.object().shape({
  linkTracking: Yup.array().when(["isFreeGuestList"], (value, schema) => {
    const isFreeGuestList = (value as [boolean] | undefined)?.[0];

    if (isFreeGuestList) {
      return Yup.array()
        .of(objectIDNumberRequiredSchema)
        .optional()
        .notRequired()
        .nullable();
    }

    return Yup.array()
      .of(objectIDNumberRequiredSchema.required("Link tracking is required"))
      .optional()
      .notRequired()
      .nullable();
    // .min(1, "Minimum one link tracking is required")
    // .required("Link tracking is required");
  }),
});

export const addonsSchema = Yup.object().shape({
  // hasAddons: conditionalBooleanSchema({ fieldName: "hasAddons" }),

  addons: Yup.array().when(
    ["isFreeGuestList", "hasAddons"],
    (value, schema) => {
      const isFreeGuestList = (value as [boolean, boolean] | undefined)?.[0];
      const hasAddons = (value as [boolean, boolean] | undefined)?.[1];

      // if (isFreeGuestList || !hasGroupDiscount) {
      //   return objectIDNumberRequiredSchema.optional().notRequired().nullable();
      // }

      // return objectIDNumberRequiredSchema.required("Group Discount is required");

      return Yup.array()
        .of(objectIDNumberRequiredSchema)
        .optional()
        .notRequired()
        .nullable();
    },
  ),
});

const ticketingValidationSchema = Yup.object().shape({
  isFreeGuestList: Yup.boolean().default(ticketingValues.isFreeGuestList),
  guestListLimit: conditionalGuestListSchema({
    fieldName: "guestListLimit",
    fieldType: "number",
  }),
  guestListLimitType: conditionalGuestListSchema({
    fieldName: "guestListLimitType",
    fieldType: "string",
  }),
  perUserGuestListLimitQty: conditionalGuestListSchema({
    fieldName: "perUserGuestListLimitQty",
    fieldType: "number",
  }),

  ...ticketTierSchema.fields,
  ...groupDiscountSchema.fields,
  ...discountSchema.fields,
  ...linkTrackingSchema.fields,
  ...addonsSchema.fields,
});

export default ticketingValidationSchema;
