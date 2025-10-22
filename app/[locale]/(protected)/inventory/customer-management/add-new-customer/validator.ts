import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("Customer name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),
  phoneNumber: Yup.string().required("Phone number is required"),
  gender: Yup.string().oneOf(["male", "female"]).required("Gender is required"),
  address: Yup.string().optional(),
});

export default validationSchema;
