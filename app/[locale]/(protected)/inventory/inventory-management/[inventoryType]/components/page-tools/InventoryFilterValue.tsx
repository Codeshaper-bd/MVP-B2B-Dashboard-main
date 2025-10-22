"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { type TGetAllInventoryItemArgs } from "@/store/api/inventory-item/inventory-item.types";
import { Tag } from "@/components/ui/tag";

import { stockRange, priceRange, category } from "./filters";
function InventoryFilterValue() {
  const { updateMultipleParam, getAllParamValue } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemArgs, void | undefined>
    >();

  const {
    stockRange: stock,
    priceRange: price,
    categories: categoryValue,
  } = getAllParamValue();

  return (
    <div className="my-6 flex flex-wrap justify-end gap-3">
      {stock && (
        <Tag
          label={
            stockRange.find((option) => option.value === stock)?.label ||
            String(stock)
          }
          onRemove={() => updateMultipleParam({ stockRange: undefined })}
          className="statusBlue"
          iconClass="text-blue-500"
        />
      )}

      {price && (
        <Tag
          label={
            priceRange.find((option) => option.value === price)?.label ||
            String(price)
          }
          onRemove={() => updateMultipleParam({ priceRange: undefined })}
          className="statusIndigo"
          iconClass="text-indigo-500"
        />
      )}

      {categoryValue && (
        <Tag
          label={
            category.find((option) => option.value === categoryValue)?.label ||
            String(categoryValue)
          }
          onRemove={() => updateMultipleParam({ categories: undefined })}
          className="statusGreen"
          iconClass="text-green-500"
        />
      )}
    </div>
  );
}

export default InventoryFilterValue;
