import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import DiscountList from "@/components/modules/discount/DiscountList";
import RevenueChart from "@/components/modules/event/charts/RevenueChart";
import TiersSection from "@/components/modules/tiers/TiersSection";
import { Separator } from "@/components/ui/separator";

import GroupDiscount from "./GroupDiscount";
import TicketTiers from "./ticket-tiers";

function PaidGuestContent() {
  const { getAnEventData } = useFetchAnEventData();
  const eventId = getAnEventData?.details?.id;

  return (
    <>
      <TicketTiers eventId={eventId} />
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-medium">Discount</h3>
      </div>
      <DiscountList
        model="Event"
        modelId={eventId}
        getAnEventData={getAnEventData}
        isShowRedeemedCount={true}
        isPastEvent={true}
      />
      <GroupDiscount />
      <Separator />
      <TiersSection getAnEventData={getAnEventData} />
      <RevenueChart event={getAnEventData} />
    </>
  );
}

export default PaidGuestContent;
