import useFetchPromoterTicketSoldData from "@/hooks/data-fetch/useFetchPromoterTicketSoldData";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import FemaleIcon from "@/components/icons/FemaleIcon";
import MaleIcon from "@/components/icons/MaleIcon";
import TierCard from "@/components/modules/tiers/TierCard";

import PromoterRevenueChart from "./PromoterRevenueChart";

interface IGuestListProps {
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"];
  event?: TEvent | TNullish;
  promoterId?: TIdOrSlugOrIdentifier<"id">["id"];
}
export function GuestList({
  ticketTierId,
  event,
  promoterId,
}: IGuestListProps) {
  const { promoterTicketSoldData } = useFetchPromoterTicketSoldData(
    event?.details?.id,
    ticketTierId,
  );
  return (
    <div>
      <div className="my-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <TierCard
          title="Male"
          icon={<MaleIcon className="h-6 w-6 text-default-1000" />}
          ticketCount={promoterTicketSoldData?.attendees?.male || 0}
          iconWrapperClass="bg-[#263CFF]"
        />

        <TierCard
          title="Female"
          icon={<FemaleIcon className="h-6 w-6 text-default-1000" />}
          ticketCount={promoterTicketSoldData?.attendees?.female || 0}
          iconWrapperClass="!bg-[#D82ADC]"
        />

        <TierCard
          title="Neutral"
          icon={<div className="size-6 text-[#F5F5F6]">N/A</div>}
          ticketCount={
            promoterTicketSoldData?.attendees?.otherOrUnspecified || 0
          }
          iconWrapperClass="!bg-[#F79009]"
        />

        <TierCard
          title="Total Ticket Sales"
          ticketCount={promoterTicketSoldData?.totalSoldQty || 0}
        />
      </div>
      <PromoterRevenueChart
        eventSlug={event?.details?.slug}
        ticketTierId={ticketTierId}
        promoterId={promoterId}
      />
    </div>
  );
}
