"use client";
import { useCallback } from "react";

import { cn } from "@/lib/utils";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button, type ButtonProps } from "@/components/ui/button";

import XIcon from "./icons/X";

interface FilterContentProps {
  open: boolean;
  onClick?: (value: boolean) => void;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  triggerContent?: React.ReactNode;
  className?: string;
  targetButtonProps?: Omit<ButtonProps, "onClick">;
  triggerButtonClassName?: string;
}

function FilterContent({
  open,
  onClick,
  onClose,
  triggerContent,
  title = "Filters",
  children,
  className,
  targetButtonProps,
  triggerButtonClassName,
}: FilterContentProps) {
  const handleClick = useCallback(
    ({ onClick, open }: Pick<FilterContentProps, "open" | "onClick">) =>
      () =>
        onClick?.(!open),
    [],
  );

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {triggerContent ? (
          <div onClick={handleClick({ onClick, open })}>{triggerContent}</div>
        ) : (
          <Button
            {...targetButtonProps}
            color={targetButtonProps?.color || "secondary"}
            onClick={handleClick({ onClick, open })}
            className={cn(triggerButtonClassName)}
          >
            <FilterIcon className="me-2 h-4 w-4" />
            {title}
          </Button>
        )}
      </div>

      {open && (
        <div
          className={cn(
            "absolute right-0 top-full z-10 mt-4 w-full min-w-[280px] rounded-lg border border-border bg-popover p-6 shadow-lg md:w-[400px] md:min-w-[400px]",
            className,
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-default-900">{title}</h2>
            <XIcon
              className="size-3 cursor-pointer transition-colors hover:text-primary"
              onClick={onClose}
            />
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

export default FilterContent;
