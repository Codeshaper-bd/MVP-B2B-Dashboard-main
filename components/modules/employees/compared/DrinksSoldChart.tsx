import type { TUseFetchEmployeePerformanceDataArgs } from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DrinksSoldChart({
  employeeData,
}: TUseFetchEmployeePerformanceDataArgs) {
  const bartenderMetrics =
    employeeData?.performanceMetrics?.barTender?.bartenderMetrics;
  return (
    <Card>
      <CardHeader className="md:pb-3">
        <CardTitle>Drinks Sold Over Time</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ApexAreaChart
          categories={bartenderMetrics?.category || []}
          series={[
            {
              name: "Tickets Scanned",
              data: bartenderMetrics?.series || [],
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}

export default DrinksSoldChart;
