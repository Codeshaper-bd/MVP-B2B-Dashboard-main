import { useGetFennecLiveBarRevenueOverTimeQuery } from "@/store/api/fennec-live/fennec-live-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BarRevenue() {
  const {
    data: getFennecLiveBarRevenueOverTimeRes,
    ...getFennecLiveBarRevenueOverTimeApiState
  } = useGetFennecLiveBarRevenueOverTimeQuery();
  const getFennecLiveBarRevenueOverTimeData =
    getFennecLiveBarRevenueOverTimeRes?.data;

  const chartCategories = getFennecLiveBarRevenueOverTimeData?.[0].time || [];
  const chartSeries = getFennecLiveBarRevenueOverTimeData?.map((item) => ({
    name: item?.name || "",
    data: item?.sales || [],
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Sales</CardTitle>
      </CardHeader>
      <CardContent className="py-3">
        <RenderData
          expectedDataType="array"
          data={getFennecLiveBarRevenueOverTimeData}
          {...getFennecLiveBarRevenueOverTimeApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={chartCategories}
            series={chartSeries || []}
            colors={["#17B26A", "#F04438", "#FEC84B", "#FDA29B"]}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default BarRevenue;
