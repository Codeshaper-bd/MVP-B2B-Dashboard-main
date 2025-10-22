import type { GroupBase, OptionsOrGroups } from "react-select";

import type { TNullish } from "@/store/api/common-api-types";
import type { TLazyGetAllCustomerQuery } from "@/store/api/customer-lookup/customer-lookup.types";
import type { TAddLoyaltyProgramPointsArgs } from "@/store/api/loyalty-program/loyalty-program.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";
export type TLoadOptions<T extends IOption = IOption> =
  | ((
      inputValue: string,
      callback: (options: OptionsOrGroups<T, GroupBase<T>>) => void,
    ) => void | Promise<OptionsOrGroups<T, GroupBase<T>>>)
  | undefined;

export type THandleLoadOptions = (props: {
  getAllCustomerLookup: TLazyGetAllCustomerQuery;
}) => TLoadOptions;

export type TAdditionalSettingsFormType = Pick<
  TAddLoyaltyProgramPointsArgs,
  "points"
> & {
  user: IOption | TNullish;
};
