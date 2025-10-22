import { TooltipArrow, TooltipContent } from "@/components/ui/tooltip";

interface IProgressTooltipContentProps {
  children?: React.ReactNode;
  className?: string;
}

function ProgressTooltipContent({
  children = "Total Percentage of People who have attempted a challenge",
  className,
}: IProgressTooltipContentProps) {
  return (
    <TooltipContent
    // className={cn(
    //   "bg-default-100# w-[210px] text-center px-4 py-2",
    //   "text-xs font-medium leading-[18px] text-default-1000#",
    //   className
    // )}
    >
      <TooltipArrow className="h-1.5 w-4 fill-default-100" />
      {children}
    </TooltipContent>
  );
}

export default ProgressTooltipContent;
