import type { ApexOptions } from "apexcharts";

import { convertToNumber } from "@/lib/data-types/number";

export interface IGetDonutChartOptionsProps {
  labels: ApexOptions["labels"];
  colors?: ApexOptions["colors"];
  legendPosition?: "left" | "right" | "top" | "bottom";
  labelFontSize?: string;
  labelFontWeight?: string;
  valueFontSize?: string;
  totalValueFormatterText?: string;
}

export const getOptions = ({
  labels,
  colors,
  legendPosition,
  labelFontSize,
  labelFontWeight,
  valueFontSize,
  totalValueFormatterText,
}: IGetDonutChartOptionsProps): ApexOptions => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },

  colors,
  labels,
  tooltip: {
    theme: "dark",
    style: {
      fontSize: "14px",
      fontFamily: "Inter",
    },
    y: {
      formatter: (val) => {
        if (totalValueFormatterText) {
          return `${totalValueFormatterText}${convertToNumber({ value: val, digit: 2 })}`;
        }
        return `${convertToNumber({ value: val, digit: 2 })}`;
      },
    },
  },
  legend: {
    position: legendPosition,
    labels: {
      colors: "#94969C",
    },
    markers: {
      strokeWidth: 0,
      offsetX: -5,
    },
    itemMargin: {
      horizontal: 9,
      vertical: 10,
    },
    fontSize: "12",
    fontFamily: "Inter",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "77%",
        labels: {
          show: true,
          name: {
            fontSize: "16px",
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#fff",
          },
          value: {
            fontSize: valueFontSize ?? "16px",
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#fff",
            formatter: (val) => {
              if (totalValueFormatterText) {
                return `${totalValueFormatterText}${convertToNumber({ value: val, digit: 2 })}`;
              }
              return `${convertToNumber({ value: val, digit: 2 })}`;
            },
          },
          total: {
            show: true,
            fontSize: labelFontSize ?? "15px",
            fontFamily: "Inter",
            fontWeight: labelFontWeight ?? 600,
            color: "#fff",
            showAlways: false,
            formatter(w) {
              const total = w.globals.seriesTotals.reduce(
                (acc: number, val: number) => acc + val,
                0,
              );
              if (totalValueFormatterText) {
                return `${totalValueFormatterText}${convertToNumber({ value: total, digit: 2 })}`;
              }
              return `${convertToNumber({ value: total, digit: 2 })}`;
            },
          },
        },
      },
    },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
    {
      breakpoint: 1024,
      options: {
        legend: {
          position: "right",
        },
      },
    },
    {
      breakpoint: 1600,
      options: {
        legend: {
          position: "right",
        },
      },
    },
  ],
});
