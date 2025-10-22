import React, { memo } from "react";

import { cn } from "@/lib/utils";
import StepItem from "@/components/ui/stepper";

type StepItemProps = {
  steps: {
    label: string;
    icon: React.ReactNode;
  }[];
  currentStep: number;
  className?: string;
  onStepClick?: (stepIndex: number) => void;
};
function Steps({ steps, currentStep, className, onStepClick }: StepItemProps) {
  return (
    <div
      className={cn(
        "custom-scrollbar flex flex-row overflow-x-auto md:justify-center",
        className,
      )}
    >
      {steps?.map((step, index: number) => (
        <StepItem
          key={index}
          index={index}
          currentStep={currentStep}
          steps={steps}
          step={step}
          className="min-w-[160px]"
          onStepClick={onStepClick}
        />
      ))}
    </div>
  );
}

export default memo(Steps);
