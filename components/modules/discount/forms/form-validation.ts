import * as Yup from "yup";

const discountValidationSchema = Yup.object().shape({
  name: Yup.string().required("Discount name is required"),
  code: Yup.string().required("Discount code is required"),
  discountType: Yup.string()
    .oneOf(["PERCENTAGE", "FIXED_AMOUNT"], "Invalid discount type")
    .required("Discount type is required"),
  amount: Yup.number()
    .positive("Amount must be a positive number")
    .required("Discount amount is required"),
  expirationDate: Yup.date().required("Discount expire date is required"),
  maxNumberOfRedemptions: Yup.number()
    .positive("Max number of redemptions must be a positive number")
    .required("Max number of redemptions is required"),
  maxTicketsPerRedemption: Yup.number()
    .positive("Max number of tickets per redemption must be a positive number")
    .required("Max number of tickets per redemption is required"),
});

export default discountValidationSchema;
