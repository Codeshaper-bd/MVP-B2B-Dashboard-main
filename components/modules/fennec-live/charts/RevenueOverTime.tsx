import { useGetFennecLiveRevenueOverTimeQuery } from "@/store/api/fennec-live/fennec-live-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RevenueOverTime() {
  const {
    data: getFennecLiveRevenueOverTimeRes,
    ...getFennecLiveRevenueOverTimeApiState
  } = useGetFennecLiveRevenueOverTimeQuery();

  const getFennecLiveRevenueOverTimeData =
    getFennecLiveRevenueOverTimeRes?.data;

  const { revenueOverTime } = getFennecLiveRevenueOverTimeData || {};

  const categories = revenueOverTime?.map((item) => item.time ?? "");
  const totalSeries = revenueOverTime?.map((item) => item.total ?? 0) || [];
  const barSeries = revenueOverTime?.map((item) => item.bar ?? 0) || [];
  const guestlistSeries =
    revenueOverTime?.map((item) => item.guestlist ?? 0) || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle> Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <RenderData
          expectedDataType="object"
          data={getFennecLiveRevenueOverTimeData}
          {...getFennecLiveRevenueOverTimeApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={categories}
            series={[
              { name: "Total", data: totalSeries },
              { name: "Bar", data: barSeries },
              { name: "Guestlist", data: guestlistSeries },
            ]}
            colors={["#17B26A", "#F79009", "#D92D20"]}
            height={200}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default RevenueOverTime;
