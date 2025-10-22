// import type { TDataProps } from "./columns";

export const data = [
  {
    id: crypto.randomUUID(),
    barArea: "Door",
    amount: "$59.02",
    avgCustomerSpend: "$59.02",
  },
  {
    id: crypto.randomUUID(),
    barArea: "Main Bar",
    amount: "$59.02",
    avgCustomerSpend: "$59.02",
  },
  {
    id: crypto.randomUUID(),
    barArea: "Upper Bar",
    amount: "$59.02",
    avgCustomerSpend: "$59.02",
  },
  {
    id: crypto.randomUUID(),
    barArea: "Lower Bar",
    amount: "$59.02",
    avgCustomerSpend: "$59.02",
  },
  {
    id: crypto.randomUUID(),
    barArea: "Lower Bar",
    amount: "$59.02",
    avgCustomerSpend: "$59.02",
  },
];
export type TDataProps = (typeof data)[0];
