import * as yup from "yup";

export const customerValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().optional(),
});
