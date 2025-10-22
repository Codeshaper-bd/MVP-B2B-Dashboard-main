import type { TDiscountTypeOption } from "./types";

export const options: TDiscountTypeOption[] = [
  { value: "PERCENTAGE", label: "% Percent", symbol: "%" },
  { value: "FIXED_AMOUNT", label: "Fixed Amount", symbol: "Fixed" },
];
