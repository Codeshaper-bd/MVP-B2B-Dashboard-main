import { getGridConfig } from "@/lib/charts/apex-chart-options";

export interface IGetApexChartOptionsProps {
  categories?: string[];
  colors?: string[];
}
const getOptions = ({ categories, colors }: IGetApexChartOptionsProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    colors: colors ?? ["#1570EF", "#DD2590", "#EAAA08"],

    tooltip: { theme: "dark" },

    fill: {
      type: "gradient",
      colors: colors ?? ["#FFC833"],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.1,
        stops: [50, 100, 0],
      },
    },
    grid: getGridConfig(),
    yaxis: {
      labels: {
        style: {
          colors: ["#94969C"],
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: (value: number) => `$${value}`,
      },
    },
    xaxis: {
      categories: categories ?? [],
      labels: {
        style: {
          colors: "#94969C",
          fontFamily: "Inter, sans-serif",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: { colors: "#94969C" },
      floating: false,
      markers: {
        size: 4,
        strokeWidth: 0,
        offsetX: -5,
      },
      itemMargin: { horizontal: 12 },
      fontFamily: "Inter, sans-serif",
    },
  };

  return options;
};

export default getOptions;
