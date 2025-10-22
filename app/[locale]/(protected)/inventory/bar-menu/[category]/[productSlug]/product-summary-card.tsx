import Image from "next/image";
import { useMemo } from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TBarMenuItem } from "@/store/api/bar-menu-item/bar-menu-item.types";
import type { TNullish } from "@/store/api/common-api-types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import ChangeImage from "./change-image";

function ProductSummaryCard({ product }: { product: TBarMenuItem | TNullish }) {
  const { name, price = 0, media } = product || {};
  const mediaUrl = useMemo(
    () => media?.find((med) => med?.isFeatured)?.url || media?.[0]?.url || "",
    [media],
  );

  return (
    <div className="w-full max-w-[348px] flex-none">
      <Card className="relative w-full space-y-4 bg-default-50">
        <CardContent className="p-0">
          <ChangeImage item={product} />
          <div className="h-[212px] overflow-hidden rounded-t-[12px] p-3">
            <Image
              src={getImageFallback({ src: mediaUrl })}
              width={254}
              height={185}
              className="size-full object-contain"
              alt="Drinks image"
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-1.5 px-4 text-default-700">
          <h3 className="text-xl font-semibold text-default-900">{name}</h3>
          <div className="flex w-full justify-between gap-2 text-lg font-medium">
            <span>Price</span>
            <span>$ {price}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductSummaryCard;
