"use client";
import { cn } from "@/lib/utils";

import Text from "./Text";
import { useProgressBar } from "../ProgressBarContext";

interface IProgressLabelProps {
  className?: string;
  textClassName?: string;
}

function ProgressLabel({ className, textClassName }: IProgressLabelProps) {
  const { value } = useProgressBar();

  return (
    <div
      className={cn(
        "mt-4 flex w-full flex-1 items-center justify-between transition-all duration-1000 ease-linear",
        className,
      )}
      style={{ width: `${value ?? 0}%` }}
    >
      <Text className={textClassName}>0</Text>

      {value > 4 && <Text className={textClassName}>{value}%</Text>}
    </div>
  );
}

ProgressLabel.Text = Text;

export default ProgressLabel;
