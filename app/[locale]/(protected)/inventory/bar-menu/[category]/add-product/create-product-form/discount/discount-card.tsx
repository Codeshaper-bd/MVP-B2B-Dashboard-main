import { memo } from "react";

import ClockIcon from "@/components/icons/ClockIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import PercentIcon from "@/components/icons/PercentIcon";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SingleDiscountProps {
  id: number | string;
  title: string;
  totalDiscount: string;
  duration: string;
  remainingDuration: string;
}

interface DiscountProps {
  item: SingleDiscountProps;
  enableDiscountActions?: boolean;
  editDiscountHandler?: () => void;
  deleteDiscountHandler?: () => void;
}

function DiscountCard({
  item,
  deleteDiscountHandler,
  editDiscountHandler,
  enableDiscountActions = false,
}: DiscountProps) {
  return (
    <Card className="col-span-1 rounded-lg border-default-200 bg-secondary p-4 shadow-none">
      <div className="mb-3 flex items-center justify-between">
        <CardTitle className="flex items-center justify-start gap-3 text-base font-normal">
          <PercentIcon className="h-5 w-5" />
          {item.title}
        </CardTitle>

        {enableDiscountActions && (
          <div className="flex items-center gap-3">
            <div onClick={editDiscountHandler}>
              <EditPenIcon
                className="h-5 w-5 cursor-pointer"
                stroke="#F79009"
              />
            </div>

            <div onClick={deleteDiscountHandler}>
              <DeleteIcon className="h-5 w-5 cursor-pointer text-[#F04438]" />
            </div>
          </div>
        )}
      </div>

      <Separator className="bg-default-200" />

      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <PercentIcon className="h-[14px] w-[14px]" />
          Total Discount
        </p>
        <span>{item.totalDiscount}</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <ClockIcon className="h-[14px] w-[14px]" />
          Duration
        </p>
        <span>{item.duration}</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <ClockIcon className="h-[14px] w-[14px]" />
          Remaining Duration
        </p>
        <span>{item.remainingDuration}</span>
      </div>
    </Card>
  );
}

export default memo(DiscountCard);
