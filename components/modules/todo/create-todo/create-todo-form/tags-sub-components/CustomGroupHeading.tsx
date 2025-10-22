import { type GroupHeadingProps, components } from "react-select";

import { Switch } from "@/components/ui/switch";

import type { TOptionType } from "../types";
const CustomGroupHeading = ({
  onSwitchChange,
  switchChecked,
}: {
  switchChecked: boolean;
  onSwitchChange: (checked: boolean) => void;
}) => {
  function GroupHeader(props: GroupHeadingProps<TOptionType>) {
    return (
      <div className="relative mx-2 flex justify-between gap-3 border-b border-default-200 px-1 py-2.5">
        <components.GroupHeading
          className="flex items-center gap-2 text-2xl font-medium text-default-900"
          {...props}
        />

        <Switch
          checked={!!switchChecked}
          color="success"
          onCheckedChange={onSwitchChange}
        />
      </div>
    );
  }

  GroupHeader.displayName = "GroupHeader";
  return GroupHeader;
};

export default CustomGroupHeading;
