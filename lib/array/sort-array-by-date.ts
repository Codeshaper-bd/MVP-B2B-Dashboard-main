type TSortOrder = "asc" | "desc" | "neutral";

export const sortArrayByDate = <T extends Record<string, unknown>>({
  dateKey,
  array,
  order = "neutral",
}: {
  dateKey: keyof T;
  array?: T[] | null | undefined;
  order?: TSortOrder;
}): T[] => {
  if (!Array.isArray(array)) {
    return [];
  }
  if (order === "neutral" || (order !== "asc" && order !== "desc")) {
    return array ?? [];
  }

  return (
    array?.sort((a, b) => {
      const dateA = new Date(a?.[dateKey] as string | number | Date);
      const dateB = new Date(b?.[dateKey] as string | number | Date);

      if (order === "asc") {
        return dateA.getTime() - dateB.getTime();
      } else if (order === "desc") {
        return dateB.getTime() - dateA.getTime();
      }

      return 0;
    }) ?? []
  );
};
