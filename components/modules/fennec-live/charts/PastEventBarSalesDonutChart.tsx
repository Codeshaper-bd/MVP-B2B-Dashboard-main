import { useMemo } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetPastEventBarQuery } from "@/store/api/past-event/past-event-api";
import ApexDonutChart from "@/components/charts/apex-donut-chart";
import RenderData from "@/components/render-data";
import BarSalesSkeleton from "@/components/skeleton/bar-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IPastEventBarSalesDonutChartProps {
  eventSlug: string | TNullish;
}
function PastEventBarSalesDonutChart({
  eventSlug,
}: IPastEventBarSalesDonutChartProps) {
  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });
  const { data: getPastEventBarRes, ...getPastEventBarApiState } =
    useGetPastEventBarQuery(
      {
        slug: eventSlug,
      },
      {
        skip: !isProbableValidSlugFound,
      },
    );
  const getPastEventBarData = getPastEventBarRes?.data;
  const { revenue } = getPastEventBarData || {};

  // donut chart

  const barNames =
    useMemo(
      () =>
        revenue?.barStats?.map(
          (item) => `${item.barName} : $${item.totalRevenue}`,
        ),
      [revenue?.barStats],
    ) || [];

  const totalRevenue = useMemo(
    () =>
      revenue?.barStats?.map((item) =>
        convertToNumber({ value: item?.totalRevenue }),
      ),
    [revenue?.barStats],
  ) || [0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Sales</CardTitle>
      </CardHeader>
      <CardContent className="py-3">
        <RenderData
          expectedDataType="array"
          data={getPastEventBarData?.statistic}
          {...getPastEventBarApiState}
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
              {revenue?.barStats?.map((item, index) => (
                <li
                  key={`${item.barName}-${index}`}
                  className="flex items-center gap-4 text-sm font-medium text-default-700"
                >
                  <span>{item.barName}</span>
                  <span>:</span>
                  <span>{item.totalOrders}</span>
                </li>
              ))}
            </ul>
          </div>
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default PastEventBarSalesDonutChart;
