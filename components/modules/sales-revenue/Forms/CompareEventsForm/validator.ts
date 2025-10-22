import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  eventOne: Yup.object()
    .shape({
      label: Yup.string().required("Label is required"),
      description: Yup.string().required("Description is required"),
      value: Yup.mixed().required("Value is required"),
    })
    .required("Event is required"),
  eventTwo: Yup.object()
    .shape({
      label: Yup.string().required("Label is required"),
      description: Yup.string().required("Description is required"),
      value: Yup.mixed().required("Value is required"),
    })
    .required("Event is required")
    .test(
      "eventTwo-different-from-eventOne",
      "Event Two must be different from Event One",
      function (value) {
        const { eventOne } = this.parent;
        return eventOne?.value !== value?.value;
      },
    ),
});
