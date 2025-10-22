import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";

import PromotionsTable from "../../../../upcoming-events/[eventSlug]/components/tabs-content/promotions/promotions-table";
import PromotionProvider from "./../../../../upcoming-events/[eventSlug]/components/tabs-content/promotions/promotion-context";

export default function Promotions() {
  const { getAnEventData } = useFetchAnEventData();

  return (
    <div className="mt-6">
      <PromotionProvider promotionsData={getAnEventData?.promotions}>
        <PromotionsTable promotionsData={getAnEventData?.promotions} />
      </PromotionProvider>
    </div>
  );
}
