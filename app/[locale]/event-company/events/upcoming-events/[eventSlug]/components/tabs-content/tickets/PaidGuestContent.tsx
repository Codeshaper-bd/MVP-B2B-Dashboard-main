import { lazy, Suspense, useMemo } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import CreateTierDialog from "@/components/modules/ticket-tier/modals/create-tier-dialog";
import TicketsList from "@/components/modules/ticket-tier/TicketsList";
import CardSkeleton from "@/components/skeleton/card-skeleton";

const LazyTicketsDiscount = lazy(() => import("./TicketsDiscount"));
const LazyGroupDiscount = lazy(() => import("./GroupDiscount"));
const LazyRevenueChart = lazy(
  () => import("@/components/modules/event/charts/RevenueChart"),
);
const LazyTiersSection = lazy(
  () => import("@/components/modules/tiers/TiersSection"),
);
function PaidGuestContent() {
  const { getAnEventData } = useFetchAnEventData();
  const eventId = getAnEventData?.details?.id;

  const isPublished = useMemo(
    () => getAnEventData?.details?.status === "Published",
    [getAnEventData?.details?.status],
  );
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center">
          <h2 className="flex-1 text-lg font-semibold text-default-900">
            Tickets Tier
          </h2>
          <div className="flex-none">
            <CreateTierDialog eventId={eventId} />
          </div>
        </div>
        <TicketsList eventId={eventId} isShowBadge={true} />
      </div>

      <div className="space-y-4">
        <Suspense fallback={<CardSkeleton />}>
          <LazyTicketsDiscount />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <LazyGroupDiscount />
        </Suspense>
      </div>

      {isPublished && (
        <Suspense fallback={<CardSkeleton />}>
          <LazyTiersSection getAnEventData={getAnEventData} />
        </Suspense>
      )}
      <Suspense fallback={<CardSkeleton />}>
        <LazyRevenueChart event={getAnEventData} />
      </Suspense>
    </>
  );
}

export default PaidGuestContent;
