import type { TTicketingInputs } from "./types";

export const ticketingValues: TTicketingInputs = {
  isFreeGuestList: false,

  /* conditional fields when freeGuestList is true (not implemented properly because of backend constraints) start*/
  ticketTier: null,

  // group discount
  groupDiscount: null,

  // discount
  discounts: null,

  linkTracking: null,

  // addons
  addons: null,
};
