import type { TNullish } from "@/store/api/common-api-types";
import type {
  TEvent,
  TEventStatusConditionalFields,
  TGuestListOn,
  TScheduleEventStatus,
} from "@/store/api/events/events.types";

// Type predicate function to narrow down the type of event
export const checkIsScheduleEvent = (
  event: TEvent | TNullish,
): event is TEvent & {
  details: TEventStatusConditionalFields & TScheduleEventStatus;
} => event?.details?.status === "Scheduled";

/**
 * Type predicate to check if guest list is ON (i.e., isFreeGuestList is true)
 */
export function checkIsGuestListOn(
  eventDetails: TEvent["details"] | TNullish,
): eventDetails is TEvent["details"] & TGuestListOn {
  return !!eventDetails && Boolean(eventDetails.isFreeGuestList) === true;
}
