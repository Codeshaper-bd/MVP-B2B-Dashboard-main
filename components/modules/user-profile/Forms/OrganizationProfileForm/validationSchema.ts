import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().optional(),
  dialCode: Yup.string().optional(),
  phone: Yup.string()
    .matches(
      /^\+?[0-9]{8,}$/,
      "Phone number must be at least 6 digits (without country code).",
    )
    .required("Phone number is required"),
  description: Yup.string().optional(),
  address: Yup.string().optional(),
  websiteUrl: Yup.string().url().optional(),
});
