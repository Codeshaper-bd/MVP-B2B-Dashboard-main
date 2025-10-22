import { convertToNumber } from "@/lib/data-types/number";
import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { useGetTotalSalesRevenueQuery } from "@/store/api/sales-revenue/sales-revenue-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import ApexDonutChart from "@/components/charts/apex-donut-chart";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import AverageBarSkeleton from "@/components/skeleton/average-bar-skeleton";
import DonutChartSkeleton from "@/components/skeleton/donut-chart-skeleton";
import RevenueStatsSkeleton from "@/components/skeleton/revenue-stats-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import RevenueItem from "./revenue-item";

function EventOneContent() {
  // get date range from context
  const {
    values: { dateRange, compareEvents },
  } = useSalesRevenueFilterContext();
  // get total sales revenue from api
  const eventId = compareEvents?.value?.eventOne?.value;
  const { data: getTotalSalesRevenueRes, ...getTotalSalesRevenueApiState } =
    useGetTotalSalesRevenueQuery({
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
  const {
    totalRevenue,
    barRevenue,
    ticketRevenue,
    revenueGraph,
    barRevenueGraph,
    ticketRevenueGraph,
  } = getTotalSalesRevenueData || {};

  const revenueData = [
    { label: "Total Revenue", amount: totalRevenue?.value },
    { label: "Bar Revenue", amount: barRevenue?.value },
    { label: "Ticket Revenue", amount: ticketRevenue?.value },
  ];

  // chart
  const chartCategories = revenueGraph?.category || [];
  const chartSeries = revenueGraph?.series || [];
  return (
    <RenderData
      expectedDataType="object"
      data={getTotalSalesRevenueData}
      {...getTotalSalesRevenueApiState}
      loadingSkeleton={
        <div className="space-y-6">
          <RevenueStatsSkeleton />
          <AreaChartSkeleton />
          <AverageBarSkeleton />
          <DonutChartSkeleton />
        </div>
      }
    >
      <div className="space-y-6">
        <Card className="shadow-none">
          <CardContent className="p-6">
            <RevenueItem data={revenueData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="lg:mb-0 lg:pb-0">
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pt-0">
            <ApexAreaChart
              categories={chartCategories}
              series={[
                {
                  name: "Total Sales",
                  data: chartSeries,
                },
                {
                  name: "Bar Sales",
                  data: barRevenueGraph?.series || [],
                },
                {
                  name: "Ticket Sales",
                  data: ticketRevenueGraph?.series || [],
                },
              ]}
              colors={["#17B26A", "#FDA29B", "#F79009"]}
              height={230}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chart</CardTitle>
          </CardHeader>

          <CardContent>
            <ApexDonutChart
              labels={["Ticket Sales", "Bar Sales"]}
              series={[
                convertToNumber({ value: ticketRevenue?.value }),
                convertToNumber({ value: barRevenue?.value }),
              ]}
              colors={["#FEC84B", "#FDA29B"]}
              height={280}
              totalValueFormatterText="$"
            />
          </CardContent>
        </Card>
      </div>
    </RenderData>
  );
}

export default EventOneContent;
