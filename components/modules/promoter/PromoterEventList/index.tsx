import { useMemo } from "react";

import type { TNullish, TPagination } from "@/store/api/common-api-types";
import type { TEventType } from "@/store/api/events/events.types";
import type { TPromoterEvent } from "@/store/api/promoter/promoter.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import PostCardSkeleton from "@/components/skeleton/post-card-skeleton";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";

import EventCard from "./EventCard";

interface IPromoterEventListProps {
  getAllEventData: TPromoterEvent[] | TNullish;
  getAllEventPagination: TPagination | TNullish;
  getAllEventApiState: IApiStateInfo;
  eventType: TEventType;
  eventListType?: "upcoming" | "past";
}

function PromoterEventList({
  getAllEventData,
  getAllEventPagination,
  getAllEventApiState,
  eventType,
  eventListType,
}: IPromoterEventListProps) {
  const title = useMemo(
    () => (eventType === "upcoming" ? "Upcoming Events" : "Past Events"),
    [eventType],
  );

  const isLoading = useMemo(
    () => getAllEventApiState.isLoading || getAllEventApiState.isFetching,
    [getAllEventApiState.isLoading, getAllEventApiState.isFetching],
  );

  const totalPages = useMemo(
    () => getAllEventPagination?.totalPages || 1,
    [getAllEventPagination?.totalPages],
  );

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-[#F5F5F6]">{title}</h1>
      <RenderData
        {...getAllEventApiState}
        expectedDataType="array"
        data={getAllEventData}
        loadingSkeleton={
          <SkeletonWrapper size={12}>
            <PostCardSkeleton />
          </SkeletonWrapper>
        }
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {getAllEventData?.map((event) => (
            <EventCard
              {...event}
              key={event?.id}
              eventCardType={eventType ?? "upcoming"}
              eventListType={eventListType}
            />
          ))}
        </div>
      </RenderData>
      <div className="mb-14 mt-4">
        <BasicPagination
          isLoading={isLoading}
          totalPages={totalPages}
          hideForTotalPagesOne
        />
      </div>
    </div>
  );
}

export default PromoterEventList;
