import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetTicketTiersDetailsQuery } from "@/store/api/ticket-tier/ticket-tier-api";
import { UserIcon as FemaleIcon } from "@/components/icons";
import { UserIcon as MaleIcon } from "@/components/icons";
import TierCard from "@/components/modules/tiers/TierCard";
import RenderData from "@/components/render-data";

import TierTable from "./tier-table";

interface ITiersProps {
  getAnEventData: TEvent | TNullish;
}
function TiersSection({ getAnEventData }: ITiersProps) {
  const eventSlug = getAnEventData?.details?.slug;
  const isValidSlug = checkIsValidId(eventSlug, { type: "string" });

  const { data: getTicketTiersRes, ...getTicketTiersApiState } =
    useGetTicketTiersDetailsQuery(
      {
        slug: eventSlug,
      },
      {
        skip: !isValidSlug,
      },
    );
  const getTicketTiersData = getTicketTiersRes?.data;
  const isFreeGuestList = getAnEventData?.details?.isFreeGuestList;
  const addOnsRevenue = convertToNumber({
    value: getTicketTiersData?.addOnsRevenue,
    digit: 2,
    fallback: 0,
  });
  const totalRevenue = convertToNumber({
    value: getTicketTiersData?.revenue,
    digit: 2,
    fallback: 0,
  });
  return (
    <div>
      <h3 className="font-medium md:text-lg">Tiers</h3>
      <RenderData
        expectedDataType="object"
        data={getTicketTiersData}
        {...getTicketTiersApiState}
      >
        <div className="mb-4 grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3">
          <TierCard
            title="Ticketing Revenue"
            currency="$"
            ticketCount={totalRevenue - addOnsRevenue}
          />
          <TierCard
            title="AddOns Revenue"
            currency="$"
            ticketCount={addOnsRevenue}
          />

          <TierCard
            title="Total Event Revenue"
            currency="$"
            ticketCount={totalRevenue}
          />

          <TierCard
            title={
              isFreeGuestList ? "Total Guestlist Number" : "Total Ticket Sales"
            }
            ticketCount={getTicketTiersData?.totalSold || 0}
          />

          <TierCard
            title="Male"
            ticketCount={getTicketTiersData?.male || 0}
            icon={<MaleIcon className="h-6 w-6 text-default-1000" />}
          />
          <TierCard
            title="Female"
            ticketCount={getTicketTiersData?.female || 0}
            icon={<FemaleIcon className="h-6 w-6 text-default-1000" />}
            iconWrapperClass="!bg-[#D82ADC]"
          />
          <TierCard
            title="Neutral"
            ticketCount={getTicketTiersData?.notSpecified || 0}
            icon={<span>N/A</span>}
            iconWrapperClass="!bg-[#F79009]"
          />
        </div>
        {!isFreeGuestList && (
          <TierTable getEventTicketTiers={getTicketTiersData?.data} />
        )}
      </RenderData>
    </div>
  );
}

export default TiersSection;
