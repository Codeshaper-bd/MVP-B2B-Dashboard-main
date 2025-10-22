"use client";

import { convertToNumber } from "@/lib/data-types/number";
import { convertLocalToUTC } from "@/lib/date-time/utc-date";
import { useGetSalesRevenueBarGraphQuery } from "@/store/api/sales-revenue/sales-revenue-api";
import ApexBarChart from "@/components/charts/apex-bar-chart";
import { useSalesRevenueFilterContext } from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import RenderData from "@/components/render-data";
import AverageBarSkeleton from "@/components/skeleton/average-bar-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AverageBarRevenueChartProps = {
  title?: string;
};

function AverageBarRevenueChart({ title }: AverageBarRevenueChartProps) {
  const {
    values: { dateRange, activeTime },
  } = useSalesRevenueFilterContext();
  const { data: getSalesRevenueChartRes, ...getSalesRevenueChartApiState } =
    useGetSalesRevenueBarGraphQuery({
      filterType:
        activeTime?.value === "custom" ? undefined : activeTime?.value,
      startDate:
        activeTime?.value === "custom"
          ? convertLocalToUTC({
              localDateTime: dateRange?.value?.from,
              type: "startOfDay",
            })
          : undefined,
      endDate:
        activeTime?.value === "custom"
          ? convertLocalToUTC({
              localDateTime: dateRange?.value?.to,
              type: "endOfDay",
            })
          : undefined,
    });
  const getSalesRevenueChartData = getSalesRevenueChartRes?.data;
  const chartCategories =
    getSalesRevenueChartData?.categories?.map((item) => item) || [];
  const chartSeries = getSalesRevenueChartData?.series?.map((item) =>
    convertToNumber({ value: item }),
  ) || [0, 0];
  return (
    <Card>
      <CardHeader className="pb-0 md:pb-2">
        <CardTitle className="flex flex-wrap justify-between gap-1">
          {title}
          <span className="relative my-auto pl-6 text-sm font-medium text-default-600 before:absolute before:left-2 before:top-1/2 before:h-2.5 before:w-2.5 before:-translate-y-1/2 before:rounded-full before:bg-[#0BA5EC] before:content-['']">
            Bar sales
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <RenderData
          data={getSalesRevenueChartRes?.data}
          {...getSalesRevenueChartApiState}
          expectedDataType="object"
          loadingSkeleton={<AverageBarSkeleton />}
        >
          <ApexBarChart
            categories={chartCategories}
            series={[
              {
                name: "Revenue",
                data: chartSeries,
              },
            ]}
            height={240}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default AverageBarRevenueChart;
