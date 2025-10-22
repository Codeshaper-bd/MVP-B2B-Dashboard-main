import type { TNullish } from "@/store/api/common-api-types";
import type {
  TGuestListType,
  TUpdateAPromoterAssignmentsArgs,
} from "@/store/api/promoters/promoters.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

type TOption = {
  label: string;
  value: number;
};

export type ICreatePromoterFormValues =
  TUpdateAPromoterAssignmentsArgs["body"] & {
    selectedEvent?: IOption<TOption>[] | TNullish;
  };

export interface IGuestListPermissionProps {
  label: string;
  value: TGuestListType;
}
