import * as Yup from "yup";

export const validationSchema = Yup.object({
  bankAccountNumber: Yup.string()
    .required("Account number is required")
    .min(1, "Account number must be at least 1 digit"),
  transitNumber: Yup.string()
    .required("Transit number is required")
    .min(1, "Transit number must be at least 1 digit"),
  institutionNumber: Yup.string()
    .required("Institution number is required")
    .min(1, "Institution number must be at least 1 digit"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  bankName: Yup.string().required("Bank name is required"),
  country: Yup.string().required("Country is required"),
  province: Yup.string().required("Province is required"),
  postalCode: Yup.string().required("Postal code is required"),
});
