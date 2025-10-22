import { useMemo } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { useGetFennecLiveRevenueOverviewQuery } from "@/store/api/fennec-live/fennec-live-api";
import ApexDonutChart from "@/components/charts/apex-donut-chart";
import RenderData from "@/components/render-data";
import BarSalesSkeleton from "@/components/skeleton/bar-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BarStatistics() {
  const {
    data: getFennecLiveRevenueOverviewRes,
    ...getFennecLiveRevenueOverviewApiState
  } = useGetFennecLiveRevenueOverviewQuery();

  const getFennecLiveRevenueOverviewData =
    getFennecLiveRevenueOverviewRes?.data;

  const { barStats } = getFennecLiveRevenueOverviewData || {};
  const barNames = useMemo(
    () => barStats?.map((item) => `${item.barName} : $${item.totalRevenue}`),
    [barStats],
  );

  const totalRevenue =
    useMemo(
      () => barStats?.map((item) => Number(item.totalRevenue)),
      [barStats],
    ) || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Sales</CardTitle>
      </CardHeader>
      <CardContent className="py-3">
        <RenderData
          expectedDataType="object"
          data={getFennecLiveRevenueOverviewData}
          {...getFennecLiveRevenueOverviewApiState}
          loadingSkeleton={<BarSalesSkeleton />}
        >
          <ApexDonutChart
            labels={barNames}
            series={totalRevenue}
            totalValueFormatterText="$"
          />

          <div className="mt-4">
            <h2 className="mb-1 text-lg font-medium text-default-900">
              Total Orders
            </h2>
            <ul className="space-y-2">
              {barStats?.map((item, index) => (
                <li
                  key={`${item.barName}-${index}`}
                  className="flex items-center gap-4 text-sm font-medium text-default-700"
                >
                  <span>{item.barName}</span>
                  <span>:</span>
                  <span>
                    {convertToNumber({
                      value: item.totalOrders,
                      digit: 2,
                      fallback: 0,
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default BarStatistics;
