import Image from "next/image";
import { useState } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { CheckIcon as CheckIcon } from "@/components/icons";
import { NoDataFound } from "@/components/icons/NoDataFound";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DataNotFound from "@/components/ui/data-not-found";

import type { IEventViewProps } from "..";
import AddonItem from "./addon-item";
import TicketCard from "./ticket-card";

function TicketingView({
  getAnEventData,
  getAnEventApiState,
}: IEventViewProps) {
  const {
    ticketTiers = [],
    addOns = [],
    groupDiscount,
    details,
  } = getAnEventData || {};
  const totalTicketPrice = ticketTiers?.reduce(
    (acc, ticket) => acc + convertToNumber({ value: ticket.price, digit: 2 }),
    0,
  );
  const isFreeGuestList = details?.isFreeGuestList;
  const [activeTab, setActiveTab] = useState<"guest" | "table">("guest");
  return (
    <RenderData
      {...getAnEventApiState}
      data={getAnEventData}
      expectedDataType="object"
    >
      <div>
        <div className="mx-3 mt-10 flex gap-2.5 rounded-[8px] border border-[#3a3a3a] bg-[#121212] p-1">
          <Button
            type="button"
            color={activeTab === "guest" ? "primary" : "secondary"}
            fullWidth
            onClick={() => setActiveTab("guest")}
            className="border-none"
          >
            Guest List
          </Button>

          <Button
            type="button"
            color={activeTab === "table" ? "primary" : "secondary"}
            fullWidth
            onClick={() => setActiveTab("table")}
            className="border-none"
            disabled
          >
            Table Service
          </Button>
        </div>

        {activeTab === "guest" && (
          <>
            <div className="mt-[34px] space-y-5 px-2.5">
              <h3 className="text-base font-medium text-default-1000">
                Select a Ticket
              </h3>
              <div className="flex items-center justify-between gap-1 rounded-[8px] border border-[#3a3a3a] bg-[#121212] px-4 py-2.5">
                <span className="text-xs font-medium">CH9012KAAG</span>
                <CheckIcon className="size-5 rounded-full bg-success p-1 text-default" />
              </div>
              {isFreeGuestList ? (
                <div className="max-w-9/12 text-center">
                  <NoDataFound className="mx-auto mb-2 size-9/12" />
                  No Group Ticket found
                </div>
              ) : (
                <div className="space-y-5">
                  {ticketTiers?.map((ticketTier) => (
                    <TicketCard
                      key={ticketTier?.id}
                      ticketType={ticketTier?.name}
                      availableTicket={convertToNumber({
                        value: ticketTier?.maxQty,
                        digit: 2,
                      })}
                      ticketCount={ticketTier?.maxQty}
                      ticketPrice={convertToNumber({
                        value: ticketTier?.price,
                        digit: 2,
                      })}
                    />
                  ))}
                  <TicketCard
                    ticketType={"Group Discount"}
                    availableTicket={convertToNumber({
                      value: groupDiscount?.maxQty,
                      digit: 2,
                    })}
                    ticketCount={groupDiscount?.amount || 0}
                    ticketPrice={convertToNumber({
                      value: groupDiscount?.amount,
                      digit: 2,
                    })}
                    badgeText="Group Discount"
                    badgeClassName="bg-[#E0B148]/80 text-default-foreground"
                  />
                </div>
              )}
            </div>

            <div className="mt-10 px-3">
              <h3 className="text-base font-medium text-default-1000">
                Select Add-Ons
              </h3>

              <p className="mt-1 text-sm font-normal text-default-1000/50">
                Add-Ons cannot be transferred.
              </p>

              <div className="mt-5 space-y-5">
                {addOns?.length === 0 && (
                  <DataNotFound
                    title="No Add-Ons Found"
                    subtitle="We couldn’t find any Add-Ons."
                  />
                )}
                {addOns?.map((addon) => (
                  <AddonItem
                    key={addon?.id}
                    icon={getImageFallback({
                      src: addon?.media?.url,
                      fallbackImageSize: 100,
                    })}
                    title={addon?.name}
                    price={convertToNumber({
                      value: addon?.price,
                      digit: 2,
                    })}
                    countAddon={addOns?.length}
                  />
                ))}
              </div>
            </div>

            <Card className="mt-10 border-none px-3">
              <CardContent className="rounded-[10px] border border-[#3a3a3a] bg-[#121212] p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-default-1000">
                      ${totalTicketPrice}
                    </h3>
                    <h4 className="text-sm font-medium text-default-1000/50">
                      Regular x 1
                    </h4>
                  </div>

                  <div className="flex-none">
                    <Button
                      className="rounded-[8px] border-[#E0B148] bg-transparent hover:bg-[#E0B148]"
                      type="button"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        {activeTab === "table" && (
          <div className="mt-[100px]">
            <div className="mx-auto w-[80%] flex-none">
              <Image
                src={"/images/all-img/commingsoon.png"}
                alt="coming soon image"
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
              <h3 className="-mt-6 text-center text-4xl font-medium text-default-1000">
                Coming Soon
              </h3>
            </div>
          </div>
        )}
      </div>
    </RenderData>
  );
}

export default TicketingView;
