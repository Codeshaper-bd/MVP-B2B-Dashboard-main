import type { TNullish } from "@/store/api/common-api-types";
import type { TCreateEventData } from "@/store/api/events/events.types";

export interface IAnEventTimeExtendFormProps {
  eventSummery: TCreateEventData | TNullish;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}
export type TAnEventTimeForm = {
  eventNumber: number;
};
