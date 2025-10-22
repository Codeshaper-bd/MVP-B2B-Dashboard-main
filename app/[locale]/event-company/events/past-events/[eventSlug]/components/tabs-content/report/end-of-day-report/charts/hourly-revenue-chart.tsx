"use client";

import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getSalesRevenueChartData = {
  categories: ["6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM"],
  data: [100, 250, 400, 350, 500, 420, 300],
};

function HourlyRevenueChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-1 pb-0 md:pb-2">
        <CardTitle>Hourly Revenue Trend</CardTitle>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-[#17B26A]"></div>
          <p className="text-sm font-medium text-default-600">Revenue</p>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <RenderData expectedDataType="object" data={getSalesRevenueChartData}>
          <ApexAreaChart
            categories={getSalesRevenueChartData.categories}
            series={[
              {
                name: "Revenue",
                data: getSalesRevenueChartData.data,
              },
            ]}
            colors={["#17B26A"]}
            height={200}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default HourlyRevenueChart;
