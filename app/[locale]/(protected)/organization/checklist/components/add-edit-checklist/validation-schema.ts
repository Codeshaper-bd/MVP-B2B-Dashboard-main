import * as Yup from "yup";
export const validationSchema = Yup.object({
  taskName: Yup.string().required("Task Name is required."),
  variableName: Yup.string().required("Variable  Name is required."),
  responseTime: Yup.string().optional(),
  descriptions: Yup.string().optional(),
});
