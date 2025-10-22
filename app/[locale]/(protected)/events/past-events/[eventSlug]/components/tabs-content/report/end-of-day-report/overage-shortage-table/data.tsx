export const data = [
  {
    id: crypto.randomUUID(),
    barArea: "Main Bar",
    amount: "+$5923.02",
  },
  {
    id: crypto.randomUUID(),
    barArea: "Upper Bar",
    amount: "-$24.02",
  },
  {
    id: crypto.randomUUID(),
    barArea: "Lower Bar",
    amount: "+$502.02",
  },
];
export type TDataProps = (typeof data)[0];
