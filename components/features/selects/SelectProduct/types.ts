import type { TSoldByFilter } from "@/app/[locale]/(protected)/inventory/inventory-management/[inventoryType]/components/modals/form/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import type { IOption } from "@/components/SelectInput/DropDown/Option";

export type TSelectInput<T extends IOption> = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: TGroupInventoryItemData | TNullish;
  onValueChange?: (value: TGroupInventoryItemData) => void;
  children?: React.ReactNode;
  filterBy?: TSoldByFilter;
};
