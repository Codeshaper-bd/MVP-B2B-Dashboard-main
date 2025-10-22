"use client";

import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import type { DateRange } from "react-day-picker";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import QuickTime from "./quick-time";

export type TDate = Date | undefined;
export type TDateRange = {
  from?: TDate;
  to?: TDate;
};

interface DateRangePickerProps {
  onApply?: (dateRange: DateRange) => void;
  buttonLabel?: string;
  triggerClassName?: string;
  label?: string;
  error?: string;
  isShowQuickTime?: boolean;
  defaultDateRange?: TDateRange;
  disabled?: boolean | ((date: Date) => boolean);
  renderButton?: (date: DateRange) => React.ReactNode;
  onClear?: () => void;
}

export default function DateRangePicker({
  onApply,
  buttonLabel = "Pick a Date",
  triggerClassName,
  label,
  error,
  isShowQuickTime = false,
  defaultDateRange,
  disabled,
  renderButton,
  onClear,
}: DateRangePickerProps) {
  const [isApplied, setIsApplied] = useState(false);
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [tempDate, setTempDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDate({
      from: defaultDateRange?.from ?? undefined,
      to: defaultDateRange?.to ?? undefined,
    });
    setTempDate({
      from: defaultDateRange?.from ?? undefined,
      to: defaultDateRange?.to ?? undefined,
    });
    // Only reset isApplied if the defaultDateRange is cleared
    if (!defaultDateRange?.from && !defaultDateRange?.to) {
      setIsApplied(false);
    }
  }, [defaultDateRange]);

  const handleApply = () => {
    setIsApplied(true);
    setDate(tempDate);
    onApply?.(tempDate);
    setOpen(false);
  };

  const handleClear = () => {
    setIsApplied(false);
    setDate({ from: undefined, to: undefined });
    setTempDate({ from: undefined, to: undefined });
    onApply?.({ from: undefined, to: undefined });
    setOpen(false);
    onClear?.();
  };

  const isSmallDevice = useMediaQuery("(max-width: 768px)");

  // Memoize handleDateChange to prevent re-creations during render
  const handleDateChange = useCallback(
    (selectedDate: DateRange | undefined) => {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    },
    [],
  );

  function isSameRange(a: DateRange, b: DateRange) {
    return (
      ((!a.from && !b.from) ||
        (a.from && b.from && dayjs(a.from).isSame(b.from, "day"))) &&
      ((!a.to && !b.to) || (a.to && b.to && dayjs(a.to).isSame(b.to, "day")))
    );
  }

  const showClear = isApplied && isSameRange(date, tempDate);

  return (
    <LabelErrorWrapper label={label} error={error}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button color="secondary" className={cn(triggerClassName)}>
            {renderButton ? (
              renderButton(date)
            ) : (
              <>
                <CalendarIcon className="me-2 h-4 w-4" />
                {date ? (
                  `${dayjs(date.from).format("MMM DD, YYYY")}${
                    date.to
                      ? ` - ${dayjs(date.to).format("MMM DD, YYYY")}`
                      : " - MMM DD, YYYY"
                  }`
                ) : (
                  <span>{buttonLabel}</span>
                )}
              </>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-fit p-0"
          align={isSmallDevice ? "center" : "end"}
        >
          <div className="flex">
            {isShowQuickTime && (
              <div className="hidden h-full flex-none sm:block">
                <QuickTime
                  date={date}
                  setDate={setDate}
                  setTempDate={setTempDate}
                />
              </div>
            )}

            <div className="flex-1 border-l border-default-200">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={tempDate}
                onSelect={handleDateChange}
                numberOfMonths={isSmallDevice ? 1 : 2}
                disabled={typeof disabled === "function" ? disabled : undefined}
              />

              <div className="flex w-full flex-col justify-between gap-3 border-t border-default-100 p-4 md:flex-row">
                <div className="flex items-center gap-3">
                  {!!tempDate?.from && (
                    <>
                      <Button>
                        {dayjs(tempDate.from).format("MMM DD, YYYY")}
                      </Button>
                      <Separator className="w-8" />
                    </>
                  )}

                  {!!tempDate?.to && (
                    <Button>{dayjs(tempDate.to).format("MMM DD, YYYY")}</Button>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button color="secondary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={showClear ? handleClear : handleApply}
                    disabled={!(tempDate?.from && tempDate?.to)}
                  >
                    {showClear ? "Clear" : "Apply"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </LabelErrorWrapper>
  );
}
