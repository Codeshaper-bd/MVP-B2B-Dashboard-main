"use client";
import { type IconifyIcon } from "@iconify/react/dist/iconify.js";
import { ChevronDown } from "lucide-react";
import { memo, useState } from "react";

import { useMobileMenuConfig } from "@/hooks/use-mobile-menu";
import type { SubChildren } from "@/lib/menus/types";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { Link, usePathname } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapseMenuButtonProps {
  icon?: string | IconifyIcon;
  label: string;
  active: boolean;
  submenus: SubChildren[] | TNullish;
}

function MultiCollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const isSubmenuActive =
    submenus?.some(
      (submenu) => submenu.active || pathname.startsWith(submenu.href),
    ) ?? false;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
  const [mobileMenuConfig, setMobileMenuConfig] = useMobileMenuConfig();
  return (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="mb-2 w-full last:mb-0"
    >
      <CollapsibleTrigger asChild>
        <div className="group flex items-center first:mt-3 [&[data-state=open]>button>div>div>svg]:rotate-180">
          <Button
            color="secondary"
            variant="ghost"
            className="h-auto w-full justify-start px-5 text-sm font-normal capitalize hover:bg-transparent hover:ring-offset-0 md:px-5"
            fullWidth
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <p className={cn("max-w-[150px] truncate")}>{label}</p>
              </div>
              <div
                className={cn(
                  "inline-flex h-5 w-5 items-center justify-center whitespace-nowrap rounded-full bg-menu-arrow text-menu-menu-foreground transition-all duration-300 group-hover:bg-menu-arrow-active",
                  {
                    "bg-menu-arrow-active": active,
                  },
                )}
              >
                <ChevronDown
                  size={16}
                  className="transition-transform duration-200"
                />
              </div>
            </div>
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
        {submenus?.map(({ href, label, active }, index) => (
          <Button
            key={index}
            onClick={() =>
              setMobileMenuConfig({ ...mobileMenuConfig, isOpen: false })
            }
            color="secondary"
            variant="ghost"
            className="mb-1.5 h-auto w-full justify-start text-[13px] font-normal first:mt-3 hover:bg-transparent"
            asChild
          >
            <Link href={href}>
              <p className={cn("max-w-[170px] truncate")}>{label}</p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default memo(MultiCollapseMenuButton);
