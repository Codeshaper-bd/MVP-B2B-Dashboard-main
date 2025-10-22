"use client";

import { Fragment } from "react";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAPromotionActiveEventsQuery } from "@/store/api/promotion/promotion-api";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import CalendarIcon from "@/components/icons/CalendarIcon";
import RenderData from "@/components/render-data";
import BgRings from "@/components/ui/BgRings";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import ActiveEventCard from "./ActiveEventCard";

interface IViewActiveEventModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  productData: TCallbackData | undefined;
}

function ViewActiveEventModal({
  open,
  onOpenChange,
  productData,
}: IViewActiveEventModalProps) {
  const {
    data: getAChallengeActiveEvents,
    ...getAChallengeActiveEventsApiState
  } = useGetAPromotionActiveEventsQuery(
    {
      slug: productData?.slug ?? "",
    },
    {
      skip: !checkIsValidId(productData?.slug, {
        type: "string",
      }),
    },
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-[600px]">
        <div className="px-5 pt-5">
          <DialogTitle>Active Events</DialogTitle>
          <p className="text-sm">
            Total {getAChallengeActiveEvents?.data?.length} Events
          </p>
        </div>
        <Separator className="mb-5 mt-6" />
        <RenderData
          expectedDataType="object"
          data={getAChallengeActiveEvents}
          {...getAChallengeActiveEventsApiState}
        >
          <ScrollArea className="h-[calc(100vh-24rem)] px-5 pb-5">
            {getAChallengeActiveEvents?.data?.length ? (
              <Fragment>
                {getAChallengeActiveEvents?.data?.map((item) => (
                  <ActiveEventCard key={item.id} eventData={item} />
                ))}
              </Fragment>
            ) : (
              <div className="mt-[30%] flex flex-col items-center gap-1">
                <BgRings className="flex size-12 items-center justify-center rounded-[10px] border border-default-100 bg-transparent text-white">
                  <BgRings.Rings />

                  <BgRings.Content>
                    <CalendarIcon className="size-5" />
                  </BgRings.Content>
                </BgRings>

                <h3 className="z-20 text-default-900">
                  No Active Events Available
                </h3>
                <p className="z-20 text-sm">
                  You currently have no active events scheduled.
                </p>
              </div>
            )}
          </ScrollArea>
        </RenderData>
      </DialogContent>
    </Dialog>
  );
}

export default ViewActiveEventModal;
