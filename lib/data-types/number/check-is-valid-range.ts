import { checkIsNumber } from "./check-is-number";

export function checkIsValidRange(
  value: unknown,
  min: number,
  max: number,
): value is number {
  return checkIsNumber(value) && value >= min && value <= max;
}
