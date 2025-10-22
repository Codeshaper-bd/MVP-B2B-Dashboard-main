import { checkIsNumber } from "./check-is-number";

export function checkIsNegativeNumber(value: unknown): value is number {
  return checkIsNumber(value) && value < 0;
}
