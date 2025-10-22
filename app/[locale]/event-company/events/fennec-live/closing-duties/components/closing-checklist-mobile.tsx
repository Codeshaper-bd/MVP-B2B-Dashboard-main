"use client";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";

type ChecklistItem = {
  stepIndex: number;
  label: string;
  isSpecial?: boolean;
};

type Props = {
  currentStep: number;
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { stepIndex: 1, label: "Lock Event", isSpecial: true },
  { stepIndex: 2, label: "Cash Out" },
  { stepIndex: 3, label: "Coatcheck" },
  { stepIndex: 4, label: "Barback" },
  { stepIndex: 5, label: "Bartender" },
  { stepIndex: 6, label: "Inventory Barback" },
  { stepIndex: 7, label: "Pending Employee Completion", isSpecial: true },
];

function CheckboxWrapper({
  currentStep,
  stepIndex,
  children,
}: {
  currentStep: number;
  stepIndex: number;
  children: React.ReactNode;
}) {
  const isActive = currentStep + 1 === stepIndex;

  return isActive ? (
    <div className="-mt-2 flex size-8 items-center justify-center rounded-[10px] bg-default ring-2 ring-primary/30 ring-offset-1 ring-offset-primary">
      {children}
    </div>
  ) : (
    <>{children}</>
  );
}

function ClosingChecklistMobile({ currentStep }: Props) {
  const getSectionItems = (start: number, end: number) =>
    CHECKLIST_ITEMS.slice(start, end);

  return (
    <div className="flex items-center justify-center gap-8 overflow-x-scroll rounded-3xl border-[0.063rem] border-default-100 py-[3.75rem] lg:hidden">
      {/* Left section */}
      <div className="relative flex w-full gap-8 px-5">
        {getSectionItems(0, 7).map((item) => (
          <div
            key={item.stepIndex}
            className="flex flex-col items-center gap-3"
          >
            <CheckboxWrapper
              currentStep={currentStep}
              stepIndex={item.stepIndex}
            >
              <Checkbox
                color={item.isSpecial ? undefined : "purple"}
                selected={currentStep >= item.stepIndex}
                className="z-10 size-6 rounded-[0.45rem] border-[0.075rem] border-default-200 bg-default"
              />
            </CheckboxWrapper>
            <p
              className={`line-clamp-2 text-center font-medium ${item.isSpecial ? "text-white" : "text-primary"}`}
            >
              {item.label}
            </p>
            <div className="absolute left-[30px] top-3 w-[585px] rounded-t-3xl border-r-[2px] border-t-[2px] border-dashed border-default-200 md:w-[800px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClosingChecklistMobile;
