import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(100, "Name cannot be longer than 100 characters"),
  mainImage: Yup.mixed().nullable(),
  galleryMultipleImages: Yup.array().nullable(),
  address: Yup.string()
    .required("Address is required")
    .max(100, "Address cannot be longer than 100 characters"),
  capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be greater than 0"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Zip code is required"),
  email: Yup.string().required("Email is required").email("Email is not valid"),
  phone: Yup.string()
    .required("Phone is required")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot be longer than 15 characters"),
});
