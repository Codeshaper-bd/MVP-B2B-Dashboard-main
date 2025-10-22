"use client";
import React, { forwardRef, memo } from "react";

import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";
import { Link } from "@/i18n/routing";
import type { TMenuIcon } from "@/lib/menus/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  id: string;
  href: string;
  label: string;
  icon: TMenuIcon;
  active: boolean;
  collapsed: boolean;
  handleCloseSidebarDrawer?: () => void;
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      href,
      label,
      icon: Icon,
      active,
      id,
      collapsed,
      handleCloseSidebarDrawer,
    },
    ref,
  ) => {
    const [hoverConfig] = useMenuHoverConfig();
    const { hovered } = hoverConfig;
    const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();

    return (
      <Button
        ref={ref}
        onClick={() => {
          setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false });
          handleCloseSidebarDrawer?.();
        }}
        fullWidth
        color="secondary"
        className={cn(
          "h-auto justify-start border-transparent bg-transparent py-2.5 text-start text-base font-semibold text-default-700 md:px-3",
          {
            "bg-default-100 !text-primary": active,
            "h-12 w-12 justify-center bg-default !text-default-600 hover:bg-primary hover:!text-default-100":
              collapsed && !hovered,
            "bg-primary !text-default-100 hover:bg-primary hover:text-default-100 focus:bg-primary focus:!text-default-100":
              collapsed && !hovered && active,
          },
        )}
        asChild
      >
        <Link href={href} className="flex items-center gap-4">
          <Icon className="h-6 w-6" />
          {(!collapsed || hovered) && (
            <span className="block max-w-[200px] truncate">{label} </span>
          )}
        </Link>
      </Button>
    );
  },
);

MenuItem.displayName = "MenuItem";

export default memo(MenuItem);
