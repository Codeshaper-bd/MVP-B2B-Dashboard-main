import React from "react";

import { cn } from "@/lib/utils";

interface IconBorderProps {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "40" | "48";
  color?: "border-default-200" | "border-default-100";
}

function IconBorder({
  className,
  children,
  size,
  color = "border-default-200",
}: IconBorderProps) {
  return (
    <div
      className={cn(
        "relative flex size-8 items-center justify-center rounded-md border border-default-100 bg-transparent shadow-[0px_1px_2px_0px_#1018280D]",
        {
          "size-10": size === "40",
          "size-12": size === "48",
        },
        {
          "border-default-200": color === "border-default-200",
          "border-default-100": color === "border-default-100",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

export default IconBorder;
