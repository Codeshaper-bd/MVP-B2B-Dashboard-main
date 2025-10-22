import { getGridConfig } from "@/lib/charts/apex-chart-options";

export const option: ApexCharts.ApexOptions = {
  chart: {
    toolbar: { show: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#1570EF", "#DD2590", "#EAAA08"],
  tooltip: { theme: "dark" },

  fill: {
    type: "gradient",
    colors: ["#FFC833"],
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
      formatter: (value: number) => `$${value}k`,
    },
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: {
      style: {
        colors: "#94969C",
        fontFamily: "Inter",
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "right",
    labels: { colors: "#94969C" },
    floating: false,
    markers: {
      strokeWidth: 0,
      offsetX: -5,
    },
    itemMargin: { horizontal: 12 },
  },
};
