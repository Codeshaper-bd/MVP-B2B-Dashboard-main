"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const Chart = dynamic(() => import("react-apexcharts"));
interface StatusBlockProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  total?: number | string;
  series?: number[];
  chartColor?: string;
  iconWrapperClass?: string;
  chartType?: "area" | "bar" | "line" | "pie" | "donut" | "radialBar";
  opacity?: number;
  isIncrease?: boolean;
  percentage?: string;
}

function StatusBlock({
  title,
  total,
  className,
  icon,
  series = [800, 600, 1000, 800, 600, 1000, 800, 900],
  chartColor = "#0ce7fa",
  iconWrapperClass,
  chartType = "area",
  opacity = 0.1,
  isIncrease = true,
  percentage,
}: StatusBlockProps) {
  const { theme: mode } = useTheme();
  const chartSeries = [
    {
      data: series,
    },
  ];

  const options: ApexCharts.ApexOptions = {
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
    },
    fill: {
      type: "solid",
      opacity: [opacity],
    },
    legend: {
      show: false,
    },
    xaxis: {
      // low: 0,
      offsetX: 0,
      offsetY: 0,
      // show: false,
      labels: {
        // low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        // low: 0,
        offsetX: 0,
        show: false,
      },
    },
  };

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
              options={options}
              series={chartSeries}
              type={chartType}
              height={41}
              width={124}
            />
          </div>
        </div>
        {title && (
          <h2 className="mb-1 text-sm font-normal text-default-700">{title}</h2>
        )}

        <div className="flex items-center gap-2">
          {total && (
            <span className="text-3xl font-medium text-default-900">
              {total}
            </span>
          )}
          {isIncrease ? (
            <div className="flex items-center gap-1">
              <ArrowUp className="h-5 w-5 text-success" />
              <span className="text-sm font-normal text-success">
                {percentage}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <ArrowDown className="h-5 w-5 text-destructive" />
              <span className="text-sm font-normal text-destructive">
                {percentage}%
              </span>
            </div>
          )}
          <span className="text-sm font-medium text-default-600">
            vs last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export { StatusBlock };
