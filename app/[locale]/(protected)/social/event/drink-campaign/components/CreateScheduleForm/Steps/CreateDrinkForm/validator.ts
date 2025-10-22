import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  mode: Yup.string().required("Mode is required"),
  name: Yup.string().required("Name is required"),
  color: Yup.string().required("Color is required"),
  description: Yup.string().required("Description is required"),
  images: Yup.array().required("Images are required"),
});
