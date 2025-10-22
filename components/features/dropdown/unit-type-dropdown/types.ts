import type { TUnit } from "@/store/api/bar-menu-item/bar-menu-item.types";

export type TUnitTypeDropdownProps = {
  value: TUnit | (string & {}) | null | undefined;
  onChange?: (value: string) => void;
  hideOption?: TUnit[];
  placeholder?: string;
  disabled?: boolean;
};

export type TSelectOption<T extends string | number> = {
  label: string;
  value: T;
};
