type TTabValue = "individual" | "group";

type TTabOption = {
  value: TTabValue;
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
