import Image from "next/image";
import { memo } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import type { TMedia } from "@/store/api/media/media.types";
import type { TPromoterEvents } from "@/store/api/promoters/promoters.types";
import { Badge } from "@/components/ui/badge";

type IAssignedEventsProps = {
  pill?: string;
  eventData: TPromoterEvents | TNullish;
};

function AssignedEventCard({ eventData }: IAssignedEventsProps) {
  const data = eventData?.details;
  const eventImage: TMedia | TNullish =
    data?.media?.find((media) => media?.isFeatured) ?? data?.media?.[0];
  return (
    <div className="flex items-center justify-between gap-6 self-stretch rounded-[10px] bg-[#1F242F] p-3">
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-[44.2px] shrink-0 self-stretch">
          <Image
            src={getImageFallback({
              src: eventImage?.url,
              fallbackImageSize: 100,
            })}
            alt={eventImage?.originalName || "Event Image"}
            className="h-full w-full rounded-[3px] object-cover"
            width={45}
            height={32}
          />
        </div>

        <div className="space-y-0.5">
          <h5 className="line-clamp-2 overflow-hidden text-ellipsis text-sm font-medium leading-5 text-[#F5F5F6]">
            {data?.name}
          </h5>

          <p className="text-ellipsis text-xs font-normal leading-[18px] text-default-700">
            {convertUTCToLocal({
              utcDateTime: data?.startTime,
              format: "YYYY-MM-DD",
            })}
          </p>
        </div>
      </div>

      <div>
        <Badge
          className={cn("!border-[#9E165F] !bg-[#4E0D30] !text-[#FAA7E0]", {
            "!border-[#455A64] !bg-[#053321] !text-[#FAA7E0]":
              !data?.isRecurring,
          })}
        >
          {data?.isRecurring ? "Recurring" : "One Time"}
        </Badge>
      </div>
    </div>
  );
}

export default memo(AssignedEventCard);
