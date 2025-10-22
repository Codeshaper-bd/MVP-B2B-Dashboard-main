"use client";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

import { getOptions, type IGetDonutChartOptionsProps } from "./get-options";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export interface ApexAreaChartProps extends IGetDonutChartOptionsProps {
  height?: number;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
}
function ApexDonutChart({
  labels,
  series,
  height = 300,
  colors = ["#17B26A", "#FEC84B", "#FDA29B"],
  legendPosition = "right",
  labelFontSize = "24px",
  valueFontSize = "24px",
  totalValueFormatterText,
}: ApexAreaChartProps) {
  const options = useMemo(
    () =>
      getOptions({
        colors,
        labels,
        legendPosition,
        labelFontSize,
        valueFontSize,
        totalValueFormatterText,
      }),
    [
      labels,
      colors,
      legendPosition,
      labelFontSize,
      valueFontSize,
      totalValueFormatterText,
    ],
  );
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height={height}
      width={"100%"}
    />
  );
}

export default memo(ApexDonutChart);
