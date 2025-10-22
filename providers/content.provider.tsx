"use client";
import React, { memo } from "react";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

function LayoutContentProvider({ children }: { children: React.ReactNode }) {
  const [config] = useConfig();

  return (
    <main
      className={cn(
        "flex flex-1 flex-col px-4 pb-10 md:mb-0 md:px-8 xl:ms-[280px]",
        {
          "xl:ms-[100px]": config.collapsed,
        },
      )}
    >
      {children}
    </main>
  );
}

export default memo(LayoutContentProvider);
