import useFetchAnEventData from "@/hooks/data-fetch/useFetchAnEventData";
import PastEventBarSales from "@/components/modules/fennec-live/charts/PastEventBarSales";
import PastEventBarSalesDonutChart from "@/components/modules/fennec-live/charts/PastEventBarSalesDonutChart";

function Bar() {
  const { eventSlug } = useFetchAnEventData();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-7 2xl:col-span-8">
        <PastEventBarSales eventSlug={eventSlug} />
      </div>

      <div className="col-span-12 lg:col-span-5 2xl:col-span-4">
        <PastEventBarSalesDonutChart eventSlug={eventSlug} />
      </div>
    </div>
  );
}

export default Bar;
