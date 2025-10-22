import { memo } from "react";

import ApexDonutChart from "@/components/charts/apex-donut-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DistributionPointsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution of points usage</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ApexDonutChart
          labels={["Monetary Value", "Options for promotions", "Drinks"]}
          series={[85, 155, 67]}
          height={373}
          colors={["#FEC84B", "#FDA29B", "#17B26A"]}
          totalValueFormatterText="$"
        />
      </CardContent>
    </Card>
  );
}

export default memo(DistributionPointsChart);
