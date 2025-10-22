import * as Yup from "yup";

const groupDiscountValidation = Yup.object().shape({
  type: Yup.string()
    .oneOf(["PERCENTAGE", "FIXED_AMOUNT"], "Invalid discount type")
    .required("Discount type is required"),
  amount: Yup.number()
    .positive("Amount must be a positive number")
    .required("Discount amount is required"),
  minQty: Yup.number()
    .integer("Minimum quantity must be an integer")
    .positive("Minimum quantity must be greater than zero")
    .required("Minimum quantity is required"),
  maxQty: Yup.number()
    .integer("Maximum quantity must be an integer")
    .min(
      Yup.ref("minQty"),
      "Maximum quantity must be greater than or equal to minimum quantity",
    )
    .required("Maximum quantity is required"),
});

export default groupDiscountValidation;
