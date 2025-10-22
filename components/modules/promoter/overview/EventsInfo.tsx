"use client";
import Image from "next/image";
import { useMemo } from "react";
import AsyncSelect from "react-select/async";

import useFetchPromoterTicketSoldData from "@/hooks/data-fetch/useFetchPromoterTicketSoldData";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetPromotersTrackingLinkQuery } from "@/store/api/promoters/promoters-api";
import type { TPromotersTrackingLinkData } from "@/store/api/promoters/promoters.types";
import { CopyInput } from "@/components/copy-input";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import UserIcon from "@/components/icons/UserIcon";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export interface IEventsInfoProps {
  ticketTierId?: string;
  promoterId?: string;
  getAnEventData?: TEvent | TNullish;
}
function EventsInfo({
  ticketTierId,
  promoterId,
  getAnEventData,
}: IEventsInfoProps) {
  const { updateAParam } = useManageSearchParams<{
    ticketTierId?: string;
    promoterId?: string;
  }>();
  const { promoterTicketSoldData } = useFetchPromoterTicketSoldData(
    getAnEventData?.details.id,
    ticketTierId,
  );
  const { data: getLinkTrackingRes } = useGetPromotersTrackingLinkQuery(
    {
      eventId: getAnEventData?.details.id,
      promoterId,
    },
    {
      skip: !getAnEventData?.details.id,
    },
  );

  const getLinkTrackingData: TPromotersTrackingLinkData | TNullish =
    getLinkTrackingRes?.data;

  const options = useMemo(
    () =>
      getAnEventData?.ticketTiers?.map((tier) => ({
        value: String(tier.id),
        label: tier.name,
      })) ?? [],
    [getAnEventData],
  );

  const setTicketTier = (
    selectedOption: { value: string; label: string } | null,
  ) => {
    updateAParam({
      key: "ticketTierId",
      value: selectedOption?.value,
    });
  };

  const promoterTrackingLink = useMemo(
    () =>
      getAnEventData?.linkTracking.find(
        (link) => link?.promoter?.id === promoterId,
      ),
    [getAnEventData?.linkTracking, promoterId],
  );

  const eventDate = useMemo(
    () =>
      convertUTCToLocal({
        utcDateTime: getAnEventData?.details?.startTime,
        format: "MMMM DD, YYYY",
      }),
    [getAnEventData?.details?.startTime],
  );

  const selectedTicketTier = useMemo(
    () => options.find((opt) => opt.value === ticketTierId) || null,
    [options, ticketTierId],
  );
  return (
    <div className="flex flex-col gap-9 md:flex-row">
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
          value={promoterTrackingLink?.displayShortURL}
          readOnly
          className="border !bg-default-50 py-2.5 ps-4"
          rightContentClass="bg-default-50"
        />
        <div className="w-full space-y-4">
          <div className="flex justify-between gap-1 font-medium text-default-700">
            <p className="flex-shrink-0">Ticket Tier :</p>
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
          <div className="flex justify-between gap-1 font-medium text-default-700">
            <p className="flex-shrink-0">Revenue :</p>
            <p>${promoterTicketSoldData?.totalSoldAmount}</p>
          </div>
          <div className="flex justify-between gap-1 font-medium text-default-700">
            <p className="flex-shrink-0">Promoter :</p>
            <div className="flex items-center gap-2">
              <UserIcon className="size-5" />{" "}
              <p>{promoterTicketSoldData?.promoterName}</p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="h-[300px] min-w-[340px] overflow-hidden rounded-t-xl">
          <Image
            src={getImageFallback({
              src: getAnEventData?.details?.media?.[0]?.url || "",
              fallbackImageSize: 300,
            })}
            alt="event image"
            quality={100}
            width={340}
            height={350}
            className="h-full w-full object-fill"
          />
        </div>
        <CardContent className="space-y-3 px-4 py-5">
          <CardTitle className="font-semibold">
            {" "}
            {getAnEventData?.details?.name}
          </CardTitle>
          <div className="flex gap-2">
            <CalendarIcon className="size-5" />
            <span className="text-sm font-medium text-default-700">
              {eventDate}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EventsInfo;
