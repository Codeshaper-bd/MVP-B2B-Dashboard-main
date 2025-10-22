import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Bar name is required")
    .min(2, "Bar name must be at least 2 characters long"),

  // media: Yup.mixed().nullable(),
  // status: Yup.mixed().oneOf(["active", "inactive", "pending"]).nullable(),
});
