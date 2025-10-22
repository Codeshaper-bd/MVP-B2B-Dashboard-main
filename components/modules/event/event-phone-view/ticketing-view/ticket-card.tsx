"use client";

import { cn } from "@/lib/utils";
import QuestionIcon from "@/components/icons/QuestionIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import IconBorder from "@/components/ui/icon-border";

import Counter from "./counter";

interface TicketCardProps {
  ticketType: string;
  availableTicket: number;
  ticketCount: number;
  ticketPrice: number;
  badgeClassName?: string;
  badgeText?: string;
}
function TicketCard({
  ticketType,
  availableTicket,
  ticketCount,
  ticketPrice,
  badgeClassName = "statusGreen",
  badgeText = "Discount Applied",
}: TicketCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="absolute right-[125px] top-0 z-50 h-6 w-7 -translate-y-1/2 rounded-full border border-[#E0B148]/50 bg-[#0c111d] group-hover:border-[#E0B148]"></div>
      <div className="absolute bottom-0 right-[125px] z-50 h-6 w-7 translate-y-1/2 rounded-full border border-[#E0B148]/50 bg-[#0c111d] group-hover:border-[#E0B148]"></div>
      <Card className="cursor-pointer overflow-hidden rounded-lg border-[#E0B148]/50 shadow-none group-hover:border-[#E0B148]">
        <CardContent className="!px-0 !py-5">
          <div className="flex justify-between">
            <div className="flex-1 border-r border-dashed border-[#E0B148]/50 ps-5 group-hover:border-[#E0B148]">
              <div className="flex items-center gap-1.5">
                <IconBorder className="size-[26px] rounded-full border-none bg-[#5E5E5E]">
                  <TicketIcon className="size-4 text-default-foreground" />
                </IconBorder>

                <span className="line-clamp-2 max-w-[132px] flex-1 text-sm font-medium text-default-1000">
                  {ticketType}
                </span>

                <QuestionIcon className="mr-2.5 size-4 text-[#E0B148]" />
              </div>

              <h3 className="mt-2.5 ps-0.5 text-xs font-medium text-[#B0AAAA]">
                {availableTicket} Tickets Available
              </h3>

              <div className="mt-4">
                <Counter count={ticketCount} />
              </div>
            </div>

            <div className="flex h-full flex-none flex-col items-center gap-4 px-5">
              <Badge className={cn("h-6 px-2 text-[10px]", badgeClassName)}>
                {badgeText}
              </Badge>
              <div className="flex flex-col items-center text-xl font-medium text-[#E0B148]">
                <p>${ticketPrice}</p>
                {/* <p className="line-through decoration-[#FF0000]">$450</p> */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TicketCard;
