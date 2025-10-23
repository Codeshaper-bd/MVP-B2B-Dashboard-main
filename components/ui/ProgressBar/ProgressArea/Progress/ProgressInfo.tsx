import React from "react";

import { cn } from "@/lib/utils";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { TooltipTrigger } from "@/components/ui/tooltip";

interface IProgressInfoProps {
  children?: React.ReactNode;
  className?: string;
}

function ProgressInfo({
  children = <InfoIcon className="size-[11.67px] text-inherit" />,
  className,
}: IProgressInfoProps) {
  return (
    <div
      className={cn(
        "absolute bottom-1/2 right-0 top-1/2 flex h-full w-fit -translate-x-1/2 -translate-y-1/2 transform cursor-pointer flex-col justify-center text-[#053321]",
        className,
      )}
    >
      <TooltipTrigger className="m-0 bg-inherit p-0">{children}</TooltipTrigger>
    </div>
  );
}

export default ProgressInfo;
