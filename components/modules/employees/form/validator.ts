import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters long"),

  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  // phone: Yup.string()
  //   .required("Phone number is required")
  //   .min(10, "Phone number must be at least 10 characters"),

  password: Yup.string().when("isEdit", {
    is: false,
    then: (schema) =>
      schema
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&#]/,
          "Password must contain at least one special character",
        )
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  confirmPassword: Yup.string().when("password", {
    is: (password: string) => !!password,
    then: (schema) =>
      schema
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  image: Yup.mixed().nullable(),
  roles: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Label is required"),
        value: Yup.number().required("Value is required"),
      }),
    )
    .min(1, "At least one role is required"),
});
