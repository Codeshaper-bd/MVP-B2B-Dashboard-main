import { memo } from "react";

import { getAvatarFallbackName } from "@/lib/user/get-avatar-fallback-name";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { IRefundItem } from ".";

const processStatus = (status: string | TNullish) => {
  const lowercaseStatus = status?.toLowerCase() || "pending";
  switch (lowercaseStatus) {
    case "pending":
      return "pending";
    case "accepted":
    case "approved":
      return "accepted";
    case "rejected":
    case "denied":
      return "rejected";
    case "processing":
      return "processing";
    case "completed":
    case "fulfilled":
      return "completed";
    case "cancelled":
    case "canceled":
      return "cancelled";
    default:
      return "pending";
  }
};

interface RefundItemProps extends IRefundItem {
  onClick?: (item: IRefundItem) => void;
  setOpen?: (open: boolean) => void;
}

function RefundItem({ onClick, setOpen, ...refundItem }: RefundItemProps) {
  const status = processStatus(refundItem?.status);

  return (
    <div
      key={refundItem?.id}
      className="w-full cursor-pointer border-b border-b-[#1F242F] last:border-none hover:bg-[#1F242F]"
      onClick={() => {
        onClick?.(refundItem);
        setOpen?.(true);
      }}
    >
      <div className="flex items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={refundItem.media} />
          <AvatarFallback>
            {getAvatarFallbackName(refundItem?.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-semibold text-default-1000">
            Refund Request - <span>{refundItem?.name}</span>
          </h3>
          <p
            className={cn("text-sm font-medium capitalize text-[#F97066]", {
              "text-[#FFC833]": status === "pending",
              "text-[#47CD89]": status === "accepted",
            })}
          >
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(RefundItem);
