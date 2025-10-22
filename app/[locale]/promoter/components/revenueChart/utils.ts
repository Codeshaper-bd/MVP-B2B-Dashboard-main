export type TTimeRangeOptions = {
  label: string;
  value: string;
};
export type TRevenueOptions = {
  label: string;
  value: string | undefined;
};

export const timeRanges: TTimeRangeOptions[] = [
  {
    label: "12 hours",
    value: "12_hours",
  },
  {
    label: "24 hours",
    value: "24_hours",
  },
  {
    label: "7 days",
    value: "7_days",
  },
  {
    label: "30 days",
    value: "1_month",
  },
  {
    label: "3 month",
    value: "3_month",
  },
  {
    label: "Overall",
    value: "overall",
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
