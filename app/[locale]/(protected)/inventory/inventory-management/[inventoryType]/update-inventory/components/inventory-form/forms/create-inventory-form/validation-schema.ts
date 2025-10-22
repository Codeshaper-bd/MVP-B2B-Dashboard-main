import * as Yup from "yup";

import { createFileValidationSchema } from "@/lib/media/yup-file-validation";
import {
  type TInventoryItemType,
  EInventoryItemType,
} from "@/store/api/inventory-item/inventory-item.types";

// Volume schema
const volumeSchema = Yup.object().shape({
  volume: Yup.number()
    .typeError("Volume must be a number")
    .positive("Volume must be greater than zero")
    .required("Volume is required"),

  productCode: Yup.string().trim().required("Product code is required"),

  perLevel: Yup.number()
    .required("PAR level is required")
    .min(1, "PAR level must be greater than zero"),

  unitPerCase: Yup.number().when("$soldByState", (value, schema) => {
    if (value[0] === "UNIT") {
      return schema
        .required("Unit per case is required")
        .min(1, "Unit per case must be greater than zero");
    }
    return schema.optional().notRequired().nullable();
  }),

  netWeight: Yup.number().when("$soldByState", (value, schema) => {
    if (value[0] === "VOLUME") {
      return schema
        .required("Net weight is required")
        .min(1, "Net weight must be greater than zero");
    }
    return schema.optional().notRequired().nullable();
  }),

  netWeightUnit: Yup.string().when("$soldByState", (value, schema) => {
    if (value[0] === "VOLUME") {
      return schema.required("Net weight unit is required");
    }
    return schema.optional().notRequired().nullable();
  }),

  openingStock: Yup.number().when(
    ["addShipment", "$soldByState"],
    (values, schema) => {
      const [addShipment, soldBy] = values;
      if (addShipment === true && soldBy[0] === "V") {
        return schema
          .required("Opening stock is required")
          .min(0, "Opening stock cannot be negative");
      }
      return schema.optional().notRequired().nullable();
    },
  ),

  pricePerUnit: Yup.number().when(
    ["addShipment", "$soldByState"],
    (values, schema) => {
      const [addShipment, soldBy] = values;
      if (addShipment === true && soldBy[0] === "V") {
        return schema
          .required("Price per unit is required")
          .min(1, "Price must be greater than zero");
      }
      return schema.optional().notRequired().nullable();
    },
  ),

  casesReceived: Yup.number().when(
    ["addShipment", "$soldByState"],
    (values, schema) => {
      const [addShipment, soldBy] = values;

      if (addShipment && (soldBy[0] === "U" || soldBy[0] === "UNIT")) {
        return schema
          .required("Cases received is required")
          .min(1, "Cases received must be greater than zero");
      }
      return schema.optional().notRequired().nullable();
    },
  ),

  pricePerCase: Yup.number().when(
    ["addShipment", "$soldByState"],
    (values, schema) => {
      const [addShipment, soldBy] = values;
      if (addShipment && (soldBy[0] === "U" || soldBy[0] === "UNIT")) {
        return schema
          .required("Price per case is required")
          .min(1, "Price per case must be greater than zero");
      }
      return schema.optional().notRequired().nullable();
    },
  ),
});

// Main schema
export const inventoryItemFormValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Item name is required"),

  categoryId: Yup.number()
    .typeError("Category is required")
    .positive("Category is required")
    .required("Category is required"),

  media: createFileValidationSchema({
    isMultiple: true,
    isOptional: true,
    maxFileSize: 5,
    fileSizeUnit: "MB",
    acceptedFileTypes: ["image/jpeg", "image/png"],
  }),

  soldBy: Yup.string().required("Sold by is required"),

  type: Yup.mixed<TInventoryItemType>()
    .oneOf(Object.values(EInventoryItemType), "Please select a valid type")
    .required("Bottle type is required"),

  volumes: Yup.array()
    .of(volumeSchema)
    .min(1, "At least one volume entry is required")
    .required("Volumes are required"),
});
