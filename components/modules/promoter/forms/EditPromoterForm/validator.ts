import * as yup from "yup";

const addPromoterSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test("phone-format", "Please enter a valid phone number", (value) => {
      if (!value) {
        return false;
      }

      const digitsOnly = value.replace(/\D/g, "");

      if (digitsOnly.length < 10) {
        return false;
      }

      if (digitsOnly.length > 15) {
        return false;
      }
      return true;
    }),
});

export default addPromoterSchema;
