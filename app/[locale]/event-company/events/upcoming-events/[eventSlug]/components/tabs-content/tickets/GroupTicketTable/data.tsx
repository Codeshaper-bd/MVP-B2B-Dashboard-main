import type { TDataProps } from "./columns";

export const data: TDataProps[] = [
  {
    id: crypto.randomUUID(),
    serialNo: 1,
    tierList: "Corporate Group Package",
    ratio: {
      male: 5,
      female: 7,
    },
    ticketSold: 22,
    type: "Public",
  },
  {
    id: crypto.randomUUID(),
    serialNo: 2,
    tierList: "Early Bird",
    ratio: {
      male: 5,
      female: 7,
    },
    ticketSold: 22,
    type: "Private",
  },
];
