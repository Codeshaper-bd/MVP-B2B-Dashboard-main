import React, { memo, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";
import { ChevronDownIcon as ChevronDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { TDiscountTypeDropdownProps, THandleSelect } from "./types";
import { options } from "./values";

function DiscountTypeDropdown({
  value,
  onChange,
  disabled = false,
  readonly = false,
  className,
  align = "end",
}: TDiscountTypeDropdownProps) {
  const selectedSymbol = useMemo(
    () => options?.find((option) => option.value === value)?.symbol ?? "?",
    [value],
  );

  const handleSelect: THandleSelect = useCallback(
    ({ selectedValue, value, onChange }) =>
      () => {
        if (selectedValue !== value) {
          onChange?.(selectedValue);
        }
      },
    [],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          type="button"
          disabled={disabled}
          className={cn(
            "h-11 min-w-[72px] max-w-[180px] select-none rounded-l-none text-base hover:border-border disabled:cursor-not-allowed [&[data-state=open]>svg]:rotate-180",
            className,
            readonly ? "pointer-events-none opacity-50" : "",
          )}
        >
          {selectedSymbol}
          <ChevronDownIcon className="ms-2 h-4 w-4 transition-all duration-300" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={handleSelect({
              selectedValue: option.value,
              value,
              onChange,
            })}
            className={cn(
              "cursor-pointer",
              value === option.value
                ? "bg-primary text-primary-foreground"
                : "",
              readonly ? "pointer-events-none opacity-50" : "",
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(DiscountTypeDropdown);
