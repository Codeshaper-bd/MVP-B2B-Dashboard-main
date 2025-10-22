import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import DiscountList from "@/components/modules/discount/DiscountList";
import RevenueChart from "@/components/modules/event/charts/RevenueChart";
import TiersSection from "@/components/modules/tiers/TiersSection";
import { Separator } from "@/components/ui/separator";

import GroupDiscount from "./GroupDiscount";
import TicketTiers from "./TicketTiers";

function PaidGuestContent() {
  const { getAnEventData } = useFetchAnEventData();
  const eventId = getAnEventData?.details?.id;

  return (
    <>
      <TicketTiers eventId={eventId} />

      <h2 className="mb-5 text-lg font-semibold text-default-900">Discount</h2>
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
