import type { TUseFetchEmployeePerformanceDataArgs } from "@/hooks/data-fetch/useFetchEmployeePerformanceData";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TicketScanChart({
  employeeData,
}: TUseFetchEmployeePerformanceDataArgs) {
  const guestListMetrics =
    employeeData?.performanceMetrics?.guestList?.guestListMetrics;
  return (
    <Card>
      <CardHeader className="md:pb-3">
        <CardTitle className="font-semibold">Total Tickets Scan</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ApexAreaChart
          categories={guestListMetrics?.category || []}
          series={[
            {
              name: "Tickets Scanned",
              data: guestListMetrics?.series || [],
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}

export default TicketScanChart;
