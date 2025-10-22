import React, { memo } from "react";

import { cn } from "@/lib/utils";

interface IFooterContainerProps {
  children?: React.ReactNode;
  className?: string;
}

function FooterContainer({ children, className }: IFooterContainerProps) {
  return (
    <div className={cn("border-t border-t-default-100", className)}>
      {children}
    </div>
  );
}

export default memo(FooterContainer);
