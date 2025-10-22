"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { memo, useMemo } from "react";
import AsyncSelect from "react-select/async";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import {
  useGetAPromoterEventDetailsQuery,
  useGetPromotersTicketSoldQuery,
  useGetPromoterTicketTiersQuery,
} from "@/store/api/promoter/promoter-api";
import type { TEvent } from "@/store/api/promoter/promoter.types";
import { useGetPromotersTrackingLinkQuery } from "@/store/api/promoters/promoters-api";
import { CopyInput } from "@/components/copy-input";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import UserIcon from "@/components/icons/UserIcon";
import RenderData from "@/components/render-data";
import EventDetailsHeaderSkeleton from "@/components/skeleton/event-details-header";
import EventInfoSkeleton from "@/components/skeleton/event-info-skeleton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type TPageParams = {
  locale: string;
  eventSlug: string;
  organizationId: string;
};

function EventsInfo() {
  const params = useParams<TPageParams>();
  const { eventSlug } = params;
  const { getAParamValue, updateAParam } = useManageSearchParams<{
    ticketTierId?: string;
    eventId: string;
  }>();

  const ticketTierId = useMemo(
    () => getAParamValue("ticketTierId"),
    [getAParamValue],
  );
  const eventId = useMemo(() => getAParamValue("eventId"), [getAParamValue]);

  const isProbableValidSlugFound = useMemo(
    () => checkIsValidId(eventSlug, { type: "string" }),
    [eventSlug],
  );

  // Promoter Event Details API
  const {
    data: getAPromoterEventDetailsRes,
    ...getAPromoterEventDetailsApiState
  } = useGetAPromoterEventDetailsQuery(
    {
      slug: eventSlug,
    },
    {
      skip: !isProbableValidSlugFound,
    },
  );

  const getAPromoterEventDetailsData = useMemo(
    () => getAPromoterEventDetailsRes?.data as TEvent | TNullish,
    [getAPromoterEventDetailsRes?.data],
  );

  // Ticket Sold API
  const { data: getTicketSoldRes, ...getTicketSoldApiState } =
    useGetPromotersTicketSoldQuery({
      eventId,
      ticketTierId,
    });
  const getTicketSoldData = useMemo(
    () => getTicketSoldRes?.data,
    [getTicketSoldRes?.data],
  );

  // Ticket Tiers API
  const { data: getTicketTiersRes, ...getTicketTiersApiState } =
    useGetPromoterTicketTiersQuery(
      {
        slug: eventSlug,
      },
      {
        skip: !isProbableValidSlugFound,
      },
    );
  const getTicketTiersData = useMemo(
    () => getTicketTiersRes?.data ?? [],
    [getTicketTiersRes?.data],
  );

  // Link Tracking API
  const { data: getLinkTrackingRes, ...getLinkTrackingResApiState } =
    useGetPromotersTrackingLinkQuery({
      eventId,
    });

  const getLinkTrackingData = useMemo(
    () => getLinkTrackingRes?.data,
    [getLinkTrackingRes?.data],
  );

  const options = useMemo(
    () =>
      getTicketTiersData?.map((tier) => ({
        value: String(tier.id),
        label: tier.name,
      })) ?? [],
    [getTicketTiersData],
  );

  const setTicketTier = useMemo(
    () => (selectedOption: { value: string; label: string } | null) => {
      updateAParam({
        key: "ticketTierId",
        value: selectedOption?.value,
      });
    },
    [updateAParam],
  );

  // Memoize expensive computations
  const imageSrc = useMemo(
    () =>
      getImageFallback({
        src: getAPromoterEventDetailsData?.details?.media?.[0]?.url || "",
        fallbackImageSize: 300,
      }),
    [getAPromoterEventDetailsData?.details?.media],
  );

  const eventDate = useMemo(
    () =>
      convertUTCToLocal({
        utcDateTime: getAPromoterEventDetailsData?.details?.startTime,
        format: "MMMM DD, YYYY",
      }),
    [getAPromoterEventDetailsData?.details?.startTime],
  );

  const selectedTicketTier = useMemo(
    () => options.find((opt) => opt.value === ticketTierId) || null,
    [options, ticketTierId],
  );

  return (
    <div className="flex flex-col gap-9 md:flex-row">
      <RenderData
        expectedDataType="object"
        loadingSkeleton={<EventDetailsHeaderSkeleton />}
        {...getLinkTrackingResApiState}
        data={getLinkTrackingData}
      >
        <div className="flex-1 space-y-6">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
            <LinkIcon className="size-5 text-default" />
          </div>
          <h3 className="text-lg font-semibold text-default-1000">
            Tracking Link
          </h3>
          <CopyInput
            qrCode={getLinkTrackingData?.qrCode || ""}
            id="customerId"
            leftContent={<LinkIcon className="size-5" />}
            type="text"
            value={getLinkTrackingData?.url ?? ""}
            readOnly
            className="border !bg-default-50 py-2.5 ps-4"
            rightContentClass="bg-default-50"
          />

          <div className="w-full space-y-4">
            <div className="flex justify-between font-medium text-default-700">
              <p>Ticket Tier :</p>
              <div>
                <AsyncSelect
                  cacheOptions
                  isClearable
                  defaultOptions={options}
                  placeholder="Regular"
                  className="react-select"
                  classNamePrefix="select"
                  formatOptionLabel={(option) => (
                    <div className="flex items-center space-x-3">
                      {option.label}
                    </div>
                  )}
                  value={selectedTicketTier}
                  onChange={setTicketTier}
                />
              </div>
            </div>
            <div className="flex justify-between font-medium text-default-700">
              <p>Revenue :</p>
              <p>${getTicketSoldData?.totalSoldAmount}</p>
            </div>
            <div className="flex justify-between font-medium text-default-700">
              <p>Promoter :</p>
              <div className="flex items-center gap-2">
                <UserIcon className="size-5" />{" "}
                <p>{getTicketSoldData?.promoterName}</p>
              </div>
            </div>
          </div>
        </div>
      </RenderData>
      <RenderData
        expectedDataType="object"
        data={getAPromoterEventDetailsData}
        {...getAPromoterEventDetailsApiState}
        loadingSkeleton={
          <div className="min-w-[340px]">
            <EventInfoSkeleton />
          </div>
        }
      >
        <Card>
          <div className="h-[300px] min-w-[340px] overflow-hidden rounded-t-xl">
            <Image
              src={imageSrc}
              alt="event image"
              quality={100}
              width={340}
              height={350}
              className="h-full w-full object-fill"
            />
          </div>
          <CardContent className="space-y-3 px-4 py-5">
            <CardTitle className="font-semibold">
              {getAPromoterEventDetailsData?.details?.name}
            </CardTitle>
            <div className="flex gap-2">
              <CalendarIcon className="size-5" />
              <span className="text-sm font-medium text-default-700">
                {eventDate}
              </span>
            </div>
          </CardContent>
        </Card>
      </RenderData>
    </div>
  );
}

export default memo(EventsInfo);
