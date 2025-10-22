import * as Yup from "yup";

export const promoterFormValidationSchema = Yup.object().shape({
  promoter: Yup.object()
    .shape({
      label: Yup.string().required("Promoter is required"),
      value: Yup.number().required("Promoter is required"),
    })
    .required("Promoter is required"),
});
