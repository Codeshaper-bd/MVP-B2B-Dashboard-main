import type { TTimeRange } from "@/store/api/bar-menu-item/bar-menu-item.types";

interface IOption {
  label: string;
  value: TTimeRange;
}

export const timeRangeOptions: IOption[] = [
  {
    label: "12 Hours",
    value: "12h",
  },
  {
    label: "24 Hours",
    value: "24h",
  },
  {
    label: "1 Month",
    value: "1month",
  },
  {
    label: "6 Months",
    value: "6month",
  },
  {
    label: "All Time",
    value: "all",
  },
];
