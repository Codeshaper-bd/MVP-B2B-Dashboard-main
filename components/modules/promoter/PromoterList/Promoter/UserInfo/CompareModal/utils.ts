export type TRevenueOptions = {
  label: string;
  value: "All" | "PublicGuestlist";
};

export const revenueFilterOptions: TRevenueOptions[] = [
  {
    label: "ALL",
    value: "All",
  },
  {
    label: "Public Guestlist",
    value: "PublicGuestlist",
  },
];
