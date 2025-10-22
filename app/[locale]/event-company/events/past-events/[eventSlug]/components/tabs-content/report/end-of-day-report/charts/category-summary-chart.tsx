"use client";

import ApexDonutChart from "@/components/charts/apex-donut-chart";
import RenderData from "@/components/render-data";
import DonutChartSkeleton from "@/components/skeleton/donut-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CategorySummaryChart() {
  const getCategorySummaryData = {
    liquor: 1200.5,
    nabNonAlcoholic: 800.2,
    beer: 950.0,
    cover: 400.3,
    subtotal: 3500.0,
    other: 210.7,
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Chart</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderData
          expectedDataType="object"
          data={getCategorySummaryData}
          loadingSkeleton={<DonutChartSkeleton className="size-64" />}
        >
          <ApexDonutChart
            legendPosition="bottom"
            labels={[
              "LIQUOR",
              "NAB (Non-Alcoholic)",
              "BEER",
              "COVER",
              "SUBTOTAL",
              "OTHER",
            ]}
            series={[
              getCategorySummaryData?.["liquor"] ?? 0,
              getCategorySummaryData?.["nabNonAlcoholic"] ?? 0,
              getCategorySummaryData?.["beer"] ?? 0,
              getCategorySummaryData?.["cover"] ?? 0,
              getCategorySummaryData?.["subtotal"] ?? 0,
              getCategorySummaryData?.["other"] ?? 0,
            ]}
            colors={[
              "#47CD89",
              "#FEC84B",
              "#FDA29B",
              "#36BFFA",
              "#F670C7",
              "#7A5AF8",
            ]}
            height={280}
            totalValueFormatterText=""
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default CategorySummaryChart;
