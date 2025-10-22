import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import PastRevenueOverTime from "@/components/modules/fennec-live/charts/PastRevenueOverTime";
import PastTotalEventRevenue from "@/components/modules/fennec-live/charts/PastTotalEventRevenue";
import PastEventChallengesTable from "@/components/modules/fennec-live/tables/PastEventChallengesTable";
import PastEventPromotionsTable from "@/components/modules/fennec-live/tables/PastEventPromotionsTable";

export default function Overview() {
  const { eventSlug } = useFetchAnEventData();

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <PastTotalEventRevenue eventSlug={eventSlug} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <PastRevenueOverTime eventSlug={eventSlug} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PastEventChallengesTable eventSlug={eventSlug} />

        <PastEventPromotionsTable eventSlug={eventSlug} />
      </div>
    </>
  );
}
