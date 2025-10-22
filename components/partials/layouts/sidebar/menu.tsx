"use client";

import { Ellipsis } from "lucide-react";
import { useParams } from "next/navigation";
import { memo, useMemo, useState } from "react";
import { getLangDir } from "rtl-detect";

import { useConfig } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { getMenuList } from "@/lib/menus";
import type { MenusGroup } from "@/lib/menus/types";
import { filterMenuItems, getFlatMenuItems } from "@/lib/menus/utils";
import { cn } from "@/lib/utils";
import { selectAuthUser } from "@/store/features/auth";
import { useAppSelector } from "@/store/hooks";
import Logo from "@/components/logo";
import { usePathname } from "@/components/navigation";
import CollapseMenuButton from "@/components/partials/layouts/sidebar/common/collapse-menu-button";
import MenuItem from "@/components/partials/layouts/sidebar/common/menu-item";
import MenuLabel from "@/components/partials/layouts/sidebar/common/menu-label";
import SearchBar from "@/components/partials/layouts/sidebar/common/search-bar";
import SidebarHoverToggle from "@/components/partials/layouts/sidebar/sidebar-hover-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import SearchMenuList from "./search-menu-list";
import StaticFooterMenu from "./static-footer-menu";
import UserProfile from "./user-profile";
export type TSidebarMenuProps = {
  type?: "default" | "mobile";
  className?: string;
  handleCloseSidebarDrawer?: () => void;
};
function SidebarMenu({
  type = "default",
  handleCloseSidebarDrawer,
}: TSidebarMenuProps) {
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const direction = getLangDir(params?.locale ?? "");
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [config, setConfig] = useConfig();
  const [searchTerm, setSearchTerm] = useState("");
  const loggedInUser = useAppSelector(selectAuthUser);

  const menuList = useMemo(
    () => getMenuList(pathname, loggedInUser),
    [pathname, loggedInUser],
  );

  const collapsed = type === "default" ? config.collapsed : false;
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;

  const activeMenuPath = pathname?.split("/").filter((path) => path);

  const activeMenuFirstPath = activeMenuPath[0];
  const activeCurrentMenus: MenusGroup = useMemo(() => {
    switch (activeMenuFirstPath) {
      case "inventory":
        return menuList?.[2];
      case "social":
        return menuList?.[1];

      default:
        return menuList?.[0];
    }
  }, [activeMenuFirstPath, menuList]);

  // search bar

  // flatten once when pathname changes
  const allMenus = useMemo(
    () => getFlatMenuItems(pathname, loggedInUser),
    [pathname, loggedInUser],
  );

  // recompute filtered list when searchTerm or allMenus change
  const filtered = useMemo(
    () => filterMenuItems(allMenus, searchTerm),
    [allMenus, searchTerm],
  );

  return (
    <>
      {isDesktop && (
        <>
          <div
            className={cn("flex items-center justify-between px-4 py-4", {
              "justify-center": collapsed && !hovered,
            })}
          >
            <Logo />
            <SidebarHoverToggle />
          </div>

          <div
            className={cn("pb-4", {
              "px-4": !collapsed || hovered,
              "text-center": collapsed || !hovered,
            })}
          >
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </>
      )}

      {searchTerm && !collapsed ? (
        <ScrollArea className="min-h-[calc(100vh-90px-300px)] lg:min-h-[calc(100vh-90px-300px)]">
          <SearchMenuList filtered={filtered} setSearchTerm={setSearchTerm} />
        </ScrollArea>
      ) : (
        <ScrollArea
          className="min-h-[calc(100vh-90px-300px)] lg:min-h-[calc(100vh-90px-300px)]"
          dir={direction}
        >
          <ScrollArea
            className="min-h-[calc(100vh-90px-300px)] lg:min-h-[calc(100vh-90px-300px)]"
            dir={direction}
          >
            <nav
              className={cn("h-auto w-full", {
                "mx-auto w-[68px] rounded-lg bg-default-50 px-2.5 py-3":
                  collapsed && !hovered,
              })}
            >
              <ul
                className={cn(
                  "flex h-full flex-col items-start space-y-2 px-4",
                  {
                    "px-0": collapsed && !hovered,
                  },
                )}
              >
                {activeCurrentMenus?.menusGroup?.map(
                  ({ groupLabel, menus }, index) => (
                    <li
                      className={cn(
                        "w-full border-b border-default-200 pb-4 last:border-b-0 last:pb-2",
                        groupLabel ? "" : "",
                        { "space-y-2": collapsed },
                      )}
                      key={index}
                    >
                      {((!collapsed || hovered) && groupLabel) ||
                      !collapsed === undefined ? (
                        <MenuLabel label={groupLabel} />
                      ) : collapsed &&
                        !hovered &&
                        !collapsed !== undefined &&
                        groupLabel ? (
                        <TooltipProvider>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger className="w-full">
                              <div className="flex w-full items-center justify-center">
                                <Ellipsis className="h-5 w-5 text-default-700" />
                              </div>
                            </TooltipTrigger>

                            <TooltipContent side="right">
                              <p>{groupLabel}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : null}

                      {menus?.map(
                        ({ href, label, icon, active, id, submenus }, index) =>
                          submenus?.length === 0 ? (
                            <div className="mb-2 w-full last:mb-0" key={index}>
                              <TooltipProvider disableHoverableContent>
                                <Tooltip delayDuration={0}>
                                  <TooltipTrigger asChild>
                                    <>
                                      <MenuItem
                                        label={label}
                                        icon={icon}
                                        href={href}
                                        active={active}
                                        id={id}
                                        collapsed={collapsed}
                                        handleCloseSidebarDrawer={
                                          handleCloseSidebarDrawer
                                        }
                                      />
                                    </>
                                  </TooltipTrigger>
                                  {collapsed && (
                                    <TooltipContent side="right">
                                      {label}
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ) : (
                            <CollapseMenuButton
                              key={index}
                              icon={icon}
                              label={label}
                              active={active}
                              submenus={submenus}
                              collapsed={collapsed}
                              id={id}
                              handleCloseSidebarDrawer={
                                handleCloseSidebarDrawer
                              }
                            />
                          ),
                      )}
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <StaticFooterMenu
              type={type}
              handleCloseSidebarDrawer={handleCloseSidebarDrawer}
              className="mb-4 px-4 xl:hidden"
            />
          </ScrollArea>
        </ScrollArea>
      )}

      <div className="z-10 -mt-5 w-full px-4 py-5">
        <StaticFooterMenu type={type} className="hidden xl:flex" />
        <Separator className="my-6 hidden bg-default-200 xl:block" />
        <UserProfile type={type} />
      </div>
    </>
  );
}

export default memo(SidebarMenu);
