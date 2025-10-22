import * as Yup from "yup";

import { createFileValidationSchema } from "@/lib/media/yup-file-validation";
export const validationSchema = Yup.object().shape({
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  email: Yup.string().optional(),
  dialCode: Yup.string().optional(),
  phone: Yup.string()
    .matches(
      /^\+?[0-9]{8,}$/,
      "Phone number must be at least 6 digits (without country code).",
    )
    .required("Phone number is required"),
  password: Yup.string().test(
    "is-empty-or-valid",
    "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long",
    (value) =>
      !value ||
      (/[A-Z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[@$!%*?&#]/.test(value) &&
        value.length >= 8),
  ),
  confirmPassword: Yup.string().when("password", {
    is: (password: string) => !!password,
    then: (schema) =>
      schema
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // media: Yup.mixed().optional().nullable(),
  media: createFileValidationSchema({
    isMultiple: false,
    isOptional: true,
    maxFileSize: 5,
    fileSizeUnit: "MB",
    acceptedFileTypes: ["image/jpeg", "image/png"],
  }),
});
