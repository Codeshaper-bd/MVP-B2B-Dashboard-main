import Image from "next/image";

import type { TPromotion } from "@/store/api/promotion/promotion.types";
import { Card, CardContent } from "@/components/ui/card";

interface PromotionCardProps {
  promotion: TPromotion;
}

function PromotionCard({ promotion }: PromotionCardProps) {
  const { name, description, pointsNeeded } = promotion || {};
  return (
    <Card className="border border-primary/30">
      <CardContent className="rounded-md p-3">
        <div className="flex items-center gap-4">
          <div className="flex-none">
            <div className="w-20">
              <Image
                src="/assets/all/promo2.png"
                alt=""
                width={80}
                height={80}
                className="size-20"
              />
            </div>
          </div>

          <div className="max-w-[180px] flex-1">
            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-default-1000">
              {name}
            </h3>

            <p className="line-clamp-3 text-xs font-medium text-default-1000/50">
              {description}
            </p>

            <p className="mt-2.5 text-xs font-medium text-default-1000">
              Cost:{" "}
              <span className="font-semibold text-primary">
                {pointsNeeded} Points
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PromotionCard;
