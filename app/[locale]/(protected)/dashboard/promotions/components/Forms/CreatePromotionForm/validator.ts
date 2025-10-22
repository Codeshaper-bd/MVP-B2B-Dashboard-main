import * as Yup from "yup";

import {
  EPromotionType,
  type TPromotionType,
} from "@/store/api/promotion/promotion.types";

const createPromotionCommonSchema = Yup.object().shape({
  promotionName: Yup.string().required("Promotion name is required"),
  promotionDuration: Yup.object()
    .shape({
      from: Yup.date().required("Start date is required"),
      to: Yup.date()
        .required("End date is required")
        .min(Yup.ref("from"), "End date cannot be before start date"),
    })
    .required("Date range is required"),
  description: Yup.string().required("Description is required"),
});

export const validationSchema = createPromotionCommonSchema.concat(
  Yup.object().shape({
    typeOfPromotion: Yup.string()
      .oneOf(Object.values(EPromotionType))
      .required("Promotion type is required"),
    product: Yup.object().when("typeOfPromotion", (value, schema) => {
      const typeOfPromotionValue = (value as TPromotionType[] | undefined)?.[0];

      return typeOfPromotionValue === EPromotionType.BUY_X_GET_X_FREE ||
        typeOfPromotionValue === EPromotionType.FREE_DRINK ||
        typeOfPromotionValue === EPromotionType.APPLY_DISCOUNT
        ? Yup.object()
            .shape({
              id: Yup.number().required("Product ID is required"),
            })
            .required("Product is required")
        : Yup.object().notRequired().nullable();
    }),
    buy: Yup.number().when("typeOfPromotion", (value, schema) => {
      const typeOfPromotionValue = (value as TPromotionType[] | undefined)?.[0];

      return typeOfPromotionValue === EPromotionType.BUY_X_GET_X_FREE
        ? Yup.number().required("Buy quantity is required")
        : Yup.number().notRequired().nullable();
    }),
    free: Yup.number().when("typeOfPromotion", (value, schema) => {
      const typeOfPromotionValue = (value as TPromotionType[] | undefined)?.[0];

      return typeOfPromotionValue === EPromotionType.BUY_X_GET_X_FREE
        ? Yup.number().required("Free quantity is required")
        : Yup.number().notRequired().nullable();
    }),

    discountType: Yup.string()
      .when("typeOfPromotion", (value, schema) => {
        const typeOfPromotionValue = (
          value as TPromotionType[] | undefined
        )?.[0];

        return typeOfPromotionValue === EPromotionType.APPLY_DISCOUNT
          ? Yup.string().required("Discount type is required")
          : Yup.string().notRequired().nullable();
      })
      .required("Discount type is required"),
    discount: Yup.number().when("typeOfPromotion", (value, schema) => {
      const typeOfPromotionValue = (value as TPromotionType[] | undefined)?.[0];

      return typeOfPromotionValue === EPromotionType.APPLY_DISCOUNT
        ? Yup.number().required("Discount amount is required")
        : Yup.number().notRequired().nullable();
    }),

    pointsNeeded: Yup.number().required("Points needed is required"),
    maxRedemptionPerNight: Yup.number()
      .required("Max redemption per night is required")
      .min(1, "Max redemption per night cannot be less than 1"),
  }),
);
