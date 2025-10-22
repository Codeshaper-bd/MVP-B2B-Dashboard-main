import { convertToNumber } from "@/lib/data-types/number";
import type { TNullish } from "@/store/api/common-api-types";

function RevenueItem({
  data,
}: {
  data: { label: string; amount: number | TNullish }[];
}) {
  return (
    <div className="flex">
      {data.map((item, index) => (
        <div
          key={`revenue-item-${index}`}
          className="flex-1 border-border px-5 py-1 lg:border-r lg:last:border-0"
        >
          <p className="text-xs text-default-700">{item.label}</p>
          <h2 className="mt-3 text-base font-semibold text-default-900">
            ${convertToNumber({ value: item?.amount })}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default RevenueItem;
