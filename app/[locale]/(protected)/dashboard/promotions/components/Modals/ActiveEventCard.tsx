import Image from "next/image";
import Link from "next/link";
import React from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import type { TActiveEvent } from "@/store/api/challenges/challenges.types";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { LocationIcon as LocationIcon } from "@/components/icons";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface ActiveEventCardProps {
  eventData: TActiveEvent;
}

function ActiveEventCard({ eventData }: ActiveEventCardProps) {
  const { name, venue, startTime, media, slug, endTime } = eventData;

  return (
    <Link
      href={`/en/events/upcoming-events/${slug}/view-event?tab="promotions"`}
    >
      <Card className="flex flex-col items-start gap-5 border-none p-3.5 hover:bg-default-50 md:flex-row md:items-center">
        <div className="relative h-[80px] w-full overflow-hidden">
          <Image
            src={media?.[0]?.url || "/assets/placeholders/placeholder-100.png"}
            alt={name || "image of event"}
            width={126}
            height={80}
            className="h-full w-full rounded-[11px] !object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex-1 space-y-1.5 md:min-w-[385px]">
          <CardTitle className="line-clamp-1 cursor-pointer text-[16px] font-medium">
            {name}
          </CardTitle>

          <CardContent className="space-y-1.5 p-0">
            <div className="flex items-center gap-2 text-sm font-normal text-default-700">
              <LocationIcon className="size-[18px] shrink-0" />
              <span className="truncate">{venue?.name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-normal text-default-700">
              <CalenderIcon className="size-[18px] shrink-0" />
              <span>
                Start Date:{" "}
                {convertUTCToLocal({
                  utcDateTime: startTime,
                  format: "DD MMMM YYYY,  hh:mm A",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm font-normal text-default-700">
              <CalenderIcon className="size-[18px] shrink-0" />
              <span>
                End Date:{" "}
                {convertUTCToLocal({
                  utcDateTime: endTime,
                  format: "DD MMMM YYYY,  hh:mm A",
                })}
              </span>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default ActiveEventCard;
