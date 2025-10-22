import type { TUser } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";

import type { MenusGroup } from "./types";
import {
  isEventCompanyAdminOrCoAdmin,
  isNightClubAdminOrCoAdmin,
  isPromoter,
} from "../user/checkAuth";
import { eventCompanyMenu } from "./constant/eventCompanyMenu";
import { nightClubMenu } from "./constant/nightClubMenu";
import { promoterMenu } from "./constant/promoter-menu";

export function getMenuList(
  pathname: string,
  loggedInUser: TUser | TNullish,
): MenusGroup[] {
  const isPromoterPortal = isPromoter(loggedInUser);
  const isNightClub = isNightClubAdminOrCoAdmin(loggedInUser);
  const isEventCompany = isEventCompanyAdminOrCoAdmin(loggedInUser);
  if (isPromoterPortal) {
    return promoterMenu(pathname);
  }
  if (isNightClub) {
    return nightClubMenu(pathname);
  }
  if (isEventCompany) {
    return eventCompanyMenu(pathname);
  }

  return [];
}
