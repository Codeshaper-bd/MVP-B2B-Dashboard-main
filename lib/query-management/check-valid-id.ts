// Use a constant object for our types.
export const ETypes = {
  NUMBER: "number",
  STRING: "string",
} as const;

export type TNumber = typeof ETypes.NUMBER; // "number"
export type TString = typeof ETypes.STRING; // "string"
export type TType = TNumber | TString;

// Option types with extra constraints.
export type TNumberOption = {
  type: TNumber;
  /** Minimum allowed value (default is 1) */
  min?: number;
  /** Maximum allowed value (default is Number.MAX_SAFE_INTEGER) */
  max?: number;
};

export type TStringOption = {
  type: TString;
  /** If provided, enforce an exact length */
  length?: number;
  /** Minimum allowed string length (default is 2) */
  minLength?: number;
  /** Maximum allowed string length (default is 32) */
  maxLength?: number;
};

export function checkIsValidId<
  T extends TNumberOption | TStringOption | undefined,
>(
  id: unknown,
  options?: T,
): id is T extends { type: infer U }
  ? U extends TNumber
    ? number
    : U extends TString
      ? string
      : never
  : number {
  // If no options are provided, default to number validation.
  const type = options?.type ?? ETypes.NUMBER;

  switch (type) {
    case ETypes.NUMBER: {
      if (typeof id !== "number") {
        return false;
      }
      const { min = 1, max = Number.MAX_SAFE_INTEGER } =
        (options as TNumberOption) ?? {};
      return id > 0 && !Number.isNaN(id) && id >= min && id <= max;
    }
    case ETypes.STRING: {
      if (typeof id !== "string") {
        return false;
      }
      const opts = options as TStringOption;
      // If an exact "length" is specified, enforce it.
      if (typeof opts?.length === "number") {
        return id.length === opts.length;
      }
      // Otherwise, enforce minLength and maxLength.
      const { minLength = 2, maxLength = 300 } = opts;
      return id.length >= minLength && id.length <= maxLength;
    }
    default:
      return false;
  }
}
