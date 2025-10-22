import type { TNullish } from "@/store/api/common-api-types";
import type { TCreateAnEventArgs } from "@/store/api/events/events.types";
import type { IRadioProps } from "@/components/CustomRadioGroup/Radio";

export type TEventDetailsInputs = Omit<
  TCreateAnEventArgs,
  "media" | "startTime" | "endTime" | "checkInEnd"
> & {
  media: File[] | TNullish;
  startTimeDateField: Date | TNullish;
  startTimeTimeField: string;
  endTimeDateField: Date | TNullish;
  endTimeTimeField: string;
  checkInEndDateField: Date | TNullish;
  checkInEndTimeField: string;
};

export interface IRecurringOption extends IRadioProps {
  value?: TCreateAnEventArgs["recurringFor"];
}
