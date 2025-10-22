"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import DollarIcon from "@/components/icons/DollarIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CollapsibleSectionProps {
  title: string;
  label: string;
  inputId: string;
  name: string;
  placeholder?: string;
}

function CategoryCollapsibleSection({
  title,
  label,
  inputId,
  name,
  placeholder = "Amount",
}: CollapsibleSectionProps) {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(true);

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
      <CollapsibleContent className="space-y-2">
        <div className="space-y-1.5">
          <Label htmlFor={inputId}>{label}</Label>
          <Input
            id={inputId}
            type="number"
            min={0}
            step={1}
            isPositiveOnly
            placeholder={placeholder}
            leftContent={<DollarIcon className="size-5" />}
            // {...register(name)}
            {...(register ? register(name) : {})}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default CategoryCollapsibleSection;
