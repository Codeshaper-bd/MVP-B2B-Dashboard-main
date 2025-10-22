import Image from "next/image";

import { useBooleanContext } from "@/contexts/BooleanContext";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";

import { useSelectInputContext } from "./SelectProvider";

export interface ISelectedItemProps {
  item: TGroupInventoryItemData;
}
function SelectedItem({ item }: ISelectedItemProps) {
  const { setClose } = useBooleanContext();
  const { onValueChange } = useSelectInputContext();
  return (
    <div
      className="flex cursor-pointer items-center gap-2 px-4 py-2.5 hover:bg-default-100"
      onClick={() => {
        onValueChange?.(item);
        setClose();
      }}
    >
      <Image
        src={getImageFallback({ src: item?.media?.[0]?.url })}
        alt={item?.name}
        width={200}
        height={100}
        className="h-8 w-8 rounded"
      />
      <div className="text-sm font-medium text-default-900">{item?.name}</div>
      <div className="size-1 rounded-full bg-default-1000"></div>
      <div className="text-sm font-medium text-default-700">
        Sold By the {item?.soldBy}
      </div>
    </div>
  );
}

export default SelectedItem;
