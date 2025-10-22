"use client";

import { ChevronRight } from "lucide-react";
import { memo } from "react";

import { useConfig, type TUseConfigReturnType } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const handleToggleCollapsed =
  ([config, setConfig]: TUseConfigReturnType) =>
  () => {
    setConfig({ ...config, collapsed: !config.collapsed });
  };

function SidebarHoverToggle() {
  // const [hoverConfig, setHoverConfig] = useMenuHoverConfig();
  const useConfigProps = useConfig();
  const [config] = useConfigProps;

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  if (config.sidebar !== "classic" || !isDesktop) {
    return null;
  }

  return (
    <div
      onClick={handleToggleCollapsed(useConfigProps)}
      className={cn(
        "mt-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 border-solid border-border-primary bg-secondary hover:border-primary/30",
        config.collapsed ? "absolute -right-3" : "",
      )}
    >
      <ChevronRight
        className={cn("h-4 w-4", {
          "rotate-180": !config.collapsed,
        })}
      />
    </div>
  );
}

export default memo(SidebarHoverToggle);
