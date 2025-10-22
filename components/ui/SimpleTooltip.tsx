import React from "react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ISimpleTooltipProps {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function SimpleTooltip({
  triggerContent,
  children,
  className,
}: ISimpleTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="m-0 h-fit w-fit bg-transparent p-0">
          {triggerContent}
        </TooltipTrigger>

        <TooltipContent
          className={cn(
            "w-full max-w-[210px] bg-default-100 px-3 py-2 text-center",
            "text-wrap break-words rounded-lg text-xs font-medium leading-[18px] text-default-1000",
            className,
          )}
        >
          <TooltipArrow className="h-1.5 w-4 fill-default-100" />

          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SimpleTooltip;
