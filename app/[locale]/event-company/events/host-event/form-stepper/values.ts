import { eventDetailsValues } from "./steps/step-one/values";
import { ticketingValues } from "./steps/step-two/values";
import type { IStepFormInputs } from "./type";

export const defaultValues: IStepFormInputs = {
  eventDetails: eventDetailsValues,
  ticketing: ticketingValues,
};
