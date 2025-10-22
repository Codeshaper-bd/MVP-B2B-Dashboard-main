import * as Yup from "yup";

/**
 * Validation schema for promoter registration form
 */
export const promoterRegisterValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),

  lastName: Yup.string().trim().required("Last name is required"),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  profilePicture: Yup.mixed()
    .optional()
    .test("fileSize", "Image size must be less than 5MB", (value) => {
      if (!value) {
        return true;
      }
      const file = value as File;
      return file.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only JPG, JPEG, and PNG files are allowed", (value) => {
      if (!value) {
        return true;
      }
      const file = value as File;
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      return allowedTypes.includes(file.type);
    }),
});
