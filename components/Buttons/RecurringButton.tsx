import { memo } from "react";

import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEventRecurringFor } from "@/store/api/events/events.types";
import { Badge } from "@/components/ui/badge";

export interface IRecurringButtonProps {
  recurringFor?: TEventRecurringFor | TNullish;
  isRecurring?: boolean;
  showIcon?: boolean;
}
const formatRecurringText = (text: string) => text.split("_").join(" ");
const getBadgeClassName = (recurringFor: TEventRecurringFor) => {
  switch (recurringFor) {
    case "ONE_TIME":
      return "statusOrange";
    case "EVERY_DAY":
      return "statusBlue";
    case "EVERY_WEEK":
      return "statusBlue";
    case "EVERY_MONTH":
      return "statusIndigo";
    default:
      return "statusDefault";
  }
};

const getDotClassName = (recurringFor: TEventRecurringFor) => {
  switch (recurringFor) {
    case "ONE_TIME":
      return "bg-[#932F19]";
    case "EVERY_DAY":
      return "bg-[#065986]";
    case "EVERY_WEEK":
      return "bg-[#065986]";
    case "EVERY_MONTH":
      return "bg-[#2D31A6]";
    default:
      return "bg-[#333741]";
  }
};

function RecurringButton({
  recurringFor,
  isRecurring = false,
  showIcon = true,
}: IRecurringButtonProps) {
  if (!isRecurring || !recurringFor) {
    return null;
  }

  return (
    <Badge className={getBadgeClassName(recurringFor)}>
      {showIcon && (
        <span
          className={cn(
            "mr-1.5 h-2 w-2 rounded-full",
            getDotClassName(recurringFor),
          )}
        ></span>
      )}
      {formatRecurringText(recurringFor)}
    </Badge>
  );
}

export default memo(RecurringButton);
