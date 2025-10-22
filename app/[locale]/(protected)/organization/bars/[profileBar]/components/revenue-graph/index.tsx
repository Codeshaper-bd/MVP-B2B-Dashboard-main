import dayjs from "dayjs";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { useGetBarRevenueGraphQuery } from "@/store/api/bars/bars-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { revenueGraphTimeRanges, type TTimeRangeOptions } from "./utils";
import type { TUseProfileBarReturn } from "../../hooks/useGetProfileBarSlug";

function RevenueGraph({ barSlug, isValidSlug }: TUseProfileBarReturn) {
  // date range
  const [dateRange, setDateRange] = useState<DateRange>({
    from: dayjs().subtract(1, "month").toDate(),
    to: dayjs().toDate(),
  });
  const [selectedRange, setSelectedRange] =
    useState<TTimeRangeOptions["value"]>("all");

  const { data: getBarRevenueGraphRes, ...getBarRevenueGraphApiState } =
    useGetBarRevenueGraphQuery(
      {
        slug: barSlug,
        filter: selectedRange,
        startDate:
          selectedRange === "range"
            ? dateRange?.from?.toISOString()
            : undefined,
        endDate:
          selectedRange === "range" ? dateRange?.to?.toISOString() : undefined,
      },
      {
        skip: !isValidSlug,
      },
    );
  const getBarRevenueGraphData = getBarRevenueGraphRes?.data;
  const seriesData =
    getBarRevenueGraphData?.value?.map((item: number) => item) || [];

  const handleDateRangeApply = (updatedDateRange: DateRange) => {
    setDateRange(updatedDateRange);
    setSelectedRange("range");
  };

  return (
    <Card>
      <CardHeader className="md:pb-4">
        <CardTitle>Revenue Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="mt-3 flex min-w-[260px] flex-1 flex-wrap items-center">
            {revenueGraphTimeRanges?.map((item) => (
              <Button
                type="button"
                key={item?.value}
                color="secondary"
                className="position-relative z-50 border-none bg-transparent text-default-600 disabled:cursor-not-allowed disabled:bg-default-100 disabled:text-default-1000 disabled:opacity-100"
                onClick={() => {
                  setSelectedRange(item?.value);
                }}
                disabled={item?.value === selectedRange}
              >
                {item?.label}
              </Button>
            ))}
          </div>
          {/* <div className="flex-none">
            <DateRangePicker
              defaultDateRange={dateRange}
              onApply={handleDateRangeApply}
              disabled={disableFutureDates}
            />
          </div> */}
        </div>
        <RenderData
          expectedDataType="object"
          data={getBarRevenueGraphData}
          {...getBarRevenueGraphApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={getBarRevenueGraphData?.category}
            series={[{ name: "Revenue", data: seriesData }]}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default RevenueGraph;
