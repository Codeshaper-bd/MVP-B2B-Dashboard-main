import type { TTicketType } from "@/store/api/promoter/promoter.types";

type TTabOption = {
  value: TTicketType;
  label: string;
};

export const tabs: TTabOption[] = [
  {
    label: "Regular Tickets",
    value: "individual",
  },
  {
    label: "Group Tickets",
    value: "group",
  },
];
