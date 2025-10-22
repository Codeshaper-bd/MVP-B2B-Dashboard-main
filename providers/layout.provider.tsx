"use client";
import { memo } from "react";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [config] = useConfig();

  return (
    <div
      className={cn("flex min-h-svh w-full flex-col bg-default", {
        "bg-transparent": config.skin === "bordered",
        "xl:px-20": config.layout === "semi-box",
        "p-6 lg:p-10": config.layout === "compact",
      })}
    >
      {children}
    </div>
  );
}

export default memo(LayoutProvider);
