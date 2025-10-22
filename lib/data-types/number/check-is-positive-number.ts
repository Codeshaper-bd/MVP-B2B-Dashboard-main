import { checkIsNumber } from "./check-is-number";

export function checkIsPositiveNumber(value: unknown): value is number {
  return checkIsNumber(value) && value > 0;
}
