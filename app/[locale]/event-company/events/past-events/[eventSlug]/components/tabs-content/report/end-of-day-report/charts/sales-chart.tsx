"use client";

import ApexDonutChart from "@/components/charts/apex-donut-chart";
import RenderData from "@/components/render-data";
import DonutChartSkeleton from "@/components/skeleton/donut-chart-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SalesChart() {
  const getSalesChartData = {
    door: 867.8,
    mainBar: 1735.6,
    upperBar: 1157.1,
    lowerBar: 650.8,
    bottleGirl1: 1410.4,
    bottleGirl2: 1410.4,
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Chart</CardTitle>
      </CardHeader>

      <CardContent>
        <RenderData
          expectedDataType="object"
          data={getSalesChartData}
          loadingSkeleton={<DonutChartSkeleton className="size-64" />}
        >
          <ApexDonutChart
            labels={[
              "Door",
              "Main Bar",
              "Upper Bar",
              "Lower Bar",
              "Bottle Girl 1",
              "Bottle Girl 2",
            ]}
            series={[
              getSalesChartData?.["door"] ?? 0,
              getSalesChartData?.["mainBar"] ?? 0,
              getSalesChartData?.["upperBar"] ?? 0,
              getSalesChartData?.["lowerBar"] ?? 0,
              getSalesChartData?.["bottleGirl1"] ?? 0,
              getSalesChartData?.["bottleGirl2"] ?? 0,
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
            totalValueFormatterText="$"
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default SalesChart;
