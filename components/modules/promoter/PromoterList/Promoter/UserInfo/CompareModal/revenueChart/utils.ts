import type { TPromoterTimeRange } from "@/store/api/promoters/promoters.types";

export type TTimeRangeOptions = {
  label: string;
  value: TPromoterTimeRange;
};
export type TRevenueOptions = {
  label: string;
  value: string | undefined;
};

export const timeRanges: TTimeRangeOptions[] = [
  {
    label: "12H",
    value: "12h",
  },
  {
    label: "24H",
    value: "24h",
  },
  {
    label: "7D",
    value: "7d",
  },
  {
    label: "30D",
    value: "30d",
  },
  {
    label: "3M",
    value: "3m",
  },
  {
    label: "ALL",
    value: "all",
  },
];

export const revenueFilterOptions: TRevenueOptions[] = [
  {
    label: "ALL",
    value: undefined,
  },
  {
    label: "Public Guestlist",
    value: "PublicGuestlist",
  },
  {
    label: "Private Guestlist",
    value: "PrivateGuestlist",
  },
  {
    label: "Table Guestlist",
    value: "TableGuestlist",
  },
];
