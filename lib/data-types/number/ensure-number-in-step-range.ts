import { convertToNumber } from "./convert-to-number";

export function ensureNumberInStepRange({
  value,
  step = 1,
  fallback,
}: {
  value: number | undefined;
  step?: number | string;
  fallback?: number;
}) {
  const stepStr = step?.toString() || "1";
  const decimalIndex = stepStr?.indexOf(".") || -1;
  const decimalPlaces =
    decimalIndex === -1 ? 0 : stepStr.length - decimalIndex - 1;

  return convertToNumber({
    value,
    digit: decimalPlaces,
    fallback,
  });
}
