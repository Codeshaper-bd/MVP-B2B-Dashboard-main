"use client";

import { useEffect, useState } from "react";

import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAllBarsQuery } from "@/store/api/bars/bars-api";
import type { TBar } from "@/store/api/bars/bars.types";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { useGetSalesReportOverviewQuery } from "@/store/api/sales-report/sales-report-api";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import RenderData from "@/components/render-data";
import AreaChartSkeleton from "@/components/skeleton/area-chart-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BarSalesChart({
  eventSlug,
}: {
  eventSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
}) {
  const [bar, setBar] = useState<TBar | null>(null);

  const isProbableValidSlugFound = checkIsValidId(eventSlug, {
    type: "string",
  });

  // get bar data
  const { data: getAllBarsRes, ...getAllBarsApiState } = useGetAllBarsQuery();
  const getAllBarsData = getAllBarsRes?.data;

  // get sales report overview
  const { data: getSalesReportOverviewRes, ...getSalesReportOverviewApiState } =
    useGetSalesReportOverviewQuery(
      {
        slug: eventSlug,
        barId: bar?.id,
      },
      {
        skip: !isProbableValidSlugFound,
      },
    );
  const getSalesReportOverviewData = getSalesReportOverviewRes?.data;

  // set bar id

  useEffect(() => {
    if (!bar && getAllBarsData && !!getAllBarsData.length) {
      const firstBar = getAllBarsData[0];
      setBar(firstBar);
    }
  }, [bar, getAllBarsData]);

  return (
    <Card>
      <CardHeader className="!pb-3">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1">
              <CardTitle>Bar Sales Overview</CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <h2 className="text-[32px] font-medium text-default-900">
                  ${getSalesReportOverviewData?.currentSales}
                </h2>
                {/* <div className="flex items-center gap-0.5">
                  <ArrowDownIcon
                    className={cn("size-3.5 text-[#F97066]", {
                      "rotate-180 text-[#47CD89]":
                        getSalesReportOverviewData?.getterThenLastWeek,
                    })}
                  />
                  <p className="text-sm font-medium text-[#47CD89]">
                    {getSalesReportOverviewData?.percentageChange}%
                  </p>
                </div>
                <p className="text-sm font-medium text-default-600">
                  vs last week
                </p> */}
              </div>
            </div>
            <div className="flex-none">
              <RenderData
                expectedDataType="array"
                data={getAllBarsData}
                {...getAllBarsApiState}
              >
                <div className="flex flex-wrap gap-1.5">
                  {getAllBarsData?.map((item) => (
                    <Button
                      type="button"
                      key={item?.id}
                      color="secondary"
                      className="border-none bg-transparent text-default-600 disabled:bg-default-100 disabled:text-default-1000 disabled:opacity-100"
                      onClick={() => setBar(item)}
                      disabled={item?.id === bar?.id}
                    >
                      {item?.name}{" "}
                    </Button>
                  ))}
                </div>
              </RenderData>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <RenderData
          expectedDataType="object"
          data={getSalesReportOverviewData}
          {...getSalesReportOverviewApiState}
          loadingSkeleton={<AreaChartSkeleton />}
        >
          <ApexAreaChart
            categories={getSalesReportOverviewData?.graphData?.categories}
            series={[
              {
                name: getSalesReportOverviewData?.graphData?.name || "Bar",
                data: getSalesReportOverviewData?.graphData?.series || [],
              },
            ]}
            height={250}
            colors={["#F79009"]}
          />
        </RenderData>
      </CardContent>
    </Card>
  );
}

export default BarSalesChart;
