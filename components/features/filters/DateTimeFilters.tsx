"use client";

import dayjs from "dayjs";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import CustomDatePicker from "@/components/date-time/custom-date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type TTimeRange =
  | "12h"
  | "24h"
  | "7d"
  | "30d"
  | "6m"
  | "1y"
  | "all"
  | "custom";

type TDateTimeFIltersOption = {
  label: string;
  value: TTimeRange;
};

const options: TDateTimeFIltersOption[] = [
  { label: "12 hours", value: "12h" },
  { label: "24 hours", value: "24h" },
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "6 months", value: "6m" },
  { label: "1 year", value: "1y" },
  { label: "All Time", value: "all" },
  // { label: "Custom Date", value: "custom" },
];

type DateTimeFiltersProps = {
  onChange?: (range: {
    from: dayjs.Dayjs;
    to: dayjs.Dayjs;
    activeTime: TTimeRange;
  }) => void;
};

function DateTimeFilters({ onChange }: DateTimeFiltersProps) {
  const [activeTime, setActiveTime] = useState<TTimeRange>("all");
  const initialDateRange = undefined;
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange,
  );

  const handlePresetClick = (value: TTimeRange) => {
    setActiveTime(value);
    setDateRange(initialDateRange);
    const to = dayjs();
    let from: dayjs.Dayjs;
    switch (value) {
      case "12h":
        from = to.subtract(12, "hour");
        break;
      case "24h":
        from = to.subtract(24, "hour");
        break;
      case "7d":
        from = to.subtract(7, "day");
        break;
      case "30d":
        from = to.subtract(30, "day");
        break;
      case "6m":
        from = to.subtract(6, "month");
        break;
      case "1y":
        from = to.subtract(1, "year");
        break;

      default:
        from = dayjs("1970-01-01T00:00:00Z");
        break;
    }
    onChange?.({ from, to, activeTime: value });
  };

  /* const handleDateRangeApply = (range: DateRange) => {
    setDateRange(range);
    if (range.from && range.to) {
      onChange?.({
        from: dayjs(range.from),
        to: dayjs(range.to),
        activeTime: "custom",
      });
    }
    setActiveTime("custom");
  };
  const handleDateRangeClear = () => {
    onChange?.({
      from: dayjs("1970-01-01T00:00:00Z"),
      to: dayjs(),
      activeTime: "all",
    });
    setDateRange(undefined);
    setActiveTime("all");
  }; */

  return (
    <div className="mt-1 flex flex-col gap-6 lg:flex-row lg:items-center">
      <div className="flex-1">
        <Card className="hidden max-w-min rounded-md lg:block">
          <CardContent className="p-0">
            <div className="flex items-center">
              {options?.map((item, index) => (
                <Button
                  key={index}
                  className={cn(
                    "h-10 w-full rounded-none border-r first:rounded-s-md last:rounded-e-md",
                    {
                      "bg-[#1F242F]": activeTime === item.value,
                    },
                    {
                      hidden: item.value === "custom",
                    },
                  )}
                  onClick={() => handlePresetClick(item.value)}
                >
                  {item.label}
                </Button>
              ))}
              <CustomDatePicker
                monthsShown={2}
                onApply={({ from, to }) => {
                  setDateRange({ from, to });
                  onChange?.({
                    from: dayjs(from).startOf("day"),
                    to: dayjs(to),
                    activeTime: "custom",
                  });
                  setActiveTime("custom");
                }}
                onClear={() => {
                  onChange?.({
                    from: dayjs("1970-01-01T00:00:00Z"),
                    to: dayjs(),
                    activeTime: "all",
                  });
                  setDateRange(undefined);
                  setActiveTime("all");
                }}
              />
              {/* <DateRangePicker
                defaultDateRange={dateRange}
                onApply={handleDateRangeApply}
                onClear={handleDateRangeClear}
                buttonLabel="Custom Date"
                triggerClassName={cn(
                  "border-none bg-transparent rounded-none",
                  {
                    "rounded-none": activeTime === "custom",
                  },
                )}
                renderButton={(date) => (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="me-1 h-4 w-4" />
                    {activeTime === "custom" &&
                    dateRange &&
                    dateRange.from &&
                    dateRange.to
                      ? `${dayjs(dateRange.from).format("MMM DD, YYYY")} - ${dayjs(dateRange.to).format("MMM DD, YYYY")}`
                      : "Custom Date"}
                  </div>
                )}
                disabled={disableFutureDates}
              /> */}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-wrap items-center gap-3 lg:hidden">
          {options?.map((item, index) => (
            <Button
              key={index}
              className={cn("h-10", {
                "bg-[#1F242F]": activeTime === item.value,
              })}
              onClick={() => handlePresetClick(item.value)}
            >
              {item.label}
            </Button>
          ))}
          <CustomDatePicker
            monthsShown={2}
            onApply={({ from, to }) => {
              setDateRange({ from, to });
              onChange?.({
                from: dayjs(from).startOf("day"),
                to: dayjs(to),
                activeTime: "custom",
              });
              setActiveTime("custom");
            }}
            onClear={() => {
              onChange?.({
                from: dayjs("1970-01-01T00:00:00Z"),
                to: dayjs(),
                activeTime: "all",
              });
              setDateRange(undefined);
              setActiveTime("all");
            }}
          />
          {/* <DateRangePicker
            defaultDateRange={dateRange}
            onApply={handleDateRangeApply}
            onClear={handleDateRangeClear}
            buttonLabel="Custom Date"
            disabled={disableFutureDates}
            triggerClassName={cn("border-none bg-transparent rounded-none", {
              "rounded-none": activeTime === "custom",
            })}
            renderButton={(date) => (
              <div className="flex items-center gap-2">
                <CalendarIcon className="me-1 h-4 w-4" />
                {activeTime === "custom" &&
                dateRange &&
                dateRange.from &&
                dateRange.to
                  ? `${dayjs(dateRange.from).format("MMM DD, YYYY")} - ${dayjs(dateRange.to).format("MMM DD, YYYY")}`
                  : "Custom Date"}
              </div>
            )}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default DateTimeFilters;
