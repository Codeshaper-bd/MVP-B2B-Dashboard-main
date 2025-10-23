"use client";
import dynamic from "next/dynamic";

import type { IApexAreaChartSeries } from "@/lib/charts/types";
import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import SimpleTooltip from "@/components/ui/SimpleTooltip";
const Chart = dynamic(() => import("react-apexcharts"));

interface StatisticsBlockProps {
  icon?: React.ReactNode;
  title?: string;
  total?: number | string | TNullish;
  series?: IApexAreaChartSeries[];
  chartColor?: string;
  chartCategories?: string[];
  iconWrapperClass?: string;
  chartType?: "area" | "bar" | "line" | "pie" | "donut" | "radialBar";
  opacity?: number;
  isIncrease?: boolean;
  percentage?: string;
  tooltipContent?: string;
  hasFooter?: boolean;
  unit?: string;
  titleClassName?: string;
  filterLabel?: string;
  isNegative?: boolean;
}

export type TData = ApexAxisChartSeries[number]["data"];

const getOptions = ({
  chartColor,
  opacity,
  chartCategories,
}: {
  chartColor: string;
  opacity: number;
  chartCategories?: string[];
}): ApexCharts.ApexOptions => ({
  chart: {
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
    offsetX: 0,
    offsetY: 0,
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "60%",
      barHeight: "100%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  colors: [chartColor],

  tooltip: {
    theme: "dark",
    fixed: {
      enabled: false,
      position: "topRight",
      offsetX: 0,
      offsetY: 60,
    },
  },

  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  yaxis: {
    show: false,
    labels: {
      formatter: (value: number) => `$${value.toFixed(2)}`,
    },
  },
  fill: {
    type: "solid",
    opacity: [opacity],
  },
  legend: {
    show: false,
  },
  xaxis: {
    offsetX: 0,
    offsetY: 0,
    labels: {
      offsetX: 0,
      show: false,
    },
    axisBorder: {
      offsetX: 0,
      show: false,
    },
    categories: chartCategories,
  },
});

function StatisticsBlock({
  title,
  total,
  icon,
  series = [
    {
      name: "Demo",
      data: [40, 70, 20, 90, 60, 110, 100],
    },
  ],
  chartColor = "#0ce7fa",
  iconWrapperClass,
  chartType = "area",
  chartCategories,
  opacity = 0.1,
  isIncrease = true,
  percentage,
  tooltipContent = "in the time range for the previous month",
  hasFooter = true,
  unit,
  titleClassName,
  filterLabel = "vs last month",
  isNegative = false,
}: StatisticsBlockProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-5 flex items-center">
          {icon && (
            <div className="flex-none">
              <div
                className={cn(
                  "flex h-10 w-10 flex-col items-center justify-center rounded-full border border-border-primary text-2xl",
                  iconWrapperClass,
                )}
              >
                {icon}
              </div>
            </div>
          )}

          <div className="ms-auto max-w-[124px]">
            <Chart
              options={getOptions({
                chartColor,
                opacity,
                chartCategories,
              })}
              series={series?.map((item) => ({
                name: item?.name,
                data: item?.data,
              }))}
              type={chartType}
              height={41}
              width={124}
            />
          </div>
        </div>

        {title && (
          <h2
            className={cn(
              "mb-1 text-sm font-normal text-default-700",
              titleClassName,
            )}
          >
            {title}
          </h2>
        )}

        <div className="mb-1 text-[28px] font-medium text-default-900">
          {isNegative && "-"}$
          {convertToNumber({
            value: total,
            digit: 2,
            fallback: 0,
          })}{" "}
          {unit && (
            <span className="text-sm font-medium text-default-600">{unit}</span>
          )}
        </div>

        {hasFooter && (
          <div className="flex items-center">
            {isIncrease ? (
              <div className="flex items-center gap-1">
                {/* <ArrowDownIcon className="h-3.5 w-3.5 rotate-180 text-[#47CD89]" /> */}
                <div className="text-sm font-medium text-[#47CD89]">
                  {percentage}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                {/* <ArrowDownIcon className="h-3.5 w-3.5 text-[#F97066]" /> */}
                <span className="text-sm font-medium text-[#F97066]">
                  {percentage}
                </span>
              </div>
            )}

            <span className="ml-2 flex items-center text-xs font-medium text-default-600">
              <span className="mr-2">{filterLabel}</span>
              <SimpleTooltip
                triggerContent={<InfoIcon className="h-3.5 w-3.5" />}
              >
                {tooltipContent}
              </SimpleTooltip>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { StatisticsBlock };
