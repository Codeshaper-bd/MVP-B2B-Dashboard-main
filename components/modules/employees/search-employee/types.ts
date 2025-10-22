import type { GroupBase, OptionsOrGroups } from "react-select";

import type { TNullish } from "@/store/api/common-api-types";
import { type TLazyGetAllEmployeeQuery } from "@/store/api/employees/employees.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

export type TCompareFormInput = {
  employee: IOption | TNullish;
};

export type TLoadOptions<T extends IOption = IOption> =
  | ((
      inputValue: string,
      callback: (options: OptionsOrGroups<T, GroupBase<T>>) => void,
    ) => void | Promise<OptionsOrGroups<T, GroupBase<T>>>)
  | undefined;

export type THandleLoadOptions = (props: {
  getAllEmployee: TLazyGetAllEmployeeQuery;
}) => TLoadOptions;
