import { type GroupBase, type OptionProps, components } from "react-select";

import HistoryIcon from "@/components/icons/historyIcon";

import type { TOptionType } from "../types";

function CustomOption(
  props: OptionProps<TOptionType, true, GroupBase<TOptionType>>,
) {
  const { label } = props.data;
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <HistoryIcon className="h-4 w-4 text-default-600" />
        <span className="text-base font-medium text-default-900">{label}</span>
      </div>
    </components.Option>
  );
}

export default CustomOption;
