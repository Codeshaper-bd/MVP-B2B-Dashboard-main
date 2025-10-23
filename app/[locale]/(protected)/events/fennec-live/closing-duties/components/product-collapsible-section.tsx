"use client";
import Image from "next/image";
import React, { useState } from "react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { DollarIcon as DollarIcon } from "@/components/icons";
import { InfoIcon as InfoIcon } from "@/components/icons";
import { MinusIcon as MinusIcon } from "@/components/icons";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductActionCollapsibleSectionProps {
  title: string;
  inputId: string;
  register: UseFormRegister<FieldValues>;
  tooltipContent: string;
  submitButtonLabel: string;
  productOptions: Array<{
    value: string;
    label: string;
    imageSrc: string;
  }>;
}

function ProductActionCollapsibleSection({
  title,
  inputId,
  register,
  tooltipContent,
  submitButtonLabel,
  productOptions,
}: ProductActionCollapsibleSectionProps) {
  const [productState, setProductState] = useState<string | null>();
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState<number>(1);

  const handleQuantityChange = (delta: number) => {
    setCount((prev) => Math.max(0, Math.min(10, prev + delta)));
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-5"
    >
      <div className="flex items-center justify-between space-x-4">
        <CardTitle className="text-[16px] font-semibold leading-7 text-default-900">
          {title}
        </CardTitle>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {isOpen ? (
              <MinusIcon className="size-4" />
            ) : (
              <PlusIcon className="size-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex h-11 max-w-[95px] flex-1 rounded-[8px] border text-sm font-normal delay-150 ease-in-out md:max-w-full rtl:divide-x-reverse">
              <button
                className="px-2 disabled:cursor-not-allowed md:px-3"
                onClick={() => handleQuantityChange(-1)}
                disabled={count === 0}
              >
                <MinusIcon className="size-5 rounded-full bg-white p-0.5 text-default" />
              </button>
              <span className="flex flex-1 items-center justify-center text-center text-xs text-default-700">
                {count}
              </span>
              <button
                disabled={count === 10}
                onClick={() => handleQuantityChange(1)}
                className="px-2 disabled:cursor-not-allowed md:px-3"
              >
                <PlusIcon className="size-5 rounded-full bg-white text-default" />
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="cost">Cost</Label>
            <Input
              id={`${inputId}-cost`}
              type="number"
              min={0}
              step={1}
              isPositiveOnly
              placeholder="0"
              className="bg-default-50"
              leftContent={<DollarIcon className="size-5" />}
              {...register("cost")}
            />
          </div>
        </div>

        <div>
          <Select
            value={productState ?? undefined}
            onValueChange={setProductState}
          >
            <SelectTrigger className="w-full bg-default">
              <SelectValue
                placeholder="Select Product"
                className="text-primary"
              />
            </SelectTrigger>
            <SelectContent className="bg-default">
              {productOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex gap-3">
                    <Image
                      src={option.imageSrc}
                      alt={option.label}
                      width={32}
                      height={24}
                      className="rounded-[3px]"
                    />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-end gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="size-5 cursor-pointer text-default-600" />
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow className="w-4 fill-default" />
                <p>{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button color="primary" type="submit">
            <ButtonLoadingContent
              isLoading={false}
              actionContent={submitButtonLabel}
            />
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default ProductActionCollapsibleSection;
