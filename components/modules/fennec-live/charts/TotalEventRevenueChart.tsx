import { convertToNumber } from "@/lib/data-types/number";
import { useGetFennecLiveRevenueOverviewQuery } from "@/store/api/fennec-live/fennec-live-api";
import ApexDonutChart from "@/components/charts/apex-donut-chart";
import RenderData from "@/components/render-data";
import TotalEventRevenueSkeleton from "@/components/skeleton/total-revenue-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TotalEventRevenueChart() {
  // get donut chart data
  const {
    data: getFennecLiveRevenueOverviewRes,
    ...getFennecLiveRevenueOverviewApiState
  } = useGetFennecLiveRevenueOverviewQuery();

  const getFennecLiveRevenueOverviewData =
    getFennecLiveRevenueOverviewRes?.data;

  const { barRevenue = "0", guestlistRevenue = "0" } =
    getFennecLiveRevenueOverviewData || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm md:text-lg">
          Total Event Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RenderData
          expectedDataType="object"
          data={getFennecLiveRevenueOverviewData}
          {...getFennecLiveRevenueOverviewApiState}
          loadingSkeleton={<TotalEventRevenueSkeleton />}
        >
          <ApexDonutChart
            labels={["GuestList", "Bar"]}
            series={[
              convertToNumber({
                value: guestlistRevenue,
                digit: 2,
                fallback: 0,
              }),
              convertToNumber({
                value: barRevenue,
                digit: 2,
                fallback: 0,
              }),
            ]}
            height={200}
            totalValueFormatterText="$"
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default TotalEventRevenueChart;
