"use client";

import { memo } from "react";

import useManageStateParams from "@/hooks/useManageStateParams";
import { convertToNumber } from "@/lib/data-types/number";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { cn } from "@/lib/utils";
import { useGetABarMenuItemStatsQuery } from "@/store/api/bar-menu-item/bar-menu-item-api";
import type { TGetABarMenuItemStatsArgs } from "@/store/api/bar-menu-item/bar-menu-item.types";
import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import { EUnit } from "@/store/api/inventory-item/inventory-item.types";
import ApexAreaChart from "@/components/charts/apex-area-chart";
import { DollarIcon as DollarIcon } from "@/components/icons";
import FileSearchIcon from "@/components/icons/FileSearchIcon";
import { InfoIcon as InfoIcon } from "@/components/icons";
import ShoppingCartIcon from "@/components/icons/ShoppingCartIcon";
import RenderData from "@/components/render-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AnalyticsBlock from "@/components/widgets/analytics-block";

import { timeRangeOptions } from "./utils";

function ProductAnalytics({
  productSlug,
}: {
  productSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
}) {
  const { getAParamValue, updateAParam } =
    useManageStateParams<Exclude<TGetABarMenuItemStatsArgs, void>>();

  const selectedRange = getAParamValue("range") || "12h";

  const { data: getABarMenuItemStatsRes, ...getABarMenuItemStatsResApiState } =
    useGetABarMenuItemStatsQuery(
      {
        slug: productSlug,
        range: selectedRange,
      },
      {
        skip: !checkIsValidId(productSlug, { type: "string" }),
      },
    );
  const getABarMenuItemStatsData = getABarMenuItemStatsRes?.data;
  const { averageOrderSize, ranking, revenue, revenueGraph, totalSales } =
    getABarMenuItemStatsData || {};

  return (
    <RenderData
      expectedDataType="object"
      data={getABarMenuItemStatsData}
      {...getABarMenuItemStatsResApiState}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4 lg:gap-0">
            <h3 className="flex-1 whitespace-nowrap text-lg font-semibold">
              Time Span
            </h3>
            <div className="custom-scrollbar flex gap-0.5">
              {timeRangeOptions?.map((range) => (
                <Button
                  key={range?.value}
                  onClick={() =>
                    updateAParam({
                      key: "range",
                      value: range?.value,
                    })
                  }
                  className={cn(
                    "border-none !px-3 !py-2 text-default-600 hover:bg-secondary",
                    {
                      "bg-secondary text-default-700":
                        selectedRange === range?.value,
                    },
                  )}
                >
                  {range?.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Separator />

          <div className="space-y-6">
            <div className="mt-6 grid grid-cols-2 gap-4">
              <AnalyticsBlock
                title="Total Revenue"
                total={`$${convertToNumber({
                  value: revenue?.value,
                  digit: 2,
                  fallback: 0,
                })}`}
                percentage={`${convertToNumber({
                  value: revenue?.percentage,
                  digit: 2,
                  fallback: 0,
                })}`}
                isIncrease={revenue?.increased || false}
                icon={<DollarIcon className="size-5 text-default-1000" />}
              />

              <AnalyticsBlock
                title="Total Sales"
                total={`${convertToNumber({
                  value: totalSales?.value,
                  digit: 2,
                  fallback: 0,
                })}`}
                percentage={`${convertToNumber({
                  value: totalSales?.percentage,
                  digit: 2,
                  fallback: 0,
                })}`}
                isIncrease={totalSales?.increased || false}
                icon={<ShoppingCartIcon className="size-5 text-default-1000" />}
              />

              <AnalyticsBlock
                title="Average Order Size"
                total={`${convertToNumber({
                  value: averageOrderSize?.value,
                  digit: 2,
                  fallback: 0,
                })}`}
                percentage={`${convertToNumber({
                  value: averageOrderSize?.percentage,
                  digit: 2,
                  fallback: 0,
                })}`}
                isIncrease={averageOrderSize?.increased || false}
                icon={<FileSearchIcon className="size-5 text-default-1000" />}
              />

              <AnalyticsBlock
                title="Total Wastage"
                total={`${convertToNumber({
                  value: ranking?.value,
                  digit: 2,
                  fallback: 0,
                })} ${EUnit.OZ}`}
                percentage={`${convertToNumber({
                  value: ranking?.percentage,
                  digit: 2,
                  fallback: 0,
                })}`}
                isIncrease={ranking?.increased || false}
                icon={<InfoIcon className="size-5 text-default-1000" />}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ApexAreaChart
                  categories={
                    Array.isArray(revenueGraph?.category)
                      ? revenueGraph?.category
                      : []
                  }
                  series={[
                    {
                      name: "Revenue",
                      data: revenueGraph?.series || [],
                    },
                  ]}
                  height={250}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </RenderData>
  );
}

export default memo(ProductAnalytics);
