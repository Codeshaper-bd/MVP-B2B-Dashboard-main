import type { TGuestListOn } from "@/store/api/events/events.types";

export interface IGuestListFormData {
  isFreeGuestList: boolean;
  guestListLimit: number;
  guestListLimitType: TGuestListOn["guestListLimitType"];
  perUserGuestListLimitQty: number;
}
