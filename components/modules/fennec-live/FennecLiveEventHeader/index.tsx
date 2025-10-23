"use client";
import Image from "next/image";
import { useState } from "react";

import useIsPastEvent from "@/hooks/feature/useIsPastEvent";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import type { TCreateEventData } from "@/store/api/events/events.types";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { CrossIcon as CrossIcon } from "@/components/icons";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import EventHeaderSkeleton from "./EventHeaderSkeleton";
import ExtendTimeDialog from "./ExtendTime/ExtendTimeDialog";
import FennecLiveEndDialog from "./FennecLiveEndDialog";
import TimeCheckedDialog from "./time-checker-dialog";

interface IFennecLiveEventHeaderProps {
  getAnEventDetails: TCreateEventData | TNullish;
  apiState: IApiStateInfo;
}
function FennecLiveEventHeader({
  getAnEventDetails,
  apiState,
}: IFennecLiveEventHeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isPastEvent = useIsPastEvent();
  return (
    <RenderData
      data={getAnEventDetails}
      expectedDataType="object"
      {...apiState}
      loadingSkeleton={<EventHeaderSkeleton />}
    >
      <div className="mt-6 grid grid-cols-12 items-center gap-6 xl:gap-10">
        <div className="col-span-12 lg:col-span-4">
          <Image
            src={getImageFallback({
              src: getAnEventDetails?.media?.[0]?.url,
              fallbackImageSize: 500,
            })}
            width={500}
            height={400}
            alt={getAnEventDetails?.name || "fennec live"}
            className="w-full rounded-t-xl"
          />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="space-y-4">
            <h1 className="mb-2 text-xl font-bold md:text-3xl">
              {getAnEventDetails?.name || ""}
            </h1>
            <div className="flex w-full items-center gap-2 text-sm font-medium text-default-1000">
              <CalenderIcon className="h-6 w-6 shrink-0" />
              <span>Start Date:</span>
              {convertUTCToLocal({
                utcDateTime: getAnEventDetails?.startTime,
                format: "MMM DD, YYYY, hh:mm A",
              })}
            </div>
            <div className="flex w-full items-center gap-2 text-sm font-medium text-default-1000">
              <CalenderIcon className="h-6 w-6 shrink-0" />
              <span>End Date:</span>
              {convertUTCToLocal({
                utcDateTime: getAnEventDetails?.endTime,
                format: "MMM DD, YYYY, hh:mm A",
              })}
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {isPastEvent ? (
              <Badge>
                <span className="me-1.5 inline-block size-1.5 rounded-full bg-default-300"></span>
                Past Event
              </Badge>
            ) : (
              <>
                <ExtendTimeDialog eventSummery={getAnEventDetails} />

                <div>
                  <Button
                    type="button"
                    color="primary"
                    className="bg-[#F04438] text-default-1000 hover:bg-[#F04438]/60"
                    onClick={() => setOpen(true)}
                  >
                    <CrossIcon className="me-1 size-5" /> Closing Duties
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => setOpen(true)}
                  >
                    End Fennec Live
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <TimeCheckedDialog open={open} setOpen={setOpen} />
      <FennecLiveEndDialog
        open={open}
        setOpen={setOpen}
        slug={getAnEventDetails?.slug}
      />
    </RenderData>
  );
}

export default FennecLiveEventHeader;
