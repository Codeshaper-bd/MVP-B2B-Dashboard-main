import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import { useGetTicketTiersDetailsQuery } from "@/store/api/ticket-tier/ticket-tier-api";
import TierCard from "@/components/modules/tiers/TierCard";
import RenderData from "@/components/render-data";

interface IAddonsRevenueProps {
  getAnEventData: TEvent | TNullish;
}
function AddonsRevenue({ getAnEventData }: IAddonsRevenueProps) {
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
  return (
    <div>
      <h3 className="mb-4 font-medium md:text-lg">Add-Ons</h3>
      <RenderData
        expectedDataType="object"
        data={getTicketTiersData}
        {...getTicketTiersApiState}
      >
        <TierCard
          title="Addons Revenue"
          ticketCount={convertToNumber({
            value: getTicketTiersData?.addOnsRevenue,
            digit: 2,
            fallback: 0,
          })}
          currency="$"
        />
      </RenderData>
    </div>
  );
}

export default AddonsRevenue;
