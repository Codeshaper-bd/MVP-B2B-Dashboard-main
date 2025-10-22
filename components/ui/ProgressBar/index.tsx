import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";

import ProgressArea from "./ProgressArea/ProgressArea";
import ProgressBarProvider from "./ProgressBarContext";
import ProgressLabel from "./ProgressLabel";
import ProgressTooltipContent from "./ProgressTooltipContent";

interface IProgressBarProps {
  children?: React.ReactNode;
  value?: number;
}

function ProgressBar({ children, value }: IProgressBarProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <ProgressBarProvider value={value}>
          <div className="h-fit w-full overflow-hidden">{children}</div>
        </ProgressBarProvider>
      </Tooltip>
    </TooltipProvider>
  );
}

ProgressBar.ProgressArea = ProgressArea;
ProgressBar.ProgressLabel = ProgressLabel;
ProgressBar.ProgressTooltipContent = ProgressTooltipContent;

export default ProgressBar;
