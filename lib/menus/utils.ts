import type { TUser } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";

import { getMenuList } from ".";
import type { FlatMenuItem } from "./types";
import {
  isEventCompanyAdminOrCoAdmin,
  isNightClubAdminOrCoAdmin,
  isPromoter,
} from "../user/checkAuth";
import {
  promoterStaticMenus,
  eventCompanyStaticMenus,
  nightClubStaticMenus,
} from "./constant/static-menus";

export function getFlatMenuItems(
  pathname: string,
  loggedInUser: TUser | TNullish,
): FlatMenuItem[] {
  const groups = getMenuList(pathname, loggedInUser);
  const flat: FlatMenuItem[] = [];
  const seen = new Set<string>();
  // static menus
  let staticMenu: FlatMenuItem[] = [];
  if (isPromoter(loggedInUser)) {
    staticMenu = [...promoterStaticMenus];
  } else if (isEventCompanyAdminOrCoAdmin(loggedInUser)) {
    staticMenu = [...eventCompanyStaticMenus];
  } else if (isNightClubAdminOrCoAdmin(loggedInUser)) {
    staticMenu = [...nightClubStaticMenus];
  }

  groups.forEach(({ menusGroup }) => {
    menusGroup.forEach(({ skip, menus }) => {
      if (skip) {
        return;
      }
      menus.forEach((menu) => {
        if (!seen.has(menu.href)) {
          flat.push({
            id: menu.id,
            href: menu.href,
            label: menu.searchLabel || menu.label,
          });
          seen.add(menu.href);
        }

        menu.submenus?.forEach((sub) => {
          if (sub.href === menu.href) {
            return;
          }
          if (!seen.has(sub.href)) {
            flat.push({
              id: `${menu.id}-${sub.href}`,
              href: sub.href,
              label: sub.searchLabel || sub.label,
            });
            seen.add(sub.href);
          }
        });
      });
    });
  });
  return [...flat, ...staticMenu];
}

export function filterMenuItems(
  items: FlatMenuItem[],
  query: string,
): FlatMenuItem[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return items;
  }
  const filteredItems = items?.filter((item) =>
    item?.label?.toLowerCase().includes(q),
  );
  return filteredItems;
}
