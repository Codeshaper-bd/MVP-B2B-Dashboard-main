import * as Yup from "yup";

import { EStatus, type TStatus } from "@/store/api/common-api-types";

const createAddonFormValidationSchema = (isEdit: boolean = false) =>
  Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(20, "Name cannot be longer than 20 characters"),
    description: isEdit
      ? Yup.string().max(
          500,
          "Description cannot be longer than 500 characters",
        )
      : Yup.string()
          .required("Description is required")
          .max(500, "Description cannot be longer than 500 characters"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .required("Price is required"),
    maxQty: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .required("Price is required"),

    status: Yup.mixed<TStatus>()
      .oneOf(Object.values(EStatus) as TStatus[], "Invalid status")
      .optional(),

    icon: Yup.object()
      .shape({
        id: Yup.string().required("Icon is required"),
      })
      .required("Icon is required"),
  });

export default createAddonFormValidationSchema;
