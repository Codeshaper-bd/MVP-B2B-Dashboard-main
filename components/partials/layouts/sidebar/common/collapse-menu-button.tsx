"use client";

import { Fragment, memo, useEffect, useState } from "react";

import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";
import type { Submenu, TMenuIcon } from "@/lib/menus/types";
import { cn } from "@/lib/utils";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import { Link, usePathname } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// for dnd

import MultiCollapseMenuButton from "./classic-multi-collapse-button";

interface CollapseMenuButtonProps {
  icon: TMenuIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  collapsed: boolean | undefined;
  id: string;
  handleCloseSidebarDrawer?: () => void;
}

function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  collapsed,
  id,
  handleCloseSidebarDrawer,
}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const isSubmenuActive = submenus.some(
    (submenu) => submenu.active || pathname.startsWith(submenu.href),
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();
  const [config] = useConfig();
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;

  useEffect(() => {
    setIsCollapsed(isSubmenuActive);
  }, [isSubmenuActive, pathname]);

  if (!collapsed || hovered) {
    return (
      <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed}>
        <CollapsibleTrigger asChild>
          <div className="group peer flex items-center">
            <Button
              color="secondary"
              className="group mb-1 h-auto cursor-pointer justify-start border-transparent bg-transparent px-3 py-2.5 text-base font-semibold capitalize text-default-700 ring-offset-sidebar group-data-[state=open]:bg-secondary group-data-[state=open]:text-primary md:px-3"
              fullWidth
              asChild
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                  <span className="me-4">
                    <Icon
                      className={cn("h-6 w-6 text-default-600", {
                        "text-primary": isCollapsed,
                      })}
                    />
                  </span>
                  <span
                    className={cn(
                      "block max-w-[150px] truncate",
                      !collapsed || hovered
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-96 opacity-0",
                    )}
                  >
                    {label}
                  </span>
                </div>
                <div
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center whitespace-nowrap rounded-full transition-all duration-300",
                    !collapsed || hovered
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0",
                  )}
                >
                  <ChevronDownIcon
                    className={cn(
                      "h-5 w-5 text-default-600 transition-transform duration-200",
                      {
                        "rotate-180": isCollapsed,
                      },
                    )}
                  />
                </div>
              </div>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden pb-2">
          {submenus.map(
            ({ href, label, active, children: subChildren }, index) =>
              subChildren?.length === 0 ? (
                <Button
                  onClick={() => {
                    setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false });
                    handleCloseSidebarDrawer?.();
                  }}
                  key={index}
                  fullWidth
                  color="secondary"
                  className={cn(
                    "mb-0.5 justify-start border-transparent bg-transparent text-start text-base font-semibold text-default-700",
                    {
                      "bg-secondary": active,
                    },
                  )}
                  asChild
                >
                  <Link href={href}>
                    <p
                      className={cn(
                        "w-full truncate ps-7",
                        !collapsed || hovered
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-96 opacity-0",
                      )}
                    >
                      {label}
                    </p>
                  </Link>
                </Button>
              ) : (
                <Fragment key={index}>
                  <MultiCollapseMenuButton
                    label={label}
                    active={active}
                    submenus={subChildren}
                  />
                </Fragment>
              ),
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "default" : "ghost"}
                color="secondary"
                className={cn(
                  "h-12 w-12 justify-center border-0 bg-default text-default-600 hover:bg-primary hover:text-default-100 focus:bg-default focus:text-default-600",
                  {
                    "bg-primary text-default-100 hover:bg-primary hover:!text-default-100":
                      active,
                  },
                )}
                size="icon"
              >
                <Icon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent
        side="right"
        sideOffset={20}
        align="start"
        className="min-w-[180px] space-y-1.5 border-sidebar bg-secondary"
      >
        <DropdownMenuLabel className="max-w-[190px] truncate text-default-700">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuGroup>
          {submenus.map(({ href, label, icon, active, children }, index) =>
            children?.length === 0 ? (
              <DropdownMenuItem
                key={index}
                asChild
                className={cn(
                  "mb-0.5 focus:bg-background focus:text-default-700",
                  {
                    "bg-background text-default-700": active,
                  },
                )}
              >
                <Link className="flex-flex cursor-pointer gap-3" href={href}>
                  <p className="max-w-[180px] truncate">{label} </p>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>
                  <span>{label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <ScrollArea className="h-[200px]">
                      {children?.map(({ href, label, active }, index) => (
                        <DropdownMenuItem key={`nested-index-${index}`}>
                          <Link href={href}>{label} </Link>
                        </DropdownMenuItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(CollapseMenuButton);
