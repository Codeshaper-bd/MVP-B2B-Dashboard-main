import { useGetPastEventRevenueOverviewQuery } from "@/store/api/past-event/past-event-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface IPastTotalEventRevenue {
  eventSlug: string;
}
function PastRevenueOverTime({ eventSlug }: IPastTotalEventRevenue) {
  const {
    data: getPastEventRevenueOverviewRes,
    ...getPastEventRevenueOverviewApiState
  } = useGetPastEventRevenueOverviewQuery({
    slug: eventSlug,
  });

  const getPastEventRevenueOverviewData = getPastEventRevenueOverviewRes?.data;

  const { revenueOverTime } = getPastEventRevenueOverviewData || {};

  const categories = revenueOverTime?.category || [];
  const dataSeries =
    revenueOverTime?.revenue?.map((item) => ({
      name: item.name || "",
      data: item.data || [],
    })) || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle> Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <RenderData
          expectedDataType="object"
          data={getPastEventRevenueOverviewData}
          {...getPastEventRevenueOverviewApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={categories}
            series={dataSeries}
            colors={["#17B26A", "#F79009", "#D92D20"]}
            height={200}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default PastRevenueOverTime;
