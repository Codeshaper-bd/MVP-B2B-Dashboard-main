import * as Yup from "yup";

import {
  type TInventoryItemType,
  EInventoryItemType,
} from "@/store/api/inventory-item/inventory-item.types";

export const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(100, "Name cannot be longer than 100 characters")
    .required("Name is required"),
  media: Yup.mixed().nullable().notRequired(),
  status: Yup.string().optional(),
  note: Yup.string().trim().optional().notRequired().nullable(),
  density: Yup.number().when("categoryType", (value, schema) => {
    const categoryType = (value as [TInventoryItemType])?.[0];
    if (categoryType === EInventoryItemType.ALCOHOLIC) {
      return schema
        .typeError("Density must be a number")
        .required("Density is required")
        .moreThan(0, "Density must be greater than 0");
    }
    return schema.optional().notRequired().nullable();
  }),
  // gramsPerOunce: Yup.number()
  //   .typeError("Density must be a number")
  //   .required("Density is required")
  //   .moreThan(0, "Density must be greater than 0"),
});
