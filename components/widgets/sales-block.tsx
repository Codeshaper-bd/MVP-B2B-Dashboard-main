"use client";
import type { ApexOptions } from "apexcharts";
import { ArrowDown, ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";

import { getArraySum } from "@/lib/array/getArraySum";
import type { IApexAreaChartSeries } from "@/lib/charts/types";
import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import { Link } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Chart = dynamic(() => import("react-apexcharts"));
interface SalesBlockProps {
  icon?: React.ReactNode;
  title?: string;
  total?: number | string;
  series?: IApexAreaChartSeries[];
  chartColor?: string;
  iconWrapperClass?: string;
  chartType?: "area" | "bar" | "line" | "pie" | "donut" | "radialBar";
  opacity?: number;
  isIncrease?: boolean;
  percentage?: string;
  chartShow?: boolean;
  href?: string;
  filterLabel?: string;
}

function SalesBlock({
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
  opacity = 0.1,
  isIncrease = true,
  percentage,
  chartShow = true,
  href,
  filterLabel = "vs last month",
}: SalesBlockProps) {
  const options: ApexOptions = {
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
    },
  };

  const isSeriesMoreThanOne = getArraySum(series[0].data) > 0;
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
          {chartShow && isSeriesMoreThanOne && (
            <div className="ms-auto max-w-[124px]">
              <Chart
                options={options}
                series={series}
                type={chartType}
                height={41}
                width={124}
              />
            </div>
          )}
        </div>
        {title && (
          <h2 className="mb-1 text-sm font-normal text-default-700">{title}</h2>
        )}

        <div className="mb-4 flex items-center gap-2">
          {total && (
            <span className="text-2xl font-medium text-default-900 lg:text-[32px]">
              $
              {convertToNumber({
                value: total,
                digit: 2,
                fallback: 0,
              })}
            </span>
          )}
          {isIncrease ? (
            <div className="flex items-center gap-1">
              <ArrowUp className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">
                {percentage}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <ArrowDown className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                {percentage}%
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-default-600">
            {filterLabel}
          </span>
        </div>
        <Button
          color="secondary"
          fullWidth
          asChild
          className="border-default-100 bg-[#161B26] text-[#85888E]"
        >
          <Link href={href || "#"} className="flex items-center gap-1.5">
            See Details
            <RightArrowIcon className="h-4 w-4 transition-all duration-200" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export { SalesBlock };
