import type { TEventDetailsInputs } from "./steps/step-one/types";
import type { TTicketingInputs } from "./steps/step-two/types";

export type IStepFormInputs = {
  eventDetails: TEventDetailsInputs;
  ticketing: TTicketingInputs;
};
