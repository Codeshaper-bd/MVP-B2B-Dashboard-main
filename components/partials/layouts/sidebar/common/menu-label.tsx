"use client";
import { memo } from "react";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

function MenuLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const [config] = useConfig();
  if (config.sidebar === "compact") {
    return null;
  }
  return (
    <span
      className={cn(
        "block max-w-[248px] truncate pb-3 pt-5 text-xs font-semibold uppercase text-default-600",
        className,
      )}
    >
      {label}
    </span>
  );
}

export default memo(MenuLabel);
