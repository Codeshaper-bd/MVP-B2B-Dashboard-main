import Image from "next/image";
import { memo } from "react";

import { cn } from "@/lib/utils";
import CrossIcon from "@/components/icons/CrossIcon";

import type { TUniqueMedia } from "../types";

export type TFormImageItem = TUniqueMedia & { id: string };

export type TViewImagesProps = {
  item: TFormImageItem;
  handleRemove?: (index: TViewImagesProps["index"]) => void;
  isAlreadyAdded?: boolean;
  index: number;
};

function ViewImages({
  item,
  handleRemove,
  isAlreadyAdded,
  index,
}: TViewImagesProps) {
  return (
    <div
      className={cn("relative h-[102px] border border-transparent", {
        "border-primary": isAlreadyAdded,
      })}
    >
      <div
        className="absolute -right-2 -top-2 shrink-0 cursor-pointer rounded-full bg-warning p-0.5 text-default-foreground"
        onClick={() => handleRemove?.(index)}
      >
        <CrossIcon className="size-4" />
      </div>

      <Image
        width={100}
        height={100}
        className="h-full w-full rounded-lg !object-cover"
        src={item?.url || ""}
        alt="Gallery Selected Image"
      />
    </div>
  );
}

export default memo(ViewImages);
