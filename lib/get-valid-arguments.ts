export const getValidArguments = <
  T extends Record<string, unknown> | null | undefined | void,
>(
  obj: T | null | undefined | void,
): Partial<T> | undefined => {
  if (!obj || (typeof obj === "object" && Array.isArray(obj))) {
    return undefined;
  }

  const filteredEntries = Object.entries(obj ?? {})?.filter(
    ([, value]) => value !== undefined,
  );

  if (filteredEntries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(filteredEntries) as Partial<T>;
};
