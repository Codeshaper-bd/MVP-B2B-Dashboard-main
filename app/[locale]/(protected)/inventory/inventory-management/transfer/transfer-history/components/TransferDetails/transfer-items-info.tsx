import Image from "next/image";
import React from "react";

import { getImageFallback } from "@/lib/media/get-image-fallback";
import StarFillIcon from "@/components/icons/StarFillIcon";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  { qty: 1, name: "Cocktail Mojito", size: "750ml" },
  { qty: 2, name: "Chardonnay Wine", size: "750ml" },
  { qty: 1, name: "Beer Budweiser", size: "750ml" },
];

export default function TransferItemsInfo() {
  return (
    <div className="space-y-4">
      <h3>Items Transferred</h3>

      <Card className="glass-card">
        <CardContent className="space-y-5 !p-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <Image
                src={getImageFallback({
                  src: "",
                  fallbackImageSize: 100,
                })}
                alt={item.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-[6px]"
              />
              <div className="flex flex-1 flex-col items-start gap-1">
                <span className="text-sm font-semibold text-default-900">
                  {item.qty}x {item.name}
                </span>
                <span className="text-xs text-default-700">{item.size}</span>
              </div>
            </div>
          ))}

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <StarFillIcon className="size-5 text-primary" />
              <h3 className="text-base font-semibold text-primary">
                Additional Notes
              </h3>
            </div>
            <div className="h-[96px] rounded-[12px] border border-default-200 bg-default-100 p-4">
              None.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
