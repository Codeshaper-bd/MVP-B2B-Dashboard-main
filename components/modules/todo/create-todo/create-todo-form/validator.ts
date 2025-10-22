import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .nonNullable()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  description: Yup.string().optional(),
  tags: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required("Tag value is required"),
      }),
    )
    .optional(),
  dueDate: Yup.date().required("Due Date is required"),
  priority: Yup.boolean().nonNullable().required("Priority is required"),
  status: Yup.string().required("Status is required"),
});

export default validationSchema;
