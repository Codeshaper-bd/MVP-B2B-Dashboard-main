import type { TSoldByFilter } from "@/app/[locale]/(protected)/inventory/inventory-management/[inventoryType]/components/modals/form/utils";
import BooleanContextProvider from "@/contexts/BooleanContext";
import type { TNullish } from "@/store/api/common-api-types";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";

import ProductContent from "./ProductContent";
import { SelectProvider } from "./SelectProvider";
import Trigger from "./Trigger";
export interface ISelectProductProps {
  filterBy?: TSoldByFilter;
  selectedValue: TGroupInventoryItemData | TNullish;
  setSelectedValue: React.Dispatch<
    React.SetStateAction<TGroupInventoryItemData | TNullish>
  >;
}
function SelectProduct({
  selectedValue,
  setSelectedValue,
  filterBy,
}: ISelectProductProps) {
  return (
    <BooleanContextProvider>
      <SelectProvider
        value={selectedValue}
        onValueChange={(val) => {
          setSelectedValue(val);
        }}
        filterBy={filterBy}
      >
        <Trigger />
        <ProductContent />
      </SelectProvider>
    </BooleanContextProvider>
  );
}

export default SelectProduct;
