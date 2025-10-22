import React from "react";

import { cn } from "@/lib/utils";

import IconBorder from "../icon-border";

interface IContentProps {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className }: IContentProps) {
  return (
    <IconBorder
      size="48"
      className={cn("!relative !z-0 border-[#333741]", className)}
    >
      {children}
    </IconBorder>
  );
}

export default Content;
