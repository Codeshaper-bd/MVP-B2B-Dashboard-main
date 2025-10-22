import type { TBarRevenueGraphFilter } from "@/store/api/bars/bars.types";

export type TTimeRangeOptions = {
  label: string;
  value: TBarRevenueGraphFilter;
};

export const revenueGraphTimeRanges: TTimeRangeOptions[] = [
  {
    label: "12 Hours",
    value: "12h",
  },
  {
    label: "24 Hours",
    value: "24h",
  },
  {
    label: "7 Days",
    value: "7d",
  },
  {
    label: "1 Month",
    value: "1mo",
  },
  {
    label: "3 Month",
    value: "3mo",
  },
  {
    label: "1 Year",
    value: "1y",
  },
  {
    label: "All Time",
    value: "all",
  },
];
