"use client";
import React from "react";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

function HeaderContent({ children }: { children: React.ReactNode }) {
  const [config] = useConfig();
  const headerTheme =
    config.headerTheme !== "light" && config.headerTheme !== "transparent"
      ? ` dark theme-${config.headerTheme}`
      : `theme-${config.headerTheme}`;
  if (config.sidebar === "two-column") {
    return (
      <header
        className={cn("top-0 z-50", config.navbar, {
          "has-sticky-header sticky top-6 px-6": config.navbar === "floating",
        })}
      >
        <div
          className={cn(
            "relative flex flex-none items-center justify-between bg-header px-[15px] py-3 backdrop-blur-lg md:px-6 xl:ms-[300px]",
            headerTheme,
            {
              "xl:ms-[110px]": config.subMenu || !config.hasSubMenu,
              "border-b":
                config.skin === "bordered" && config.layout !== "semi-box",
              "xl:ms-0": config.menuHidden || config.layout === "horizontal",
              border:
                config.skin === "bordered" && config.layout === "semi-box",
              "shadow-base": config.skin === "default",
              "rounded-md": config.navbar === "floating",
            },
          )}
        >
          {children}
        </div>
      </header>
    );
  }

  return (
    <header className="default top-0 z-50">
      <div className="theme-light relative flex flex-none items-center justify-between px-[15px] py-3 shadow-base md:px-6 xl:ms-[72px]">
        {children}
      </div>
    </header>
  );
}

export default HeaderContent;
