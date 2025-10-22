// import type { TDataProps } from "./columns";

export const data = [
  {
    id: crypto.randomUUID(),
    Product: "Main Bar",
    volume: "Pending",
    quantity: null,
    cost: null,
    promoType: null,
    Amount: null,
  },
];
export type TDataProps = (typeof data)[0];
