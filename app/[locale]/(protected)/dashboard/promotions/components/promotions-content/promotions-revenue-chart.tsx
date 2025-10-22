"use client";

import { useGetMonthlyPromotionRevenueQuery } from "@/store/api/promotion/promotion-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import LegendButton from "@/components/charts/LegendButton";
import type { TTimeRange } from "@/components/features/filters/DateTimeFilters";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import type { TDateRange } from ".";

function PromotionsRevenueChart({
  dateRange,
  activeTime,
}: {
  dateRange: TDateRange;
  activeTime: TTimeRange;
}) {
  const {
    data: getMonthlyPromotionRevenueRes,
    ...getMonthlyPromotionRevenueApiState
  } = useGetMonthlyPromotionRevenueQuery({
    filterType:
      activeTime === "custom" || activeTime === "all" ? undefined : activeTime,
    startDate: activeTime === "custom" ? dateRange.from : undefined,
    endDate: activeTime === "custom" ? dateRange.to : undefined,
  });
  const getMonthlyPromotionRevenueData = getMonthlyPromotionRevenueRes?.data;
  const chartCategories = getMonthlyPromotionRevenueData?.categories;
  const chartSeries =
    getMonthlyPromotionRevenueData?.series?.map((item) => ({
      name: item?.name,
      data: item?.data,
    })) || [];

  return (
    <Card>
      <CardHeader className="pb-0 md:pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Promotions Revenue</CardTitle>
          <LegendButton />
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <RenderData
          expectedDataType="object"
          data={getMonthlyPromotionRevenueData}
          {...getMonthlyPromotionRevenueApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={chartCategories}
            series={chartSeries}
            colors={["#F79009", "#17B26A", "#F04438"]}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default PromotionsRevenueChart;
