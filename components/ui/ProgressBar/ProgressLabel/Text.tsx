import React from "react";

import { cn } from "@/lib/utils";

interface ITextProps {
  children?: React.ReactNode;
  className?: string;
}

function Text({ children, className }: ITextProps) {
  return (
    <p
      className={cn(
        "text-sm font-normal leading-5 text-default-900",
        className,
      )}
    >
      {children}
    </p>
  );
}

export default Text;
