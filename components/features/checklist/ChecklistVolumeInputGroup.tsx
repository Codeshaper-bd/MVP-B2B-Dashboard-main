"use client";
import React, { Fragment, useState } from "react";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import MinusIcon2 from "@/components/icons/MinusIcon2";
import PlusIcon from "@/components/icons/PlusIcon";
import SelectInput from "@/components/SelectInput";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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

function ChecklistVolumeInputGroup({
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
        {!showInconsistency && (
          <SelectInput
            value="oz"
            className="border-none"
            options={[{ label: "Oz", value: "oz" }]}
          />
        )}
      </div>
      <div>
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
      </div>
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
    </Fragment>
  );
}

export default ChecklistVolumeInputGroup;
