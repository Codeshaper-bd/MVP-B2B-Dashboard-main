import * as yup from "yup";

export const additionalValidationSchema = yup.object({
  points: yup
    .number()
    .typeError("Points must be a valid number")
    .positive("Points must be greater than 0")
    .required("Points are required"),
  user: yup.object().required("User is required"),
});
