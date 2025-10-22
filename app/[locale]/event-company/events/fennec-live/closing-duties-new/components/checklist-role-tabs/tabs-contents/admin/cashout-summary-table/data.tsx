// import type { TDataProps } from "./columns";

export const data = [
  {
    id: crypto.randomUUID(),
    category: "Main Bar",
    status: "Pending",
    cashOnHand: null,
    posReadAmount: null,
    debitTerminal: null,
    promos: null,
    spillageWastage: null,
    overageShortage: null,
  },
];

export type TDataProps = (typeof data)[0];
