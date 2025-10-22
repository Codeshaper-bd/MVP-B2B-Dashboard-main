"use client";

import { memo } from "react";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

import SidebarMenu from "./menu";

function LayoutSidebar({ className }: { className?: string }) {
  const [config] = useConfig();

  return (
    <aside
      className={cn(
        "theme-light fixed start-0 z-50 hidden h-full w-[280px] bg-sidebar shadow-base xl:block",
        {
          "flex w-[100px] flex-col justify-center": config.collapsed,
        },
        className,
      )}
    >
      <div className="relative flex h-full flex-col">
        <SidebarMenu />
      </div>
    </aside>
  );
}

export default memo(LayoutSidebar);
