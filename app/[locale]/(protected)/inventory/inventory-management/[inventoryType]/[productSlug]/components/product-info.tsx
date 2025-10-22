import Image from "next/image";
import { useMemo } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import type { TGroupInventoryItemData } from "@/store/api/inventory-item/inventory-item.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import ChangeImage from "./change-image";

function ProductInfoCard({
  getAnInventoryItemData,
}: {
  getAnInventoryItemData: TGroupInventoryItemData | TNullish;
}) {
  const mediaUrl = useMemo(
    () =>
      getImageFallback({
        src:
          getAnInventoryItemData?.media?.find((med) => med?.isFeatured)?.url ||
          getAnInventoryItemData?.media?.[0]?.url,
      }),
    [getAnInventoryItemData?.media],
  );
  return (
    <div className="w-full max-w-[348px] flex-none lg:w-[348px]">
      <Card className="overflow-hidden p-0">
        <CardContent className="relative p-0">
          <ChangeImage item={getAnInventoryItemData} />
          <Image
            src={
              getAnInventoryItemData?.type === "ALCOHOLIC"
                ? "/images/all-img/bg-alcoholic.png"
                : "/images/all-img/bg-non-alcoholic.png"
            }
            alt={getAnInventoryItemData?.name ?? "Drinks image"}
            layout="fill"
          />
          <div className="relative flex items-center justify-center py-4">
            <Image
              src={mediaUrl}
              alt={getAnInventoryItemData?.name ?? "Drinks image"}
              width={80}
              height={212}
              className="h-[185px] w-fit"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-1.5 p-4 text-default-700">
          <h3 className="text-xl font-semibold text-default-900">
            {getAnInventoryItemData?.name}
          </h3>

          <div className="flex w-full gap-2 text-base font-medium text-gray-400">
            <span>ID</span>
            <span>#{getAnInventoryItemData?.id}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductInfoCard;
