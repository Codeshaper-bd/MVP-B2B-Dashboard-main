import { checkIsNumber } from "./check-is-number";

export function checkIsFloat(value: unknown): boolean {
  return checkIsNumber(value) && value % 1 !== 0;
}
