import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import PastEventAddOnList from "@/components/modules/addon/PastEventAddOnList";
import PromoterContent from "@/components/modules/event/event-promoter/promoter-content";
import FreeGuestList from "@/components/modules/event/guest-list/FreeGuestList";
import FinanceCard from "@/components/modules/event/tax/FinanceCard";
import RenderData from "@/components/render-data";

import PaidGuestContent from "./PaidGuestContent";
export default function Tickets() {
  const { getAnEventData, getAnEventApiState } = useFetchAnEventData();
  const isFreeGuestList = getAnEventData?.details?.isFreeGuestList;

  return (
    <RenderData
      expectedDataType="object"
      data={getAnEventData}
      {...getAnEventApiState}
    >
      <div className="mt-6 space-y-6">
        {isFreeGuestList && <FreeGuestList getAnEventData={getAnEventData} />}
        {!isFreeGuestList && <PaidGuestContent />}
        <FinanceCard getAnEventData={getAnEventData} />
        <PromoterContent getAnEventData={getAnEventData} isPastEvent={true} />
        <PastEventAddOnList getAnEventData={getAnEventData} />
      </div>
    </RenderData>
  );
}
