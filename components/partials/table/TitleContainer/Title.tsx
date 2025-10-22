"use client";
import React, { memo } from "react";

import { cn } from "@/lib/utils";

interface ITitleProps {
  children?: React.ReactNode;
  className?: string;
}

function Title({ children, className }: ITitleProps) {
  return (
    <h4 className={cn("flex-1 text-lg font-semibold leading-7", className)}>
      {children}
    </h4>
  );
}

export default memo(Title);
