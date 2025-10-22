"use client";

import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { useGetSalesRevenueChartQuery } from "@/store/api/sales-revenue/sales-revenue-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import LegendButton from "@/components/charts/LegendButton";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import RenderData from "@/components/render-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SalesRevenueChart() {
  const {
    values: { dateRange, activeTime },
  } = useSalesRevenueFilterContext();

  const { data: getSalesRevenueChartRes, ...getSalesRevenueChartApiState } =
    useGetSalesRevenueChartQuery({
      range: activeTime?.value === "custom" ? undefined : activeTime?.value,
      startTime:
        activeTime?.value === "custom"
          ? convertLocalToUTC({
              localDateTime: dateRange?.value?.from,
              type: "startOfDay",
            })
          : undefined,
      endTime:
        activeTime?.value === "custom"
          ? convertLocalToUTC({
              localDateTime: dateRange?.value?.to,
              type: "endOfDay",
            })
          : undefined,
    });

  const getSalesRevenueChartData = getSalesRevenueChartRes?.data;
  const chartCategories = getSalesRevenueChartData?.categories || [];
  const chartSeries = getSalesRevenueChartData?.series || [0, 0];
  return (
    <Card>
      <CardHeader className="pb-0 md:pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Sales Chart With Time</CardTitle>
          <LegendButton />
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <RenderData
          expectedDataType="object"
          data={getSalesRevenueChartData}
          {...getSalesRevenueChartApiState}
        >
          <ApexAreaChart
            categories={chartCategories}
            series={[
              {
                name: "Revenue",
                data: chartSeries,
              },
            ]}
            colors={["#F79009"]}
            height={240}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default SalesRevenueChart;
