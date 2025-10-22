import Image from "next/image";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TInventoryCategory } from "@/store/api/inventory-category/inventory-category.types";

import type { IInventoryCategoryOptionProps } from ".";

interface ICategoryOptionProps extends IInventoryCategoryOptionProps {
  category: TInventoryCategory;
}
function CategoryOption({
  category,
  onSelect,
  selectedSlug,
}: ICategoryOptionProps) {
  return (
    <div
      className="flex cursor-pointer flex-col items-center gap-2.5"
      onClick={() => {
        if (category?.slug === selectedSlug) {
          onSelect?.(null);
        } else {
          onSelect?.(category?.slug);
        }
      }}
    >
      <div className="flex-none">
        <div
          className={cn("h-12 w-12 rounded", {
            "ring-2 ring-primary": category?.slug === selectedSlug,
          })}
        >
          <Image
            src={getImageFallback({ src: category?.media?.url })}
            alt={category?.name}
            width={100}
            height={100}
            className="size-full rounded object-cover"
          />
        </div>
      </div>
      <h2
        className={cn("max-w-14 truncate text-xs text-default-700", {
          "text-default-900": category?.slug === selectedSlug,
        })}
      >
        {category?.name}
      </h2>
    </div>
  );
}

export default CategoryOption;
