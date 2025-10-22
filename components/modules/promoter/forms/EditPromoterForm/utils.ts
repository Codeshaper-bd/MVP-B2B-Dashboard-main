import type { IGuestListPermissionProps } from "./types";

export const guestListPermissions: IGuestListPermissionProps[] = [
  { label: "Public Guestlist (Default)", value: "DEFAULT_GUESTLIST" },
  { label: "Private Guestlist", value: "PRIVATE_GUESTLIST" },
  { label: "Table Management", value: "TABLE_MANAGEMENT" },
];
