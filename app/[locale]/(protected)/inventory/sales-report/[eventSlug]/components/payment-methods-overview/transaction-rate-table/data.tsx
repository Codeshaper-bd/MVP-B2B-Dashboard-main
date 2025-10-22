import type { TDataProps } from "./columns";

export const data: TDataProps[] = [
  {
    id: crypto.randomUUID(),
    status: "successful",
    numberOfTransactions: 330,
    totalPercentage: "95%",
  },

  {
    id: crypto.randomUUID(),
    status: "failed",
    numberOfTransactions: 10,
    totalPercentage: "3%",
  },

  {
    id: crypto.randomUUID(),
    status: "cancelled",
    numberOfTransactions: 10,
    totalPercentage: "3%",
  },
];
