import * as Yup from "yup";

import { createFileValidationSchema } from "@/lib/media/yup-file-validation";
import {
  EBarMenuItemStatus,
  EBarMenuItemType,
  EUnit,
  type TBarMenuItemStatus,
  type TBarMenuItemType,
  type TUnit,
} from "@/store/api/bar-menu-item/bar-menu-item.types";
import { EInventoryItemType } from "@/store/api/inventory-item/inventory-item.types";

/* |--------------------------------------------------
| Create Product Form Validation Schema Start
|-------------------------------------------------- */

// Ingredient Schema
const ingredientSchema = Yup.object().shape({
  // ingredientId
  _id: Yup.number()
    .typeError("Ingredient is required")
    .required("Ingredient is required"),
  usageQuantity: Yup.number()
    .typeError("Usage quantity must be a number")
    .positive("Usage quantity must be greater than zero")
    .required("Usage quantity is required"),
  usageUnit: Yup.mixed<TUnit>()
    .oneOf(Object.values(EUnit), "Please select a valid usage unit")
    .optional(),
  isFullSize: Yup.boolean().optional(),
  type: Yup.string().optional(),
});

// Main Form Validation Schema
export const barMenuItemFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Product name is required"),

  subTitle: Yup.string().trim().optional(),

  description: Yup.string().trim().optional(),

  volume: Yup.number()
    .typeError("Volume must be a number")
    .positive("Volume must be greater than zero")
    .required("Volume is required"),

  type: Yup.mixed<TBarMenuItemType>()
    .oneOf(
      Object.values(EBarMenuItemType),
      "Please select a valid product type",
    )
    .optional(),

  unit: Yup.mixed<TUnit>()
    .oneOf(Object.values(EUnit), "Please select a valid unit")
    .optional(),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),

  isSaleable: Yup.boolean().optional(),

  status: Yup.mixed<TBarMenuItemStatus>()
    .oneOf(Object.values(EBarMenuItemStatus), "Please select a valid status")
    .optional(),

  media: createFileValidationSchema({
    isMultiple: true,
    isOptional: true,
    maxFileSize: 5,
    fileSizeUnit: "MB",
    acceptedFileTypes: ["image/jpeg", "image/png"],
  }),

  ingredients: Yup.array().of(ingredientSchema),

  // Separate validation for alcoholic ingredients to allow targeted validation
  // alcoholicIngredientCheck: Yup.mixed().test({
  //   name: "alcoholic-product-requires-alcoholic-ingredient",
  //   message: "Alcoholic products must have at least one alcoholic ingredient",
  //   test(_, context) {
  //     const productType = context.parent.type;
  //     const ingredients = context.parent.ingredients;

  //     if (productType === EBarMenuItemType.ALCOHOLIC) {
  //       const hasAlcoholicIngredient = ingredients?.some(
  //         (ingredient: any) =>
  //           ingredient?.type === EInventoryItemType.ALCOHOLIC,
  //       );

  //       return hasAlcoholicIngredient;
  //     }

  //     return true;
  //   },
  // }),
});

/* |--------------------------------------------------
| Create Product Form Validation Schema End
|-------------------------------------------------- */
