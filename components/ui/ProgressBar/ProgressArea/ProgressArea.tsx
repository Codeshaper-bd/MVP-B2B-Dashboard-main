import { cn } from "@/lib/utils";

import Progress from "./Progress";

interface IProgressAreaProps {
  children?: React.ReactNode;
  className?: string;
}

function ProgressArea({ children, className }: IProgressAreaProps) {
  return (
    <div
      className={cn(
        "h-6 min-h-1 w-full overflow-hidden rounded-lg bg-[#333741]",
        className,
      )}
    >
      {children}
    </div>
  );
}

ProgressArea.Progress = Progress;

export default ProgressArea;
