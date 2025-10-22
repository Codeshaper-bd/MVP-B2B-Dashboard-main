import { useMemo } from "react";

import useGetLoggedInUser from "@/hooks/feature/useGetLoggedInUser";
import { useConfig } from "@/hooks/use-config";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";
import { isEventCompanyAdminOrCoAdmin, isPromoter } from "@/lib/user/checkAuth";
import { cn } from "@/lib/utils";
import SupportIcon from "@/components/icons/sidebar/SupportIcon";
import { Link, usePathname } from "@/components/navigation";
import { Button } from "@/components/ui/button";

import type { TSidebarMenuProps } from "./menu";
function StaticFooterMenu({
  type = "default",
  className,
  handleCloseSidebarDrawer,
}: TSidebarMenuProps) {
  const pathname = usePathname();
  const [config] = useConfig();
  const collapsed = type === "default" ? config.collapsed : false;
  const [hoverConfig] = useMenuHoverConfig();
  const { hovered } = hoverConfig;

  const loggedInUser = useGetLoggedInUser();

  const isPromoterUser = isPromoter(loggedInUser);
  const isEventCompanyUser = isEventCompanyAdminOrCoAdmin(loggedInUser);

  const fennecLivePath = useMemo(() => {
    if (isEventCompanyUser) {
      return "/event-company/events/fennec-live";
    }
    return "/events/fennec-live";
  }, [isEventCompanyUser]);

  const supportPath = useMemo(() => {
    if (isEventCompanyUser) {
      return "/event-company/support";
    } else if (isPromoterUser) {
      return "#";
    }
    return "/support";
  }, [isEventCompanyUser, isPromoterUser]);

  return (
    <div className={cn("flex flex-col items-center space-y-1", className)}>
      <Button
        asChild
        color="secondary"
        className={cn(
          "h-12 justify-start border border-default-200 bg-transparent text-default-1000 hover:border-border-primary hover:bg-transparent hover:text-default-700 md:px-4",
          {
            "h-12 w-12 justify-center p-0 md:px-0": collapsed && !hovered,
            "border-transparent bg-default-100": pathname.endsWith(
              "/events/fennec-live",
            ),
            "invisible opacity-0": isPromoterUser,
          },
        )}
        fullWidth
        onClick={() => handleCloseSidebarDrawer?.()}
      >
        <Link href={fennecLivePath}>
          <span className="relative block h-2 w-2 rounded-full bg-destructive-secondary before:absolute before:start-0 before:top-0 before:h-full before:w-full before:animate-ping before:rounded-full before:border before:bg-destructive"></span>
          <span
            className={cn("ms-2.5 block", {
              hidden: collapsed && !hovered,
            })}
          >
            Fennec Live
          </span>
        </Link>
      </Button>

      <Button
        asChild
        color="secondary"
        className={cn(
          "h-11 justify-start border-0 bg-transparent text-base font-semibold text-default-700 hover:bg-default-100 hover:text-default-700 md:px-3.5",
          {
            "h-12 w-12 justify-center p-0 md:px-0": collapsed && !hovered,
            "bg-default-100 !text-primary [&_svg]:text-primary":
              pathname.endsWith("/support"),
            "invisible opacity-0": isPromoterUser,
          },
        )}
        onClick={() => handleCloseSidebarDrawer?.()}
        fullWidth
      >
        <Link href={supportPath}>
          <SupportIcon className="h-6 w-6 text-default-600" />
          <span
            className={cn("ms-3", {
              hidden: collapsed && !hovered,
            })}
          >
            Support
          </span>
        </Link>
      </Button>
    </div>
  );
}

export default StaticFooterMenu;
