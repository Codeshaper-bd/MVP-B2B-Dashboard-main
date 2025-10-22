"use client";

import React, { Fragment } from "react";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAChallengeActiveEventsQuery } from "@/store/api/challenges/challenges-api";
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
    refetch,
    ...getAChallengeActiveEventsApiState
  } = useGetAChallengeActiveEventsQuery(
    {
      slug: productData?.slug ?? "",
    },
    {
      skip: !checkIsValidId(productData?.slug, {
        type: "string",
      }),
      refetchOnMountOrArgChange: true,
    },
  );

  // Refetch data when modal opens
  React.useEffect(() => {
    if (open && productData?.slug) {
      refetch();
    }
  }, [open, productData?.slug, refetch]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent key={productData?.slug} className="md:min-w-[600px]">
        <div className="px-5 pt-5">
          <DialogTitle>Active Events</DialogTitle>
          <p className="text-sm">
            Total {getAChallengeActiveEvents?.data?.length} Events
          </p>
        </div>
        <Separator className="mb-5 mt-6" />
        <ScrollArea className="h-[calc(100vh-24rem)] px-5 pb-5">
          <RenderData
            expectedDataType="object"
            data={getAChallengeActiveEvents}
            {...getAChallengeActiveEventsApiState}
          >
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
          </RenderData>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ViewActiveEventModal;
