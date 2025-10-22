import { memo, useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { TUnitTypeDropdownProps } from "./types";
import { volumeUnitOptions } from "./values";

function UnitTypeDropdown({
  value,
  onChange,
  hideOption,
  placeholder = "Select unit",
  disabled = false,
}: TUnitTypeDropdownProps) {
  const volumeUnitOptionsFiltered = useMemo(() => {
    const hideOptionSet = new Set(hideOption);
    return volumeUnitOptions?.filter((item) => !hideOptionSet.has(item.value));
  }, [hideOption]);

  return (
    <Select
      // onValueChange={onChange} value={value ?? undefined}
      value={value ?? ""}
      onValueChange={(val) => {
        if (val) {
          onChange?.(val); // prevent undefined/empty string propagation
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger className="!border-0 !px-1 focus:ring-0 disabled:bg-transparent data-[state=open]:ring-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent align="end">
        {volumeUnitOptionsFiltered?.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default memo(UnitTypeDropdown);
