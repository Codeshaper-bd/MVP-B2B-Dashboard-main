import * as Yup from "yup";

import { createFileValidationSchema } from "@/lib/media/yup-file-validation";
import {
  type TSoldBy,
  type TInventoryItemType,
  type TUnit,
  EInventoryItemType,
  ESoldBy,
} from "@/store/api/inventory-item/inventory-item.types";

// Import the unit options
import { volumeUnitOptions, netWeightUnitOptions } from "./utils";

const baseVolumeSchema = Yup.object().shape({
  id: Yup.number().optional().notRequired().nullable(),
  volume: Yup.number()
    .typeError("Volume must be a number")
    .positive("Volume must be greater than zero")
    .required("Volume is required"),
  unit: Yup.mixed<TUnit>()
    .oneOf(
      volumeUnitOptions.map((option) => option.value),
      "Volume must be expressed in ounces (oz) or milliliters (ml)",
    )
    .required("Volume unit is required"),
  productCode: Yup.string().trim().required("Product code is required"),
  netWeight: Yup.number()
    .typeError("Net weight must be a number")
    .positive("Net weight must be greater than zero")
    .required("Net weight is required"),
  netWeightUnit: Yup.mixed<TUnit>()
    .oneOf(
      netWeightUnitOptions.map((option) => option.value),
      "Net weight must be expressed in grams (g)",
    )
    .required("Net weight unit is required"),
  perLevel: Yup.number().optional().notRequired().nullable(),
});

const unitVolumeValidationSchema = Yup.object().shape({
  ...baseVolumeSchema.fields,
  addShipmentVolume: Yup.boolean().required("Add shipment volume is required"),

  unitPerCase: Yup.number().when("$soldByState", (value, schema) => {
    const soldByState = (value as [TSoldBy])?.[0];
    if (soldByState === ESoldBy.UNIT) {
      return schema
        .typeError("Unit per case must be a number")
        .positive("Unit per case must be greater than zero")
        .required("Unit per case is required");
    }
    return schema.optional().notRequired().nullable();
  }),
});

const volumeSchema = Yup.object().shape({
  // hard liquor specific fields
  // pricePerUnit: Yup.number().when("$bottleType", (value, schema) => {
  //   const bottleType = (value as [TInventoryBottleType])?.[0];
  //   if (bottleType === EInventoryBottleType.HARD_LIQUOR) {
  //     return schema
  //       .typeError("Price per unit must be a number")
  //       .moreThan(0, "Price per unit must be greater than zero")
  //       .positive("Price per unit must be greater than zero")
  //       .required("Price per unit is required");
  //   }
  //   return schema.optional().notRequired().nullable();
  // }),
  // openingStock: Yup.number().when("$bottleType", (value, schema) => {
  //   const bottleType = (value as [TInventoryBottleType])?.[0];
  //   if (
  //     bottleType === EInventoryBottleType.HARD_LIQUOR ||
  //     bottleType === EInventoryBottleType.BOTTLE_CANNED
  //   ) {
  //     return schema
  //       .typeError("Opening stock must be a number")
  //       .moreThan(0, "Opening stock must be greater than zero")
  //       .min(1, "Opening stock cannot be less than 1")
  //       .required("Opening stock is required");
  //   }
  //   return schema.optional().notRequired().nullable();
  // }),
  // bottle/canned specific fields
  // unitPerCase: Yup.number().when("$bottleType", (value, schema) => {
  //   const bottleType = (value as [TInventoryBottleType])?.[0];
  //   if (bottleType === EInventoryBottleType.BOTTLE_CANNED) {
  //     return schema
  //       .typeError("Unit per case must be a number")
  //       .positive("Unit per case must be greater than zero")
  //       .required("Unit per case is required");
  //   }
  //   return schema.optional().notRequired().nullable();
  // }),
  // casesReceived: Yup.number().when("$bottleType", (value, schema) => {
  //   const bottleType = (value as [TInventoryBottleType])?.[0];
  //   if (bottleType === EInventoryBottleType.BOTTLE_CANNED) {
  //     return schema
  //       .typeError("Cases received must be a number")
  //       .min(0, "Cases received cannot be negative")
  //       .optional();
  //   }
  //   return schema.optional().notRequired().nullable();
  // }),
  // pricePerCase: Yup.number().when("$bottleType", (value, schema) => {
  //   const bottleType = (value as [TInventoryBottleType])?.[0];
  //   if (bottleType === EInventoryBottleType.BOTTLE_CANNED) {
  //     return schema
  //       .typeError("Price per case must be a number")
  //       .positive("Price per case must be greater than zero")
  //       .optional();
  //   }
  //   return schema.optional().notRequired().nullable();
  // }),
});

// Main discriminated union-aware schema
export const inventoryItemFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Item name is required"),

  categoryId: Yup.number()
    .typeError("Category is required")
    .positive("Category is required")
    .required("Category is required"),

  // currentStock: Yup.number().optional().notRequired(),

  // lcboCode: Yup.string().trim().optional(),

  // status: Yup.mixed<TInventoryItemStatus>()
  //   .oneOf(Object.values(EInventoryItemStatus), "Please select a valid status")
  //   .optional(),

  media: createFileValidationSchema({
    isMultiple: true,
    isOptional: true,
    maxFileSize: 5,
    fileSizeUnit: "MB",
    acceptedFileTypes: ["image/jpeg", "image/png"],
  }),

  soldBy: Yup.string().required("Sold by is required"),

  // bottleType: Yup.mixed<EInventoryBottleType>()
  //   .oneOf(
  //     Object.values(EInventoryBottleType),
  //     "Please select a valid bottle type",
  //   )
  //   .required("Bottle type is required"),

  type: Yup.mixed<TInventoryItemType>()
    .oneOf(Object.values(EInventoryItemType), "Please select a valid type")
    .required("Bottle type is required"),

  volumes: Yup.array()
    .of(volumeSchema)
    .min(1, "At least one volume entry is required")
    .required("Volumes are required"),
});
