import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TNullish } from "@/store/api/common-api-types";
import type { TEvent } from "@/store/api/events/events.types";
import type { TPromotion } from "@/store/api/promotion/promotion.types";

export type TPrepareEventDetailsFormStateDataProps = {
  getAnEventData: TEvent;
};

export const preparePromotionFormStateData = async ({
  getAnEventData,
}: TPrepareEventDetailsFormStateDataProps) => {
  let localPromotions: TPromotion[] | TNullish = null;
  try {
    const localPromotionsGetRes =
      await localStorageUtil.getItemAsync<TPromotion[]>("promotions");
    if (!localPromotionsGetRes?.success) {
      throw new Error("Failed to get promotions from local storage");
    }
    localPromotions = Array.isArray(localPromotionsGetRes.data)
      ? localPromotionsGetRes.data
      : null;
  } catch (error) {
    console.error("Failed to get promotions from local storage", error);
  }

  return {
    promotions:
      localPromotions ||
      (Array.isArray(getAnEventData?.promotions)
        ? getAnEventData?.promotions
        : null),
  };
};
