import { getGridConfig } from "@/lib/charts/apex-chart-options";

export interface IGetApexBarChartOptionsProps {
  categories?: string[];
  colors?: string[];
  showYAxis?: boolean;
  showXAxis?: boolean;
}
const getOptions = ({
  categories,
  colors,
  showYAxis = true,
  showXAxis = true,
}: IGetApexBarChartOptionsProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "45%",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    colors: colors ?? ["#00B8FF"],
    tooltip: { theme: "dark" },
    fill: {
      type: "solid",
    },
    grid: {
      ...getGridConfig(),
      borderColor: "#2D2E33",
      yaxis: {
        lines: { show: showYAxis },
      },
      xaxis: {
        lines: { show: showXAxis },
      },
    },
    yaxis: {
      show: showYAxis,
      labels: {
        style: {
          colors: ["#94969C"],
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
          fontWeight: 400,
        },
        formatter: (value: number) => {
          if (value >= 1000) {
            return `$${value / 1000}`;
          }
          return `$${value}`;
        },
      },
    },
    xaxis: {
      categories: categories ?? [],
      labels: {
        style: {
          colors: "#94969C",
          fontFamily: "Inter, sans-serif",
        },
        show: showXAxis,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: {
      show: false,
    },
  };

  return options;
};

export default getOptions;
