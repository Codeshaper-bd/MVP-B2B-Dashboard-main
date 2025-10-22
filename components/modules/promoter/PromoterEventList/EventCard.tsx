"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, memo, useMemo } from "react";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TEventType } from "@/store/api/events/events.types";
import type { TPromoterEvent } from "@/store/api/promoter/promoter.types";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import CalenderIcon from "@/components/icons/CalenderIcon";
import DollarRoundedIcon from "@/components/icons/DollarRoundedIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export type TEventCardProps = TPromoterEvent & {
  eventCardType?: TEventType;
  eventListType?: "upcoming" | "past";
};

function EventCard({
  eventCardType,
  eventListType,
  ...event
}: TEventCardProps) {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const {
    media,
    name,
    isFreeGuestList,
    venue,
    slug,
    id,
    startTime,
    endTime,
    ticketPrice,
  } = event;

  // Memoize expensive computations
  const mediaUrl = useMemo(
    () => media?.find((med) => med?.isFeatured)?.url,
    [media],
  );

  const imageSrc = useMemo(
    () => getImageFallback({ src: mediaUrl }),
    [mediaUrl],
  );

  const eventDetailsUrl = useMemo(() => {
    if (eventListType === "upcoming") {
      return `/en/promoter/upcoming-event/${slug}?eventId=${id}`;
    } else if (eventListType === "past") {
      return `/en/promoter/past-event/${slug}?eventId=${id}`;
    } else {
      return `./${organizationSlug}/${slug}?eventId=${id}`;
    }
  }, [eventListType, slug, id, organizationSlug]);

  // Memoize date conversions
  const startDate = useMemo(
    () =>
      convertUTCToLocal({
        utcDateTime: startTime,
        format: "MMM DD, YYYY, hh:mm A",
      }),
    [startTime],
  );

  const endDate = useMemo(
    () =>
      convertUTCToLocal({
        utcDateTime: endTime,
        format: "MMM DD, YYYY, hh:mm A",
      }),
    [endTime],
  );

  return (
    <Fragment>
      <Card className="group relative overflow-hidden rounded-xl transition-all duration-200 hover:shadow-hover">
        <Link
          href={"#"}
          className="relative block !aspect-[1.3834] h-fit w-full overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt={name || "image of event"}
            width={415}
            height={300}
            className="rounded-t-xl# !aspect-[1.3834] h-full w-full !object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <CardTitle className="line-clamp-1 cursor-pointer px-3 pb-1 pt-3 text-xl font-semibold hover:text-primary">
          <Link href={eventDetailsUrl}>{name}</Link>
        </CardTitle>

        <CardContent className="space-y-4 p-3 text-sm font-medium text-default-1000">
          <div className="flex gap-2">
            <div className="flex flex-1 items-center gap-2">
              <LocationIcon className="h-6 w-6 shrink-0" />
              <div className="max-w-[220px] truncate lg:max-w-[240px]">
                {venue?.address}
              </div>
            </div>

            <div className="flex-none">
              {isFreeGuestList ? (
                <span className="text-success">Free</span>
              ) : (
                <div className="flex items-center gap-2">
                  <DollarRoundedIcon className="h-6 w-6 shrink-0" />
                  {ticketPrice ?? 0}
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full items-center gap-2">
            <CalenderIcon className="h-6 w-6 shrink-0" />
            <span>Start Date:</span>
            {startDate}
          </div>

          <div className="flex w-full items-center gap-2">
            <CalenderIcon className="h-6 w-6 shrink-0" />
            <span>End Date:</span>
            {endDate}
          </div>
        </CardContent>

        <CardFooter className="pt-3">
          <Button
            className="flex w-fit flex-grow items-center gap-2 bg-default-50 hover:bg-default-100"
            asChild
            size="xl"
          >
            <Link href={eventDetailsUrl}>
              Detail
              <ArrowLeftIcon className="ms-1 size-5 shrink-0 rotate-180" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default memo(EventCard);
