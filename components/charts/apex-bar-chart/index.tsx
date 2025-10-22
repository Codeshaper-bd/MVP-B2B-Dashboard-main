"use client";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import type { IApexAreaChartSeries } from "@/lib/charts/types";

import getOptions, { type IGetApexBarChartOptionsProps } from "./get-options";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ApexBarChartProps extends IGetApexBarChartOptionsProps {
  height?: number;
  series: IApexAreaChartSeries[];
  showYAxis?: boolean;
  showXAxis?: boolean;
  colors?: string[];
}
function ApexBarChart({
  categories,
  series,
  height = 300,
  colors = ["#0BA5EC"],
  showYAxis = true,
  showXAxis = true,
}: ApexBarChartProps) {
  const options = useMemo(
    () => getOptions({ categories, colors, showYAxis, showXAxis }),
    [categories, colors, showYAxis, showXAxis],
  );
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
}

export default memo(ApexBarChart);
