"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import CalendarIcon from "@/components/icons/CalendarIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";
import FileCheck from "@/components/icons/FileCheck";
import FileX from "@/components/icons/FileX";
import InfoIcon from "@/components/icons/InfoIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import LockLockedIcon from "@/components/icons/LockLockedIcon";
import RenderData from "@/components/render-data";
import EventHeaderSkeleton from "@/components/skeleton/event-header-skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import ButtonActiveCountdown from "./components/button-active-count-down";

function DetailsEvent() {
  const { getAnEventApiState, getAnEventData } = useFetchAnEventData();
  const [isCountdownPassed, setIsCountdownPassed] = useState(false);
  const featuredImage =
    getAnEventData?.details?.media?.find((item) => item.isFeatured) ||
    getAnEventData?.details?.media?.[0];

  const isEventCompany = useIsEventCompany();

  const getAnEventDetailsLink = isEventCompany
    ? `/en/event-company/events/upcoming-events/${getAnEventData?.details?.slug}/view-event`
    : `/en/events/upcoming-events/${getAnEventData?.details?.slug}/view-event`;

  const getOpeningChecklistLink = isEventCompany
    ? `#`
    : `/en/events/upcoming-events/${getAnEventData?.details?.slug}/opening-checklist`;
  const getConfigureChecklistLink = isEventCompany
    ? `#`
    : `/en/organization/checklist`;

  return (
    <RenderData
      data={getAnEventData}
      expectedDataType="object"
      {...getAnEventApiState}
      loadingSkeleton={
        <EventHeaderSkeleton className="min-h-screen items-start" />
      }
    >
      <Card className="grid min-h-screen grid-cols-12 gap-4 p-6 xl:gap-20">
        <div className="col-span-12 xl:col-span-4">
          <Image
            src={getImageFallback({
              src: featuredImage?.url,
              fallbackImageSize: 500,
            })}
            alt={getAnEventData?.details?.name || ""}
            width={420}
            height={310}
            className="h-[310px] w-full rounded-xl object-cover"
          />
        </div>
        <div className="col-span-12 space-y-10 xl:col-span-8">
          <div className="space-y-6">
            <h3 className="mb-1 mt-4 text-xl font-semibold leading-9 md:mb-2 md:text-2xl">
              {getAnEventData?.details?.name}
            </h3>

            <div className="flex w-8/12 items-center gap-6 text-base font-medium text-default-1000">
              <div className="flex items-center gap-2 text-default-700">
                <LocationIcon className="size-6 shrink-0" /> venue:
              </div>

              <div className="truncate">{getAnEventData?.venue?.address}</div>
            </div>
            <div className="flex w-8/12 items-center gap-6 text-base font-medium text-default-1000">
              <div className="flex items-center gap-2 text-default-700">
                <CalendarIcon className="size-6 shrink-0" /> Start Date:
              </div>
              <div className="truncate">
                {convertUTCToLocal({
                  utcDateTime: getAnEventData?.details?.startTime,
                  format: "DD MMMM YYYY,  hh:mm A",
                })}
              </div>
            </div>
            <div className="flex w-8/12 items-center gap-6 text-base font-medium text-default-1000">
              <div className="flex items-center gap-2 text-default-700">
                <CalendarIcon className="size-6 shrink-0" /> End Date:
              </div>
              <div className="truncate">
                {convertUTCToLocal({
                  utcDateTime: getAnEventData?.details?.endTime,
                  format: "DD MMMM YYYY,  hh:mm A",
                })}
              </div>
            </div>
            <div>
              <Link href={getAnEventDetailsLink}>
                <Button color="secondary" className="!px-4 !py-2.5">
                  <EditPenIcon className="me-1.5 size-5" />
                  Edit Event Details
                </Button>
              </Link>
            </div>
          </div>

          {getAnEventData?.details?.status === "Published" && (
            <div className="space-y-6">
              <div>
                {isCountdownPassed ? (
                  <Link
                    className="inline-flex items-center gap-2 text-wrap break-words rounded-lg bg-gradient-to-r from-[#e31b54] to-[#dd2590] px-4 py-3 text-sm font-semibold uppercase !leading-4 text-default-1000"
                    href={getOpeningChecklistLink}
                    passHref
                  >
                    <span className="relative block h-2 w-2 rounded-full bg-destructive-secondary before:absolute before:start-0 before:top-0 before:h-full before:w-full before:animate-ping before:rounded-full before:border before:bg-destructive"></span>
                    <span> Fennec Live - Launch Opening Checklist</span>
                  </Link>
                ) : (
                  <>
                    <Button
                      asChild
                      color="secondary"
                      disabled
                      className="bg-[#61646C] hover:bg-[#61646C]"
                    >
                      <span className="flex items-center uppercase">
                        <LockLockedIcon className="me-1.5 h-4 w-4 text-default-1000" />
                        Fennec Live - NOT AVAILABLE
                      </span>
                    </Button>
                    <div className="mt-3">
                      <ButtonActiveCountdown
                        eventStartTime={
                          getAnEventData?.details?.startTime ?? ""
                        }
                        onCountdownPassed={setIsCountdownPassed}
                      />
                    </div>
                  </>
                )}
              </div>

              <div>
                <Link href={getConfigureChecklistLink}>
                  <Button color="secondary" className="!px-4 !py-2.5">
                    <FileCheck className="me-1.5 size-5" />
                    Configure Checklist
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <Link href={"#"}>
                  <Button color="secondary" className="!px-4 !py-2.5">
                    <FileX className="me-1.5 size-5" />
                    Ignore Checklist & Launch
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <InfoIcon className="size-5" /> Unrecommended
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </RenderData>
  );
}

export default DetailsEvent;
