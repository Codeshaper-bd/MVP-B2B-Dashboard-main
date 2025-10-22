"use client";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TGetAllInventoryItemIncludingBarArgs } from "@/store/api/inventory-item/inventory-item.types";
import { Tag } from "@/components/ui/tag";

function InventoryFilteredValue() {
  const { deleteAParam, getAllParamValue } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemIncludingBarArgs, void>
    >();

  const { priceRange, stockRange, categories } = getAllParamValue();

  const formatLabel = (prefix: string, value: string) => {
    if (!value) {
      return "";
    }
    if (value.startsWith("<")) {
      return `${prefix}: ${value.slice(1)} or less`;
    }
    if (value.startsWith(">")) {
      return `${prefix}: ${value.slice(1)} or more`;
    }
    return `${prefix}: ${value}`;
  };

  return (
    <div className="flex flex-wrap justify-end gap-3">
      {priceRange && (
        <Tag
          label={formatLabel("Price", priceRange)}
          onRemove={() => deleteAParam("priceRange")}
          className="statusBlue"
          iconClass="text-blue-500"
        />
      )}

      {stockRange && (
        <Tag
          label={formatLabel("Stock", stockRange)}
          onRemove={() => deleteAParam("stockRange")}
          className="statusOrange"
          iconClass="text-orange-500"
        />
      )}

      {categories && (
        <Tag
          label={`Categories: ${categories}`}
          onRemove={() => deleteAParam("categories")}
          className="statusGreen"
          iconClass="text-green-500"
        />
      )}
    </div>
  );
}

export default InventoryFilteredValue;
