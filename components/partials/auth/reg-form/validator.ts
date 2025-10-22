import * as Yup from "yup";

import {
  type TUserSubscriptionPlan,
  EUserSubscriptionPlan,
} from "@/store/api/auth/auth.types";

export const registrationValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "First name must be at least 2 characters long")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Last name must be at least 2 characters long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Your email is invalid.")
    .required("Email is required"),
  password: Yup.string()
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character",
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  orgName: Yup.string()
    .min(2, "Organization name must be at least 2 characters long")
    .required("Organization name is required"),
  dialCode: Yup.string().required("Dial code is required"),
  phone: Yup.string()
    .matches(
      /^[0-9]{11,}$/,
      "Phone number must be at least 9 digits (without country code).",
    )
    .required("Phone number is required"),
  agree: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required(`You must agree to the terms and conditions`),
  subscription: Yup.string()
    .required("Subscription is required")
    .oneOf(
      Object.values(EUserSubscriptionPlan) as TUserSubscriptionPlan[],
      "Invalid subscription",
    ),
});
