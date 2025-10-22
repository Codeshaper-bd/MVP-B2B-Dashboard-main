import type { TNullish } from "@/store/api/common-api-types";

export type TGetAvatarFallbackName = (name: string | TNullish) => string;

export const getAvatarFallbackName = (
  name: string | null | undefined,
): string => {
  if (!name) {
    return "";
  }

  // Split the name by spaces, underscores, and camel case
  const nameArray: string[] = name.split(/[\s_]+|(?=[A-Z])/).filter(Boolean);

  // Get the initials from the first three words
  const initials = nameArray.slice(0, 3).map((word) => word[0].toUpperCase());

  return initials.join("");
};
