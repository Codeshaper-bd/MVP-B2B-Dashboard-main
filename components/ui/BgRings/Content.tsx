import React from "react";

import { cn } from "@/lib/utils";

interface IContentProps {
  children: React.ReactNode;
  className?: string;
}

function Content({ children, className }: IContentProps) {
  return <div className={cn("!z-0", className)}>{children}</div>;
}

export default Content;
