"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, memo, useCallback, useState } from "react";

import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { cn, copyText } from "@/lib/utils";
import type { TEvent, TEventType } from "@/store/api/events/events.types";
import FennecLiveButton from "@/components/Buttons/FennecLiveButton";
import { ArrowLeftIcon as ArrowLeftIcon } from "@/components/icons";
import { CalendarIcon as CalenderIcon } from "@/components/icons";
import { CheckIcon as CheckIcon } from "@/components/icons";
import CopyIcon from "@/components/icons/CopyIcon";
import { DeleteIcon as DeleteIcon } from "@/components/icons";
import DollarRoundedIcon from "@/components/icons/DollarRoundedIcon";
import { EditIcon as EditPenIcon } from "@/components/icons";
import { LocationIcon as LocationIcon } from "@/components/icons";
import RefreshIcon from "@/components/icons/RefreshIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import EventCancelDialog from "@/components/modules/event/modals/EventCancelDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import { activeTicketTiersPrice, generateEventUrl, statusColor } from "./utils";

export type TEventCardProps = TEvent & {
  onDeleteClick?: (event: TEvent) => void;
  onPublishNowClick?: (event: TEvent) => void;
  eventCardType?: TEventType;
};

function EventCard({
  onDeleteClick,
  onPublishNowClick,
  eventCardType,
  ...event
}: TEventCardProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const { details, venue, ticketTiers } = event;

  const isEventCompany = useIsEventCompany();
  const isScheduled = details?.status === "Scheduled";

  const activeTicketTierPrice = activeTicketTiersPrice(ticketTiers);

  const handleClick = useCallback(
    ({
      data,
      onDeleteClick,
      onPublishNowClick,
      type,
    }: { data: TEvent; type: "publish" | "delete" } & Pick<
      TEventCardProps,
      "onDeleteClick" | "onPublishNowClick"
    >) =>
      () => {
        switch (type) {
          case "publish":
            return onPublishNowClick?.(data);
          case "delete":
            return onDeleteClick?.(data);
          default:
        }
      },
    [],
  );
  const editEventSlug = isEventCompany
    ? `/en/event-company/events/host-event?eventSlug="${details?.slug}"&currentStep=0`
    : `/en/events/host-event?eventSlug="${details?.slug}"&currentStep=0`;

  const eventSlug = generateEventUrl({
    event,
    eventCardType,
    isEventCompany,
  });

  const handleCopy = useCallback(
    (text: string) => async () => {
      if (!text) {
        return;
      }
      const wasCopied = await copyText(text);
      if (wasCopied?.success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast({
          title: "Copied to clipboard",
          description: "The web link has been copied to your clipboard.",
          variant: "success",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "The web link has not been copied to your clipboard.",
        });
      }
    },
    [toast],
  );

  const shouldShowCopyWeblink =
    details?.status === "Published" || details?.status === "Completed";

  const shouldShowPrice =
    details?.status !== "Draft" &&
    details?.status !== "Cancelled" &&
    details?.status !== "Scheduled";

  const isFreeEvent = details?.isFreeGuestList;

  const showEditButton =
    eventCardType === "upcoming" && details?.status !== "Published";
  const showPublishButton =
    eventCardType === "upcoming" && details?.status === "Scheduled";
  const hasMultipleActions = showEditButton || showPublishButton;

  const soldCount: number =
    "ticketsSoldCount" in details
      ? Number((details as { ticketsSoldCount: number }).ticketsSoldCount)
      : 0;

  return (
    <Fragment>
      <Card className="group relative overflow-hidden rounded-xl transition-all duration-200 hover:shadow-hover">
        {details?.isFennecLive && (
          <Button
            asChild
            className="absolute -left-1 -top-0.5 z-30 cursor-pointer rounded-none rounded-br-xl border-none bg-gradient-to-r from-[#FF2B67] to-[#FF36AB]"
          >
            <span className="flex items-center gap-2">
              <span className="relative block h-2 w-2 rounded-full bg-[#FFF6F5] before:absolute before:start-0 before:top-0 before:h-full before:w-full before:animate-ping before:rounded-full before:border before:bg-[#FFF6F5]"></span>
              <span className="text-sm font-medium text-white">LIVE NOW</span>
            </span>
          </Button>
        )}
        <div className="absolute left-3 top-4 z-30">
          <div className="inline-flex flex-col gap-1">
            {isScheduled && (
              <Badge
                color="secondary"
                className={cn(
                  `border py-[3px] text-sm font-normal`,
                  details?.status && statusColor?.[details?.status]
                    ? statusColor?.[details?.status]
                    : statusColor["fallback"],
                )}
              >
                Scheduled For:{" "}
                {convertUTCToLocal({
                  utcDateTime: details?.publishDate,
                  format: "MMM DD, YYYY, hh:mm A",
                })}
              </Badge>
            )}
            {/* sold status  */}
            {((details?.status === "Published" && !details?.isFennecLive) ||
              eventCardType === "past") && (
              <Badge
                color="secondary"
                className="flex items-center gap-2 border border-[#821890] bg-[#821890] px-2.5 py-[3px] text-sm font-normal text-default-1000"
              >
                <TicketIcon stroke="#fff" className="h-4 w-4 shrink-0" />
                Sold: {soldCount}
              </Badge>
            )}
          </div>
        </div>
        {shouldShowCopyWeblink && (
          <Badge
            color="secondary"
            className="absolute right-3 top-4 z-10 flex h-10 cursor-pointer items-center gap-2 border border-[#161B26] bg-[#161B26] px-2.5 text-sm font-medium text-[#CECFD2] opacity-0 transition-all duration-300 group-hover:opacity-100"
            onClick={handleCopy(details?.displayShortURL ?? "")}
          >
            {isCopied ? (
              <CheckIcon className="h-4 w-4 shrink-0" />
            ) : (
              <CopyIcon className="h-4 w-4 shrink-0" />
            )}
            {isCopied ? "Link Copied" : "Copy WebLink"}
          </Badge>
        )}

        <Link
          href={`${eventSlug}`}
          className="relative block !aspect-[1.3834] h-fit w-full overflow-hidden"
        >
          <Image
            src={getImageFallback({
              src: details?.media?.find((med) => med?.isFeatured)?.url,
            })}
            alt={details?.name || "image of event"}
            width={415}
            height={300}
            className="rounded-t-xl# !aspect-[1.3834] h-full w-full !object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <CardTitle className="line-clamp-1 cursor-pointer px-3 pb-1 pt-3 text-xl font-semibold hover:text-primary">
          <Link href={`${eventSlug}`}>{details?.name}</Link>
        </CardTitle>

        <CardContent className="flex flex-wrap justify-between gap-y-4 p-3">
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-medium text-default-1000",
              shouldShowPrice ? "w-8/12" : "w-full",
            )}
          >
            <LocationIcon className="h-6 w-6 shrink-0" />
            <div className="truncate">{venue?.address}</div>
          </div>

          {shouldShowPrice && (
            <div className="flex w-4/12 items-center justify-end gap-2 text-sm font-medium text-default-1000">
              {isFreeEvent ? (
                <span className="text-success">Free</span>
              ) : (
                <>
                  <DollarRoundedIcon className="h-6 w-6 shrink-0" />$
                  {activeTicketTierPrice || 0}
                </>
              )}
            </div>
          )}

          {(details?.startTime || details?.endTime) && (
            <>
              {details?.startTime && (
                <div className="flex w-full items-center gap-2 text-sm font-medium text-default-1000">
                  <CalenderIcon className="h-6 w-6 shrink-0" />
                  <span>Start Date:</span>
                  {convertUTCToLocal({
                    utcDateTime: details?.startTime,
                    format: "MMM DD, YYYY, hh:mm A",
                  })}
                </div>
              )}
              {details?.endTime && (
                <div className="flex w-full items-center gap-2 text-sm font-medium text-default-1000">
                  <CalenderIcon className="h-6 w-6 shrink-0" />
                  <span>End Date:</span>
                  {convertUTCToLocal({
                    utcDateTime: details?.endTime,
                    format: "MMM DD, YYYY, hh:mm A",
                  })}
                </div>
              )}
            </>
          )}

          <div className="flex w-full items-center gap-2 text-sm font-medium text-default-1000">
            <RefreshIcon className="h-6 w-6 shrink-0" />
            <span>Recurring:</span>
            {details?.isRecurring ? (
              <span> {details?.recurringFor?.split("_")?.join(" ")}</span>
            ) : (
              <span>Never</span>
            )}
          </div>
        </CardContent>

        <CardFooter
          className={cn("flex w-full flex-wrap justify-start gap-2 p-3 !pt-3")}
        >
          {details?.status === "Published" && !details?.isFennecLive && (
            <EventCancelDialog
              eventData={event}
              className="flex w-full items-center gap-2 bg-default-50 py-[17px] text-destructive hover:bg-default-100 hover:text-destructive md:py-[23px]"
            />
          )}

          <FennecLiveButton
            isShow={details?.isFennecLive && details?.status === "Published"}
          />

          {details.status !== "Published" &&
            details.status !== "Ended" &&
            (() => {
              let removeBtnLabel: string | undefined;
              const isScheduled = details.status === "Scheduled";
              if (isScheduled) {
                removeBtnLabel = ""; // icon only
              } else {
                removeBtnLabel = "Remove";
              }
              const isCancel = removeBtnLabel === "Cancel Event";
              const iconOnly = isScheduled;
              return (
                <Button
                  type="button"
                  onClick={handleClick({
                    data: event,
                    type: "delete",
                    onPublishNowClick,
                    onDeleteClick,
                  })}
                  className={cn(
                    `flex items-center gap-2 bg-default-50 py-[17px] hover:bg-default-100 md:py-[23px]`,
                    // width
                    details?.status === "Archived"
                      ? "w-fit"
                      : hasMultipleActions
                        ? iconOnly
                          ? "h-11 w-11 justify-center p-0"
                          : "w-1/2"
                        : "w-full",
                    eventCardType === "past" && "!w-full",
                    isCancel && "text-destructive hover:text-destructive",
                  )}
                >
                  {!isCancel && <DeleteIcon className="h-5 w-5 shrink-0" />}
                  {removeBtnLabel && <span>{removeBtnLabel}</span>}
                </Button>
              );
            })()}

          {eventCardType === "upcoming" && (
            <>
              {showPublishButton && (
                <Button
                  className="flex w-fit flex-grow items-center gap-2 bg-default-50 py-[17px] hover:bg-default-100 md:py-[23px]"
                  type="button"
                  onClick={handleClick({
                    data: event,
                    type: "publish",
                    onPublishNowClick,
                    onDeleteClick,
                  })}
                >
                  Publish Now
                </Button>
              )}

              {showEditButton && (
                <Button
                  className="flex w-fit flex-grow items-center gap-2 bg-default-50 py-[17px] hover:bg-default-100 md:py-[23px]"
                  asChild
                >
                  <Link href={editEventSlug}>
                    <EditPenIcon className="h-5 w-5 shrink-0" />
                    Edit
                  </Link>
                </Button>
              )}
            </>
          )}
          {details.status === "Ended" && (
            <Button
              className="flex w-fit flex-grow items-center gap-2 bg-default-50 py-[17px] hover:bg-default-100 md:py-[23px]"
              asChild
            >
              <Link href={"#"}>
                Detail
                <ArrowLeftIcon className="ms-1 size-5 shrink-0 rotate-180" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </Fragment>
  );
}

export default memo(EventCard);
