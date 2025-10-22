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

function ClosingChecklist({ currentStep }: Props) {
  const getSectionItems = (start: number, end: number) =>
    CHECKLIST_ITEMS.slice(start, end);

  return (
    <div className="hidden items-center justify-center gap-8 rounded-3xl border-[0.063rem] border-default-100 py-[3.75rem] lg:flex">
      {/* Left section */}
      <div className="relative flex gap-8">
        {getSectionItems(0, 2).map((item) => (
          <div
            key={item.stepIndex}
            className="z-10 flex flex-col items-center gap-3"
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
              className={`font-medium ${item.isSpecial ? "text-white" : "text-primary"}`}
            >
              {item.label}
            </p>
          </div>
        ))}
        <div className="absolute -top-[100px] left-[198px] h-[112px] w-[20px] rounded-br-3xl border-b-[2px] border-r-[2px] border-dashed border-default-200" />
        <div className="absolute left-[30px] top-3 h-[130px] w-[190px] rounded-t-3xl border-r-[2px] border-t-[2px] border-dashed border-default-200" />
      </div>

      {/* Mid section */}
      <div className="relative -mt-5 space-y-8">
        <div className="absolute top-10 h-[76%] w-full rounded-3xl border-b-[2px] border-t-[2px] border-dashed border-default-200" />
        <div className="absolute top-[100px] h-[25%] w-full rounded-3xl border-b-[2px] border-t-[2px] border-dashed border-default-200" />
        {getSectionItems(2, 6).map((item) => (
          <div
            key={item.stepIndex}
            className="flex flex-col items-center gap-3"
          >
            <CheckboxWrapper
              currentStep={currentStep}
              stepIndex={item.stepIndex}
            >
              <Checkbox
                color="purple"
                selected={currentStep >= item.stepIndex}
                className="z-10 size-6 rounded-[0.45rem] border-[0.075rem] border-default-200 bg-default"
              />
            </CheckboxWrapper>
            <p className="font-medium text-white">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Right section */}
      <div className="relative">
        <div className="absolute -left-[36px] -top-[88px] h-[100px] w-[20px] rounded-bl-3xl border-b-[2px] border-l-[2px] border-dashed border-default-200" />
        <div className="absolute -left-[34px] top-3 h-[140px] w-[100px] rounded-tl-3xl border-l-[2px] border-t-[2px] border-dashed border-default-200" />
        {getSectionItems(6, 7).map((item) => (
          <div
            key={item.stepIndex}
            className="flex flex-col items-center gap-3"
          >
            <CheckboxWrapper
              currentStep={currentStep}
              stepIndex={item.stepIndex}
            >
              <Checkbox
                color="purple"
                selected={currentStep >= item.stepIndex}
                className="size-6 rounded-[0.45rem] border-[0.075rem] border-default-200"
              />
            </CheckboxWrapper>
            <p className="max-w-[16ch] text-center font-medium text-primary">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClosingChecklist;
