import type { GroupBase, OptionsOrGroups } from "react-select";

import type { TLazyGetAllEventQuery } from "@/store/api/events/events.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

export type TLoadOptions<T extends IOption = IOption> =
  | ((
      inputValue: string,
      callback: (options: OptionsOrGroups<T, GroupBase<T>>) => void,
    ) => void | Promise<OptionsOrGroups<T, GroupBase<T>>>)
  | undefined;

export type THandleLoadOptions = (props: {
  getAllEvent: TLazyGetAllEventQuery;
}) => TLoadOptions;
