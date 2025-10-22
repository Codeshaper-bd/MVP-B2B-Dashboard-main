"use client";
import type { CellContext } from "@tanstack/react-table";

import type { TChallenge } from "@/store/api/challenges/challenges.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function DescriptionTooltip({
  row: { original },
}: CellContext<TChallenge, unknown>) {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-[235px]" asChild>
            <p className="line-clamp-2 cursor-pointer text-sm font-normal normal-case leading-[18px] text-default-600">
              {original?.description}
            </p>
          </TooltipTrigger>

          <TooltipContent
            color="default"
            className="relative mb-1 max-w-[400px] overflow-visible bg-default-100 px-3 py-2"
          >
            <div>
              <p className="text-wrap text-center text-xs font-medium normal-case leading-[18px] text-default-foreground">
                {original?.description}
              </p>

              <div className="absolute left-1/2 top-full z-[999] h-0 w-0 -translate-x-1/2 transform border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-default-100"></div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default DescriptionTooltip;
