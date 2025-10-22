"use client";
import { cn } from "@/lib/utils";

import ProgressInfo from "./ProgressInfo";
import { useProgressBar } from "../../ProgressBarContext";

interface IProgressProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function Progress({ className, style, children }: IProgressProps) {
  const { value } = useProgressBar();

  return (
    <div
      className={cn(
        "relative h-full w-0 rounded-lg bg-[#47CD89] transition-all duration-1000 ease-linear",
        className,
      )}
      style={{ width: `${value}%`, ...style }}
    >
      {children}
    </div>
  );
}

Progress.ProgressInfo = ProgressInfo;

export default Progress;
