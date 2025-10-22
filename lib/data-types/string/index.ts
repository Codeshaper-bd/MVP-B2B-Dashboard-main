export function checkIsString(value: unknown): value is string {
  return !!value && typeof value === "string";
}

export function throwErrorForInvalidNumberInput(
  value: unknown,
  name: string,
  safeParse = false,
  fallback: string = "",
): string {
  if (safeParse) {
    try {
      if (!checkIsString(value)) {
        throw new Error(`Invalid input: ${name} must be a string.`);
      }

      return value;
    } catch (error) {
      console.error(`Error parsing ${name}:`, error);
      return fallback;
    }
  } else {
    if (!checkIsString(value)) {
      throw new Error(`Invalid input: ${name} must be a string.`);
    }

    return value;
  }
}
