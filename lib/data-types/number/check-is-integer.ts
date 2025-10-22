import { checkIsNumber } from "./check-is-number";

export function checkIsInteger(value: unknown): value is number {
  return checkIsNumber(value) && Number.isInteger(value);
}
