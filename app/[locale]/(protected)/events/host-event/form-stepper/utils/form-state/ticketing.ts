import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TAddOn } from "@/store/api/add-ons/add-ons.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent, TGuestListOn } from "@/store/api/events/events.types";

import type { TTicketingInputs } from "../../steps/step-two/types";
import { defaultValues } from "../../values";
import { checkIsGuestListOn } from "../narrow-type";

export type TPrepareEventDetailsFormStateDataProps = {
  getAnEventData: TEvent;
};

export const prepareTicketingFormStateData = async ({
  getAnEventData,
}: TPrepareEventDetailsFormStateDataProps) => {
  /* step 2 start */
  const ticketing: TTicketingInputs = {
    ...defaultValues.ticketing,
    ...getAnEventData?.ticketTiers,
  };

  /* common fields start */

  if (checkIsGuestListOn(getAnEventData?.details)) {
    ticketing.isFreeGuestList = getAnEventData?.details.isFreeGuestList;
  } else {
    ticketing.isFreeGuestList = false;
  }
  const localAddOns = await localStorageUtil.getItemAsync<TAddOn[] | TNullish>(
    "addons",
  );
  // addons
  ticketing.addons = localAddOns?.data || getAnEventData?.addOns;

  /* common fields end */

  /* Conditional fields (based on isFreeGuestList) start */
  if (ticketing.isFreeGuestList) {
    /* common fields start */
    // ticket tier
    ticketing.ticketTier = null;
    // promoter or link tracking
    ticketing.linkTracking = null;
    /* common fields end */

    /* guest list on start */
    if (checkIsGuestListOn(getAnEventData?.details)) {
      ticketing.guestListLimitType =
        getAnEventData?.details?.guestListLimitType;
      ticketing.guestListLimit = getAnEventData?.details?.guestListLimit;
      ticketing.perUserGuestListLimitQty =
        getAnEventData?.details?.perUserGuestListLimitQty;
    }
    /* guest list on end */

    /* conditional fields start */
    // group discount
    ticketing.groupDiscount = null;

    // discount
    ticketing.discounts = null;
    /* conditional fields end */
  } else {
    // ticket tier
    ticketing.ticketTier = getAnEventData?.ticketTiers;
    // promoter or link tracking
    ticketing.linkTracking = getAnEventData?.linkTracking;

    /* guest list off start */
    delete (ticketing as unknown as Partial<TGuestListOn>)?.guestListLimitType;
    delete (ticketing as unknown as Partial<TGuestListOn>)?.guestListLimit;
    delete (ticketing as unknown as Partial<TGuestListOn>)
      ?.perUserGuestListLimitQty;
    /* guest list off end */

    /* conditional fields start */
    // group discount

    ticketing.groupDiscount = getAnEventData?.groupDiscount;

    // discount

    /* conditional fields end */
  }
  /* Conditional fields (based on isFreeGuestList) end */

  /* step 2 end */

  return {
    ticketing,
  };
};
