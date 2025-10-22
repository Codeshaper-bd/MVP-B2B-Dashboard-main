import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetCheckInSummeryQuery } from "@/store/api/events/events-api";
import type { TEvent } from "@/store/api/events/events.types";
import FemaleIcon from "@/components/icons/FemaleIcon";
import MaleIcon from "@/components/icons/MaleIcon";
import TierCard from "@/components/modules/tiers/TierCard";
import RenderData from "@/components/render-data";
import CardSkeleton from "@/components/skeleton/card-skeleton";
interface ICheckInSummery {
  getAnEventData: TEvent | TNullish;
}
function CheckInSummery({ getAnEventData }: ICheckInSummery) {
  const eventSlug = getAnEventData?.details?.slug;
  const isValidSlug = checkIsValidId(eventSlug, { type: "string" });
  const { data: getCheckInSummeryRes, ...getCheckInSummeryApiState } =
    useGetCheckInSummeryQuery(
      {
        slug: eventSlug,
      },
      {
        skip: !isValidSlug,
      },
    );
  const getCheckInSummeryData = getCheckInSummeryRes?.data;
  return (
    <RenderData
      expectedDataType="object"
      data={getCheckInSummeryData}
      {...getCheckInSummeryApiState}
      loadingSkeleton={
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} length={2} />
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <TierCard
          title={
            getAnEventData?.details?.isFreeGuestList
              ? "Total Guestlist Number"
              : "Total Ticket Sales"
          }
          ticketCount={getCheckInSummeryData?.totalSold || 0}
        />
        <TierCard
          title="Male"
          ticketCount={getCheckInSummeryData?.male || 0}
          icon={<MaleIcon className="h-6 w-6 text-default-1000" />}
        />
        <TierCard
          title="Female"
          ticketCount={getCheckInSummeryData?.female || 0}
          icon={<FemaleIcon className="h-6 w-6 text-default-1000" />}
          iconWrapperClass="!bg-[#D82ADC]"
        />
        <TierCard
          title="Neutral"
          ticketCount={getCheckInSummeryData?.notSpecified || 0}
          icon={<span>N/A</span>}
          iconWrapperClass="!bg-[#F79009]"
        />
      </div>
    </RenderData>
  );
}

export default CheckInSummery;
