import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { useGetSalesRevenueOverviewGraphQuery } from "@/store/api/sales-revenue/sales-revenue-api";
import ApexDonutChart from "@/components/charts/apex-donut-chart";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import RenderData from "@/components/render-data";
import DonutChartSkeleton from "@/components/skeleton/donut-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RevenueOverview() {
  // get date range from context
  const {
    values: { dateRange, event },
  } = useSalesRevenueFilterContext();
  // get total sales revenue from api
  const eventId = event?.value?.value;
  const { data: getTotalSalesRevenueRes, ...getTotalSalesRevenueApiState } =
    useGetSalesRevenueOverviewGraphQuery({
      startDate: convertLocalToUTC({
        localDateTime: dateRange?.value?.from,
        type: "startOfDay",
      }),
      endDate: convertLocalToUTC({
        localDateTime: dateRange?.value?.to,
        type: "endOfDay",
      }),
      eventIds: eventId !== undefined ? [String(eventId)].join(",") : undefined,
    });
  const getTotalSalesRevenueData = getTotalSalesRevenueRes?.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Chart</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderData
          expectedDataType="object"
          data={getTotalSalesRevenueData}
          {...getTotalSalesRevenueApiState}
          loadingSkeleton={<DonutChartSkeleton className="size-64" />}
        >
          <ApexDonutChart
            labels={["Ticket Sales", "Bar Sales"]}
            series={[
              getTotalSalesRevenueData?.ticketRevenue ?? 0,
              getTotalSalesRevenueData?.barRevenue ?? 0,
            ]}
            colors={["#FEC84B", "#FDA29B"]}
            height={280}
            totalValueFormatterText="$"
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default RevenueOverview;
