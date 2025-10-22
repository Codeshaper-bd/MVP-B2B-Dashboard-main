type TJsonString = string | number | null | undefined;
export const getParsedValue = <T = string>(
  jsonString: string | number | null | undefined,
): T | undefined => {
  if (typeof jsonString !== "string") {
    console.error("Invalid input: not a string");
    return undefined;
  }

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return undefined;
  }
};

export const getParsedValues = <T extends Record<string, unknown>>(
  args: T,
): Partial<T> => {
  const result: Partial<T> = {};

  for (const key in args) {
    if (Object.prototype.hasOwnProperty.call(args, key)) {
      const value = args?.[key] as TJsonString;
      result[key] = getParsedValue(value);
    }
  }

  return result;
};
