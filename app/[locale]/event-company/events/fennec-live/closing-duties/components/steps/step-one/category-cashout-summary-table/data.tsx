import type { TDataProps } from "./columns";

export const data: TDataProps[] = [
  {
    category: "Main Bar",
    id: crypto.randomUUID(),
    debitTerminal: 1000,
    cashOnHand: 500,
    completed: "10,000",
    pra: 200,
  },
  {
    category: "Lower Bar",
    id: crypto.randomUUID(),
    debitTerminal: 1000,
    cashOnHand: 300,
    completed: "10,000",
    pra: 200,
  },
  {
    category: "Cover",
    id: crypto.randomUUID(),
    debitTerminal: "N/A",
    cashOnHand: "N/A",
    completed: "10,000",
    pra: 200,
  },
];
