import * as Yup from "yup";

import eventDetailsValidationSchema from "./steps/step-one/validation";
import ticketingValidationSchema from "./steps/step-two/validation";

const validationSchema = Yup.object().shape({
  eventDetails: eventDetailsValidationSchema,
  ticketing: ticketingValidationSchema,
});

export default validationSchema;
