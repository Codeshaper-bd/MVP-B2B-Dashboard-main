import { lazy, Suspense } from "react";

const LazyPromoterContent = lazy(
  () => import("@/components/modules/event/event-promoter/promoter-content"),
);
const LazyAddonsSection = lazy(() => import("./AddonsSection"));
const FreeGuestListSection = lazy(
  () => import("@/components/modules/event/guest-list/FreeGuestList"),
);

import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import DiscountList from "@/components/modules/discount/DiscountList";
import DiscountSwitch from "@/components/modules/discount/DiscountSwitch";
import CreateDiscountDialog from "@/components/modules/discount/modals/create-discount-dialog";
import GroupDiscountForm from "@/components/modules/group-discount/forms";
import GroupDiscountSwitch from "@/components/modules/group-discount/GroupDiscountSwitch";
import CreateTierDialog from "@/components/modules/ticket-tier/modals/create-tier-dialog";
import TicketsList from "@/components/modules/ticket-tier/TicketsList";
import CardSkeleton from "@/components/skeleton/card-skeleton";
import { Card, CardContent } from "@/components/ui/card";

import FinanceCard from "../../tax/FinanceCard";

const LazyRevenueChart = lazy(
  () => import("@/components/modules/event/charts/RevenueChart"),
);
const LazyTiersSection = lazy(
  () => import("@/components/modules/tiers/TiersSection"),
);

function Tickets() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();

  const eventId = getAnEventData?.details?.id;
  const isPublished = getAnEventData?.details?.status === "Published";
  const isFreeGuestList = getAnEventData?.details?.isFreeGuestList;
  const isGroupDiscountEnabled =
    !!getAnEventData?.details?.isGroupDiscountEnabled;
  const isDiscountEnabled = !!getAnEventData?.details?.isDiscountEnabled;

  return (
    <div className="mt-6 space-y-6">
      <FreeGuestListSection getAnEventData={getAnEventData} />

      {!isFreeGuestList && (
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
      )}

      {!isFreeGuestList && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <h2 className="flex-1 text-lg font-semibold text-default-900">
                  Discount
                </h2>

                <div className="flex flex-none items-center gap-2">
                  {isDiscountEnabled && (
                    <CreateDiscountDialog
                      mode="server-create"
                      model="Event"
                      modelId={eventId}
                      getAnEventData={getAnEventData}
                    />
                  )}
                  <DiscountSwitch getAnEventData={getAnEventData} />
                </div>
              </div>
              {isDiscountEnabled && (
                <DiscountList
                  model="Event"
                  modelId={eventId}
                  getAnEventData={getAnEventData}
                  isShowRedeemedCount={true}
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex justify-between">
                <h3>Group Discount</h3>
                <GroupDiscountSwitch getAnEventData={getAnEventData} />
              </div>

              {isGroupDiscountEnabled && (
                <GroupDiscountForm
                  getAnEventData={getAnEventData}
                  getAnEventApiState={getAnEventApiState}
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {isPublished && (
        <Suspense fallback={<CardSkeleton />}>
          <LazyTiersSection getAnEventData={getAnEventData} />
        </Suspense>
      )}
      {!isFreeGuestList && (
        <Suspense fallback={<CardSkeleton />}>
          <LazyRevenueChart event={getAnEventData} />
        </Suspense>
      )}

      <FinanceCard getAnEventData={getAnEventData} />

      <Suspense fallback={<CardSkeleton />}>
        <LazyPromoterContent getAnEventData={getAnEventData} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <LazyAddonsSection />
      </Suspense>
    </div>
  );
}

export default Tickets;
