import { convertToNumber } from "@/lib/data-types/number";
import type { TNullish } from "@/store/api/common-api-types";
import type {
  TGroupInventoryItemData,
  TSingleInventoryItemData,
} from "@/store/api/inventory-item/inventory-item.types";

function ProductInfo({
  product,
  isChildItem,
}: {
  product?: TGroupInventoryItemData | TSingleInventoryItemData | TNullish;
  isChildItem?: boolean;
}): JSX.Element {
  const { productCode, volume, unit, category, soldBy, pricePerUnit } =
    product || {};
  return (
    <div className="w-full space-y-3 rounded-[8px] border border-default-100 bg-default-50 p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-default-700">Product Code</span>
        <span className="text-default-1000">{productCode || "_"}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-default-700">Volume</span>
        <span className="text-default-1000">
          {isChildItem ? `${volume} ${unit}` : "_"}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-default-700">Inventory Category</span>
        <span className="text-default-1000">{category}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-default-700">Sold by the</span>
        <span className="text-default-1000">{soldBy}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-default-700">Average Price per Unit</span>
        <span className="text-default-1000">
          {pricePerUnit ? `$` : ""}
          {convertToNumber({
            value: pricePerUnit,
            fallback: 0,
            digit: 2,
          }) || "_"}
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
