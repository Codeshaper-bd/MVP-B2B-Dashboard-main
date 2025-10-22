import * as Yup from "yup";

import { EUserType } from "@/store/api/auth/auth.types";

export const schema = Yup.object({
  emailOrPhone: Yup.string()
    .test(
      "emailOrPhone",
      "Your email  is invalid.",
      (value) =>
        Yup.string().email().isValidSync(value) ||
        Yup.string()
          .matches(/^[0-9]{10}$/, "Phone number must be 10 digits.")
          .isValidSync(value),
    )
    .required("Email  is required"),
  password: Yup.string().required("Password is required"),
  userType: Yup.string()
    .oneOf(
      Object.values(EUserType),
      "User type must be either admin or promoter",
    )
    .required("User type is required"),
});
