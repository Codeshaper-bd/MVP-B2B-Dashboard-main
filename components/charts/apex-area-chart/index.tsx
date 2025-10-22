"use client";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import type { IApexAreaChartSeries } from "@/lib/charts/types";

import getOptions, { type IGetApexChartOptionsProps } from "./get-options";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ApexAreaChartProps extends IGetApexChartOptionsProps {
  height?: number;
  series: IApexAreaChartSeries[] | number[];
}
function ApexAreaChart({
  categories,
  series,
  height = 300,
  colors = ["#17B26A"],
}: ApexAreaChartProps) {
  const options = useMemo(
    () => getOptions({ categories, colors }),
    [categories, colors],
  );
  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={height}
      width={"100%"}
    />
  );
}

export default memo(ApexAreaChart);
