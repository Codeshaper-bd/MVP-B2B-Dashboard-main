import type {
  ICreatePromoterFormValues,
  IGuestListPermissionProps,
} from "./types";

export const initialPromoterFormValues: ICreatePromoterFormValues = {
  promoter: undefined,
  isSubmitted: false,
  phoneNumber: "",
  selectedEvent: null,
  permissions: ["DEFAULT_GUESTLIST"],
  publicTicketRateType: "PERCENTAGE",
  publicRatePerTicketSold: 0,
  ratePerPrivateGuestListEntry: 0,
};
export const guestListPermissions: IGuestListPermissionProps[] = [
  { label: "Public Guestlist (Default)", value: "DEFAULT_GUESTLIST" },
  { label: "Private Guestlist", value: "PRIVATE_GUESTLIST" },
  { label: "Table Management", value: "TABLE_MANAGEMENT" },
];
