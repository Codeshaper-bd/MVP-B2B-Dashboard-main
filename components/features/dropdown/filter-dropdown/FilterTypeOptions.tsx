import { useCallback } from "react";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

export interface IFilterTypeOptionsProps<T extends string | number> {
  checkedItem?: T;
  setCheckedItem?: (value: T) => void;
  options?: { value: T; label: string }[];
}

function FilterTypeOptions<T extends string | number>({
  checkedItem,
  setCheckedItem,
  options,
}: IFilterTypeOptionsProps<T>) {
  const handleCheckedChange = useCallback(
    ({
      filterType,
      setCheckedItem,
    }: {
      filterType: { value: T; label: string };
      setCheckedItem?: (value: T) => void;
    }) =>
      () => {
        setCheckedItem?.(filterType.value);
      },
    [],
  );

  return (
    <>
      {options?.map((option) => (
        <DropdownMenuCheckboxItem
          key={option?.value}
          checked={checkedItem === option?.value}
          onCheckedChange={handleCheckedChange({
            filterType: option,
            setCheckedItem,
          })}
          className="cursor-pointer [&>span>span>svg]:text-primary"
        >
          {option?.label}
        </DropdownMenuCheckboxItem>
      ))}
    </>
  );
}

export default FilterTypeOptions;
