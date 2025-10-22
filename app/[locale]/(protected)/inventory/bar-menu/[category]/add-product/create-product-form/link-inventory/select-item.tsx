import Image from "next/image";
import { memo } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { toRegularCase } from "@/lib/strings/toRegularCase";
import type { TNullish } from "@/store/api/common-api-types";
import type { TSingleInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import { Checkbox } from "@/components/ui/checkbox";

function SelectItem({
  item,
  handleToggleSelect,
  isSelected,
}: {
  item: TSingleInventoryItemData;
  handleToggleSelect?: (item: TSingleInventoryItemData) => void;
  isSelected: boolean | TNullish;
}) {
  const { id, name, volume, unit, type, media, soldBy } = item;

  return (
    <div
      className="flex cursor-pointer items-center border-b px-4 py-2 last:border-none"
      onClick={() => {
        handleToggleSelect?.(item);
      }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div>
            <Image
              // src={
              //   media?.find((med) => med?.isFeatured)?.url ||
              //   media?.[0]?.url ||
              //   "/assets/all/p1.png"
              // }
              src={getImageFallback({
                src:
                  media?.find((med) => med?.isFeatured)?.url || media?.[0]?.url,
              })}
              alt={name}
              width={32}
              height={32}
              className="size-8 object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="line-clamp-1 text-base font-medium text-default-900">
                {name}
              </h3>

              {type === "NON_ALCOHOLIC" && (
                <div className="inline-flex items-center gap-1 rounded-[5px] bg-[#6938EF] px-2 py-0.5 text-xs font-medium text-default-1000">
                  <span className="inline-block size-[5px] flex-none rounded-full bg-default-1000"></span>
                  NON ALCOHOLIC
                </div>
              )}
            </div>

            <p className="text-sm text-default-700">
              {volume} {unit} ({toRegularCase(soldBy)})
            </p>
          </div>
        </div>
      </div>

      <div
        className="h-fit w-fit flex-none"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={!!isSelected}
          onChange={() => {
            handleToggleSelect?.(item);
          }}
        />
      </div>
    </div>
  );
}

export default memo(SelectItem);
