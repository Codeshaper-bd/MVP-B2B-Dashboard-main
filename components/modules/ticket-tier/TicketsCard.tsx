import { memo } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type {
  TTicketTier,
  TTicketTierStatus,
} from "@/store/api/ticket-tier/ticket-tier.types";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import { DollarIcon as DollarIcon } from "@/components/icons";
import { EditIcon as EditPenIcon } from "@/components/icons";
import PackageIcon from "@/components/icons/PackageIcon";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type TTicketsProps = TTicketTier & {
  editTierHandler?: (item: TTicketTier) => void;
  onReleaseTierClick?: (item: TTicketTier) => void;
  onEndTierClick?: (item: TTicketTier) => void;
  onDeleteTierClick?: (item: TTicketTier) => void;
  disableReleaseTier?: boolean;
  disableEndTier?: boolean;
  disableDeleteTier?: boolean;
  isShowBadge?: boolean;
};
const getStatusColor = (status: TTicketTierStatus | undefined) => {
  switch (status) {
    case "Active":
      return "success";
    case "Ended":
      return "warning";
    default:
      return "primary";
  }
};
function TicketsCard({
  editTierHandler,
  onEndTierClick,
  onReleaseTierClick,
  onDeleteTierClick,
  disableReleaseTier,
  disableEndTier,
  disableDeleteTier,
  isShowBadge = true,
  ...item
}: TTicketsProps) {
  const {
    id,
    maxQty,
    soldQty,
    name,
    price,
    isAutoRelease,
    status,
    maxTicketsPerCustomer,
  } = item;

  return (
    <Card className="col-span-1 shadow-none">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">{name}</CardTitle>

            <p className="mt-2 text-sm font-normal text-[#85888E]">
              {!!isAutoRelease && "startDate" in item
                ? convertUTCToLocal({
                    utcDateTime: item.startDate,
                    format: "DD MMMM YYYY, HH:mm",
                  })
                : "Not Available"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-normal text-default-700">
            <DollarIcon stroke="#94969C" className="h-[14px] w-[14px]" />
            Price
          </div>

          <p className="font-medium">
            $
            {convertToNumber({
              value: price,
              digit: 2,
              fallback: 0,
            })}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-normal text-default-700">
            <PackageIcon stroke="#94969C" className="h-[14px] w-[14px]" />
            Max Quantity
          </div>

          <p>{maxQty}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-normal text-default-700">
            <ShoppingCartIcon stroke="#94969C" className="h-[14px] w-[14px]" />
            Total Sold
          </div>

          <p>{soldQty}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-normal text-default-700">
            <TicketIcon stroke="#94969C" className="h-[14px] w-[14px]" />
            Max Tickets Per Customer
          </div>

          <p>{maxTicketsPerCustomer}</p>
        </div>

        <div className="relative mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm font-normal text-default-700">
              <CalenderIcon stroke="#94969C" className="h-[14px] w-[14px]" />
              Tier Start
            </div>

            <p className="mt-1 text-sm font-normal">
              {item?.startDate
                ? convertUTCToLocal({
                    utcDateTime: item?.startDate,
                    format: "DD MMMM YYYY,  hh:mm A",
                  })
                : "-"}
            </p>
          </div>

          <div className="absolute left-1.5 top-6 h-6 w-[1px] bg-[#85888E]"></div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm font-normal text-default-700">
              <CalenderIcon stroke="#94969C" className="h-[14px] w-[14px]" />
              Tier End
            </div>

            <p className="mt-1 text-sm font-normal">
              {item?.endDate
                ? convertUTCToLocal({
                    utcDateTime: item?.endDate,
                    format: "DD MMMM YYYY,  hh:mm A",
                  })
                : "-"}
            </p>
          </div>
        </div>
        {isShowBadge && (
          <p className="mt-1 flex-1 text-sm font-medium text-default-700">
            Automate Release :{" "}
            {isAutoRelease ? (
              <span className="text-success">Yes</span>
            ) : (
              <span className="text-warning">No</span>
            )}
          </p>
        )}
        <Separator className="my-4" />
        <div className="flex">
          {isShowBadge && (
            <div className="flex flex-1 items-center gap-2.5">
              <Badge
                color={getStatusColor(status)}
                className="!border !py-[2px] !text-[12px] !font-normal capitalize"
              >
                {status}
              </Badge>
              {status === "Upcoming" && (
                <button
                  onClick={() => onReleaseTierClick?.(item)}
                  type="button"
                  className="text-xs font-medium text-success"
                  disabled={disableReleaseTier}
                >
                  Release Tier
                </button>
              )}
              {status === "Active" && (
                <button
                  onClick={() => onEndTierClick?.(item)}
                  type="button"
                  className="text-xs font-medium text-warning"
                  disabled={disableEndTier}
                >
                  End Tier
                </button>
              )}
            </div>
          )}
          {!isShowBadge && (
            <p className="flex-1 text-sm font-medium text-default-700">
              Automate Release :{" "}
              {isAutoRelease ? (
                <span className="text-success">Yes</span>
              ) : (
                <span className="text-warning">No</span>
              )}
            </p>
          )}

          {!!editTierHandler && status !== "Active" && (
            <button
              type="button"
              onClick={() => editTierHandler?.(item)}
              className="flex-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <EditPenIcon className="h-5 w-5" />
            </button>
          )}

          {!!onDeleteTierClick && status === "Upcoming" && (
            <button
              type="button"
              onClick={() => onDeleteTierClick?.(item)}
              disabled={disableDeleteTier}
              className="ml-2 flex-none text-default-600 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
            >
              <DeleteIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(TicketsCard);
