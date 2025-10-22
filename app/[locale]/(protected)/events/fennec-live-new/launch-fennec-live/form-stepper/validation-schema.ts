import * as Yup from "yup";

import eventDetailsValidationSchema from "./steps/step-one/validation";

const validationSchema = Yup.object().shape({
  eventDetails: eventDetailsValidationSchema,
});

export default validationSchema;
