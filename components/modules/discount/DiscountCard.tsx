import { DiamondPercent, Ticket } from "lucide-react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type {
  TDiscount,
  TUpdateADiscountArgs,
} from "@/store/api/discounts/discounts.types";
import CopyButton from "@/components/Buttons/copy-button";
import CalenderIcon from "@/components/icons/CalenderIcon";
import CodeDiscountIcon from "@/components/icons/CodeDiscountIcon";
import CopyIcon from "@/components/icons/CopyIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import PercentIcon from "@/components/icons/PercentIcon";
import TicketLinkIcon from "@/components/icons/TicketLinkIcon";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TooltipComponent } from "@/components/ui/tooltip";

import DiscountCodeSwitch from "./DiscountCodeSwitch";
interface IDiscountCardProps {
  item: TDiscount;
  handleDiscountEdit?: (id: TUpdateADiscountArgs["id"]) => void;
  handleDeleteDiscount?: (id: TUpdateADiscountArgs["id"]) => void;
  isShowRedeemedCount?: boolean;
}

function DiscountCard({
  item,
  handleDeleteDiscount,
  handleDiscountEdit,
  isShowRedeemedCount,
}: IDiscountCardProps) {
  const {
    id,
    name,
    amount,
    discountType,
    expireDate,
    code,
    maxNumberOfRedemptions,
    maxTicketsPerRedemption,
    redeemedCount,
    urlWithDiscountCode,
    totalTickets,
  } = item;

  return (
    <Card className="col-span-1 rounded-lg border-default-200 bg-secondary p-4 shadow-none">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <CardTitle className="flex flex-1 items-center gap-3 whitespace-nowrap text-base font-normal">
          <PercentIcon className="h-5 w-5" />
          {name}
        </CardTitle>

        <div className="flex flex-none items-center gap-4">
          <DiscountCodeSwitch item={item} />
          <TooltipComponent content={<span>Copy Weblink With Code</span>}>
            <div className="cursor-pointer hover:text-primary">
              <CopyButton
                text={urlWithDiscountCode ?? ""}
                className="hover:text-primary"
                copySuccessMessage="Weblink with code copied to clipboard"
                copyErrorMessage="Weblink with code failed to copy"
              >
                <CopyIcon className="size-5" />
              </CopyButton>
            </div>
          </TooltipComponent>

          <TooltipComponent content={<span>Copy Discount Code</span>}>
            <div className="cursor-pointer hover:text-primary">
              <CopyButton
                text={code ?? ""}
                className="hover:text-primary"
                copySuccessMessage="Discount code copied to clipboard"
                copyErrorMessage="Discount code failed to copy"
              >
                <CopyIcon className="size-5" />
              </CopyButton>
            </div>
          </TooltipComponent>
          {handleDiscountEdit && (
            <div onClick={() => handleDiscountEdit?.(id)}>
              <EditPenIcon className="h-5 w-5 cursor-pointer text-[#F79009]" />
            </div>
          )}

          {handleDeleteDiscount && (
            <div onClick={() => handleDeleteDiscount?.(id)}>
              <DeleteIcon className="h-5 w-5 cursor-pointer text-warning" />
            </div>
          )}
        </div>
      </div>
      <Separator className="bg-default-200" />
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <PercentIcon className="size-3.5" />
          Total Discount
        </p>
        <span>
          {discountType === "FIXED_AMOUNT" ? "$" : ""}
          {amount}
          {discountType === "PERCENTAGE" ? "%" : ""}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <TicketLinkIcon className="size-3.5" />
          Max Number of Redemptions
        </p>
        <span>{maxNumberOfRedemptions}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <TicketLinkIcon className="size-3.5" />
          Max Tickets Per Redemption
        </p>
        <span>{maxTicketsPerRedemption}</span>
      </div>
      {isShowRedeemedCount && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="flex items-center justify-start gap-2">
            <DiamondPercent className="size-3.5" />
            Total Redemptions
          </p>
          <span>{redeemedCount ?? 0}</span>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <Ticket className="size-3.5" />
          Total Tickets Sold
        </p>
        <span>{totalTickets}</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <CalenderIcon className="size-3.5" />
          Expiry
        </p>
        <span>
          {convertUTCToLocal({
            utcDateTime: expireDate,
            format: "DD MMMM YYYY",
          })}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="flex items-center justify-start gap-2">
          <CodeDiscountIcon className="size-3.5" />
          Code Discount
        </p>
        <span>{code || "Not Available"}</span>
      </div>
    </Card>
  );
}

export default DiscountCard;
