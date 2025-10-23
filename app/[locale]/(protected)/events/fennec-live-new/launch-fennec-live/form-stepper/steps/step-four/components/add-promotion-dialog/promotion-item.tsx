import { memo } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import {
  EPromotionType,
  type TPromotion,
} from "@/store/api/promotion/promotion.types";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { DatabaseIcon as DataBaseIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface IPromotionItemProps {
  item: TPromotion;
  handleSelected?: (data: IPromotionItemProps["item"]) => void;
  setOpen: (open: boolean) => void;
  isSelected?: boolean;
  isNotSelectable?: boolean;
}

function PromotionItem({
  setOpen,
  handleSelected,
  item: { name, type, endDate },
  item,
  isSelected,
  isNotSelectable,
}: IPromotionItemProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer rounded-[8px] border bg-default-50 hover:bg-default-100/90",
        {
          "border-primary": isSelected,
          "cursor-not-allowed border-destructive": isNotSelectable,
        },
      )}
      onClick={() => {
        if (isNotSelectable) {
          return;
        }
        handleSelected?.(item);
        setOpen(false);
      }}
    >
      <CardContent className="space-y-4 px-4 py-5">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold text-default-900">
            {name}
          </h3>
        </div>

        <Separator className="bg-default-200/40" />

        <div className="flex flex-col gap-3 text-sm font-normal">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <DataBaseIcon className="h-4 w-4" /> <span>Type</span>
            </div>

            <p>{!!type && EPromotionType[type]}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <CalenderIcon className="h-4 w-4" />
              <span className="text-sm font-normal">Valid Until</span>
            </div>

            <p>
              {convertUTCToLocal({
                format: "DD MMM YYYY",
                utcDateTime: endDate,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(PromotionItem);
