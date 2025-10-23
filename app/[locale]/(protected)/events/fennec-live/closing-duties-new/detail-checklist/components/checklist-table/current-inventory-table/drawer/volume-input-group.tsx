"use client";
import React, { Fragment, useState } from "react";

import ChecklistStatusAlert from "@/components/features/checklist/ChecklistStatusAlert";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import DrawStraightLinePenIcon from "@/components/icons/DrawStraightLinePenIcon";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type VolumeOption = {
  value: string;
  label: string;
  quantity: number;
  size: number;
};

type VolumeInputGroupProps = {
  title: string;
  showInconsistency?: boolean;
  inputClassName?: string;
};

function VolumeInputGroup({
  title,
  showInconsistency = false,
  inputClassName = "",
}: VolumeInputGroupProps) {
  const [volumeOption, setVolumeOption] = useState<string>("OZ");
  const volumeOptions = [
    { value: "OZ", label: "OZ", quantity: 120, size: 26 },
    { value: "OZ", label: "OZ", quantity: 80, size: 40 },
  ];
  return (
    <Fragment>
      <div className="mt-6 flex items-center justify-between gap-2">
        <h3>{title}</h3>
      </div>
      <div className="my-4 flex items-center gap-1 rounded-[8px] border border-default-200 px-3">
        <DrawStraightLinePenIcon className="size-5" />
        {/* can make a component for this part when api is ready */}
        <div className="relative flex flex-1 items-center justify-center gap-1 py-2">
          {volumeOptions.map((option, idx) => (
            <DropdownMenu key={idx}>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`absolute ${showInconsistency ? "top-1/3" : "top-1/2"} -translate-y-1/2 bg-default px-1 md:px-2 [&[data-state=open]>svg]:rotate-180`}
                  variant="ghost"
                  size="sm"
                >
                  <div className="flex h-full items-center">
                    {option.size} {option.label}
                  </div>
                  <ChevronDownIcon className="ms-2 h-4 w-4 transition-all duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setVolumeOption(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
        <div className="relative h-10 w-[98px] border-l border-default-200 px-3.5 py-2">
          {volumeOptions.map((option, idx) => (
            <DropdownMenu key={idx}>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`absolute end-1.5 ${showInconsistency ? "top-1/3" : "top-1/2"} -translate-y-1/2 bg-default px-1 md:px-2 [&[data-state=open]>svg]:rotate-180`}
                  variant="ghost"
                  size="sm"
                >
                  <div className="flex h-full items-center">
                    {option.size} {option.label}
                  </div>
                  <ChevronDownIcon className="ms-2 h-4 w-4 transition-all duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setVolumeOption(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      </div>
      {/* <div>
        {volumeOptions.map((option, idx) => (
          <div className="relative my-4" key={idx}>
            <Input
              leftContent={
                <div className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-default-1000">
                  <MinusIcon2 className="size-5 text-default" />
                </div>
              }
              rightContent={
                <div className="me-[70px] flex size-6 cursor-pointer items-center justify-center rounded-full bg-default-1000">
                  <PlusIcon className="size-5 text-default" />
                </div>
              }
              placeholder=""
              value={option.quantity}
              className={`ps-10 text-center ${inputClassName}`}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={`absolute end-1.5 ${showInconsistency ? "top-1/3" : "top-1/2"} -translate-y-1/2 px-1 md:px-2 [&[data-state=open]>svg]:rotate-180`}
                  variant="ghost"
                  size="sm"
                >
                  <div className="flex h-full items-center">
                    {option.size} {option.label}
                  </div>
                  <ChevronDownIcon className="ms-2 h-4 w-4 transition-all duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setVolumeOption(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {showInconsistency && (
              <div className="mt-1 flex items-center gap-2 text-[#F97066]">
                <InfoIcon className="size-4" />
                <span>Inconsistency</span>
              </div>
            )}
          </div>
        ))}
      </div> */}
      {!showInconsistency && (
        <div className="flex w-full items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" className="gap-1" color="secondary">
                <PlusIcon className="size-5" /> Add
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="max-w-[130px] bg-secondary text-default-700"
              align="start"
            >
              <div className="cursor-pointer px-1.5 py-0.5">26 OZ</div>
              <div className="cursor-pointer px-1.5 py-0.5">40 OZ</div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      <div className="my-6 space-y-5 text-xs font-medium text-primary">
        <p>Submission Volume Total: 20 Oz</p>
        <p>Predicted Volume Total from POS Sales: 58 Oz</p>
      </div>
      <div className="space-y-6">
        <ChecklistStatusAlert
          type="negative"
          title="Inconsistencies Detected"
          message="Difference is outside the Tolerance Range : ± 5%"
        />
        <ChecklistStatusAlert
          type="positive"
          title="Difference is within the Tolerance Range : ± 5%"
        />
      </div>
    </Fragment>
  );
}

export default VolumeInputGroup;
