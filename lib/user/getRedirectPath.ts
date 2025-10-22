import {
  isEventCompanyAdmin,
  isEventCompanyCoAdmin,
  isNightClubAdmin,
  isNightClubCoAdmin,
  isPromoter,
} from "./checkAuth";
import type { TUserArgs } from "./types";

export function getRedirectPath(user: TUserArgs): string {
  if (isPromoter(user)) {
    return "/en/promoter/clubs";
  } else if (isNightClubAdmin(user) || isNightClubCoAdmin(user)) {
    return "/en/dashboard/dashboard";
  } else if (isEventCompanyAdmin(user) || isEventCompanyCoAdmin(user)) {
    return "/en/event-company";
  }

  return "/en/dashboard/dashboard";
}
