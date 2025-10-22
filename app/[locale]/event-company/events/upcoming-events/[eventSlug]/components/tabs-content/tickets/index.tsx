import { memo, lazy, Suspense } from "react";

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import CardSkeleton from "@/components/skeleton/card-skeleton";

import PaidGuestContent from "./PaidGuestContent";
const LazyPromoterContent = lazy(
  () => import("@/components/modules/event/event-promoter/promoter-content"),
);

const LazyAddonsSection = lazy(() => import("./AddonsSection"));
const LazyAddonsRevenue = lazy(
  () => import("@/components/modules/addon/AddonsRevenue"),
);

const FreeGuestListSection = lazy(
  () => import("@/components/modules/event/guest-list/FreeGuestList"),
);

function Tickets() {
  const { getAnEventData } = useFetchAnEventData();

  const isFreeGuestList = getAnEventData?.details?.isFreeGuestList;

  return (
    <div className="mt-6 space-y-6">
      {isFreeGuestList && (
        <FreeGuestListSection getAnEventData={getAnEventData} />
      )}

      {!isFreeGuestList && <PaidGuestContent />}

      <Suspense fallback={<CardSkeleton />}>
        <LazyAddonsRevenue getAnEventData={getAnEventData} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <LazyPromoterContent getAnEventData={getAnEventData} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <LazyAddonsSection />
      </Suspense>
    </div>
  );
}

export default memo(Tickets);
