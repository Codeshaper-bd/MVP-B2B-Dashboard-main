import type { UseFormReturn } from "react-hook-form";

import type { TNullish } from "@/store/api/common-api-types";
import type { TCreateAnEventArgs } from "@/store/api/events/events.types";
import type { IRadioProps } from "@/components/CustomRadioGroup/Radio";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

import type { IStepFormInputs } from "../../type";

export type TEventDetailsInputs = Omit<
  TCreateAnEventArgs,
  | "media"
  | "startTime"
  | "endTime"
  | "checkInEnd"
  | "isGratuity"
  | "gratuityValue"
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
export interface IFormContentProps {
  formContextProps: UseFormReturn<IStepFormInputs>;
  venueOptions: IOption[];
  isVenueLoading: boolean | undefined | null;
  hideGuestlist: boolean | TNullish;
  // field values
  isRecurring: boolean | TNullish;
  recurringFor: TCreateAnEventArgs["recurringFor"];
  // date time related fields start
  startTimeDateField: Date | TNullish;
  startTimeTimeField: string;
  endTimeDateField: Date | TNullish;
  endTimeTimeField: string;
  checkInEndDateField: Date | TNullish;
  checkInEndTimeField: string;
  isCrowdMeterEnabled: boolean;

  // date time related fields end
  media: File[] | TNullish;
  venueId: number;
  eventSlug: string;

  // media loading
  isMediaLoading?: boolean;
}
