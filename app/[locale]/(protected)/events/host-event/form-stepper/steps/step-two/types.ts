import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TDiscount } from "@/store/api/discounts/discounts.types";
import type { TGuestListConditionalType } from "@/store/api/events/events.types";
import type { TGroupDiscount } from "@/store/api/group-discounts/group-discounts.types";
import type { TLinkTracking } from "@/store/api/link-tracking/link-tracking.types";
import type { TTicketTier } from "@/store/api/ticket-tier/ticket-tier.types";

export type TTicketingInputs = TGuestListConditionalType & {
  /* conditional fields when freeGuestList is true (not implemented properly because of backend constraints) start*/
  ticketTier: TTicketTier[] | TNullish;
  // group discount
  groupDiscount: TGroupDiscount | TNullish;

  // discount
  discounts: TDiscount[] | TNullish;

  // link tracking
  linkTracking: TLinkTracking[] | TNullish;

  // addons
  addons: TAddOn[] | TNullish;
};
