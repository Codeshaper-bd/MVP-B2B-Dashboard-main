import React, { memo, useCallback } from "react";

import { cn } from "@/lib/utils";

export type THourProps = {
  time: string;
  isSelected?: boolean;
  disabled?: boolean;
  disabledTimeSlots?: boolean;
  readonly?: boolean;
  onSelect?: (time: string) => void;
};

function Hour({
  time,
  isSelected,
  disabled,
  disabledTimeSlots,
  readonly,
  onSelect,
}: THourProps) {
  const handleClick = useCallback(() => {
    if (!disabled && !readonly) {
      onSelect?.(time);
    }
  }, [disabled, readonly, time, onSelect]);

  return (
    <button
      className={cn(
        "flex w-fit min-w-20 items-center justify-center gap-2 self-stretch py-2 text-sm font-normal leading-6",
        isSelected
          ? "bg-[#1F242F] text-white"
          : "text-[#CECFD2] hover:bg-[#1F242F]",
        disabled || disabledTimeSlots
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer",
        readonly ? "pointer-events-none" : "",
      )}
      id={time}
      type="button"
      onClick={handleClick}
      disabled={disabled || disabledTimeSlots || readonly}
    >
      {time}
    </button>
  );
}

export default memo(Hour);
