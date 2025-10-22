import React, { memo } from "react";

import { cn } from "@/lib/utils";
import IconBorder from "@/components/ui/icon-border";
import { Separator } from "@/components/ui/separator";

interface StepItemProps {
  index: number;
  currentStep: number;
  steps: {
    label: string;
    icon: React.ReactNode;
  }[];
  step: {
    label: string;
    icon: React.ReactNode;
  };
  className?: string;
  onStepClick?: (stepIndex: number) => void;
}
function StepItem({
  index,
  currentStep,
  steps,
  step,
  className,
  onStepClick,
}: StepItemProps) {
  const isActive = index === currentStep;
  const isCompleted = index < currentStep;
  const isLastStep = index === (steps?.length ?? 0) - 1;

  const handleClick = () => {
    if (onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-w-[100px] flex-1 flex-col items-center",
        className,
      )}
    >
      <Separator
        className={cn("absolute start-1/2 top-5 md:top-8", {
          hidden: isLastStep,
          "bg-primary": isCompleted,
        })}
      />
      <div
        className={cn("flex items-center", {
          "text-primary": isActive || isCompleted,
          "text-default-200": !isActive && !isCompleted,
        })}
      >
        <div
          className={cn({
            "cursor-pointer": onStepClick,
          })}
          onClick={handleClick}
        >
          <IconBorder className="relative h-10 w-10 flex-none rounded-xl bg-background md:h-14 md:w-14">
            {step.icon}
          </IconBorder>
        </div>
      </div>
      <span
        className={cn(
          "mt-4 block whitespace-nowrap text-base font-semibold text-default-700",
          {
            "text-primary": isActive || isCompleted,
          },
        )}
      >
        {step.label}
      </span>
    </div>
  );
}

export default memo(StepItem);
