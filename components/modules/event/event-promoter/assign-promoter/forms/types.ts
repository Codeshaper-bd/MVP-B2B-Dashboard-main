import type { GroupBase, OptionsOrGroups } from "react-select";

import type { TNullish } from "@/store/api/common-api-types";
import type { TLinkTrackingType } from "@/store/api/link-tracking/link-tracking.types";
import type { TLazyGetAllPromotersQuery } from "@/store/api/promoters/promoters.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

export type TAssignPromoterFormInput = {
  promoter: IOption | TNullish;
  type: TLinkTrackingType;
};

export type TLoadOptions<T extends IOption = IOption> =
  | ((
      inputValue: string,
      callback: (options: OptionsOrGroups<T, GroupBase<T>>) => void,
    ) => void | Promise<OptionsOrGroups<T, GroupBase<T>>>)
  | undefined;

export interface IAssignPromoter {
  eventId?: number;
  isEditMode?: boolean;
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type THandleLoadOptions = (props: {
  getAllPromoters: TLazyGetAllPromotersQuery;
}) => TLoadOptions;
