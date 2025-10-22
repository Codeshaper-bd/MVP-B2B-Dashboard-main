"use client";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

import type useBooleanState from "@/hooks/useBooleanState";
import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import { Button } from "@/components/ui/button";

type THandleSelectDate = (props: {
  setSelectedDate: React.Dispatch<
    React.SetStateAction<dayjs.Dayjs | undefined>
  >;
  day: dayjs.Dayjs;
}) => () => void;

const handleSelectDate: THandleSelectDate =
  ({ setSelectedDate, day }) =>
  () => {
    setSelectedDate((prevSelectedDate) => {
      if (
        !!prevSelectedDate &&
        !!day &&
        day.format("YYYY-MM-DD") === prevSelectedDate.format("YYYY-MM-DD")
      ) {
        return undefined;
      }

      return day;
    });
  };
interface DateSwiperProps {
  selectedDate: dayjs.Dayjs | undefined;
  setSelectedDate: React.Dispatch<
    React.SetStateAction<dayjs.Dayjs | undefined>
  >;
  setViewCalendarModalOpen?: ReturnType<typeof useBooleanState>["setOpen"];
  setDateRange?: (range: DateRange) => void;
  dateRange?: DateRange | TNullish;
}

function DateSwiper({
  selectedDate,
  setSelectedDate,
  setViewCalendarModalOpen,
  setDateRange,
  dateRange,
}: DateSwiperProps) {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(() => dayjs());
  const [mode, setMode] = useState<"custom" | "week" | "month">("week");

  // Always show 7 days: the week containing currentDate

  const days = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return [];
    }

    let start = dayjs(dateRange.from);
    const end = dayjs(dateRange.to);

    if (start.isBefore(today, "day")) {
      start = today.startOf("day");
    }

    const totalDays = end.diff(start, "day") + 1;

    const allDays = Array.from({ length: totalDays }, (_, i) =>
      start.add(i, "day"),
    );

    return allDays.slice(0, 7);
  }, [dateRange, today]);

  useEffect(() => {
    if (dateRange && setDateRange) {
      setDateRange(dateRange);
    }
  }, [dateRange, setDateRange]);

  // Month navigation: set currentDate to first day of prev/next month, then show that week

  const handleMonthChange = (type: "increment" | "decrement") => {
    const operation = type === "increment" ? "add" : "subtract";
    let newMonthDate = currentDate[operation](1, "month").startOf("month");

    let start = newMonthDate.startOf("month");
    const end = newMonthDate.endOf("month");

    if (start.isBefore(today, "day") && start.isSame(today, "month")) {
      start = today.startOf("day");
      newMonthDate = today;
    }

    setCurrentDate(newMonthDate);
    setMode("month");
    setSelectedDate(undefined);
    setDateRange?.({ from: start.toDate(), to: end.toDate() });
  };

  const handleWeekChange = (type: "increment" | "decrement") => {
    const operation = type === "increment" ? "add" : "subtract";
    let newWeekDate = currentDate[operation](7, "day").startOf("week");

    let start = newWeekDate.startOf("week");
    const end = newWeekDate.add(6, "day").endOf("day");

    if (today.isAfter(start, "day") && today.isBefore(end, "day")) {
      start = today.startOf("day");
      newWeekDate = today;
    }

    setCurrentDate(newWeekDate);
    setMode("week");
    setSelectedDate(undefined);
    setDateRange?.({ from: start.toDate(), to: end.toDate() });
  };

  const formatRange = (range?: DateRange | TNullish) => {
    if (!range?.from || !range?.to) {
      return <>{currentDate.format("MMM, YYYY")}</>;
    }
    return `${dayjs(range.from).format("MMM DD")} - ${dayjs(range.to).format("MMM DD")}`;
  };
  const isDisableBackArrow =
    dayjs(dateRange?.from).format("MM YYYY") === dayjs(today).format("MM YYYY");
  dayjs.extend(isSameOrBefore);
  const isDisableWeekBackArrow = dayjs(dateRange?.from).isSameOrBefore(
    today,
    "day",
  );

  return (
    <div className="rounded-lg pt-3">
      <div className="mb-4 flex items-center justify-between rounded-md border border-none bg-default-50 p-1.5">
        <Button
          onClick={() => handleMonthChange("decrement")}
          disabled={isDisableBackArrow}
          size="icon"
          className="size-6 bg-secondary text-default-300"
        >
          <ChevronRightIcon className="w-1.5" />
        </Button>
        <span
          onClick={() => {
            setViewCalendarModalOpen?.()();
            setMode("custom");
          }}
          className="mx-1 flex-1 cursor-pointer text-center text-sm font-medium tracking-[-0.084px] text-default-900 md:mx-5"
        >
          {mode !== "custom" ? (
            <>{currentDate.format("MMM, YYYY")}</>
          ) : (
            <>{formatRange(dateRange)}</>
          )}
        </span>
        <Button
          onClick={() => handleMonthChange("increment")}
          color="secondary"
          size="icon"
          className="size-6 bg-secondary text-default-300"
        >
          <ChevronLeftIcon className="w-1.5" />
        </Button>
      </div>
      <div className="flex w-full items-center gap-2">
        <Button
          onClick={() => handleWeekChange("decrement")}
          disabled={isDisableWeekBackArrow}
          color="secondary"
          className="flex size-6 shrink-0 items-center justify-center rounded-[6px] border border-solid border-[#E2E4E9] bg-secondary p-0 shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] md:border-[#E2E4E9] md:p-0"
        >
          <ChevronRightIcon className="w-1.5 shrink-0 text-default-300" />
        </Button>
        <div className="hide-scrollbar flex w-full gap-1 overflow-x-auto overflow-y-hidden">
          {days.map((day) => {
            const isDaySelected =
              !!selectedDate &&
              day.format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD");
            const isCurrentMonth = day.month() === currentDate.month();
            return (
              <div
                key={day.format("YYYY-MM-DD")}
                className={cn(
                  "flex-1 rounded-lg bg-default-50 p-2 text-center text-default-300 hover:cursor-pointer",
                  {
                    "bg-primary": isDaySelected,
                    "opacity-50": !isCurrentMonth,
                  },
                )}
                onClick={handleSelectDate({
                  day,
                  setSelectedDate,
                })}
              >
                <div
                  className={cn(
                    "text-center text-xs font-normal leading-4 text-default-300",
                    {
                      "text-default": isDaySelected,
                    },
                  )}
                >
                  {day.format("ddd")}
                </div>
                <div
                  className={cn(
                    "text-center text-base font-medium leading-6 tracking-[-0.176px] text-default-900",
                    {
                      "text-default": isDaySelected,
                    },
                  )}
                >
                  {day.format("DD")}
                </div>
              </div>
            );
          })}
        </div>
        <Button
          onClick={() => handleWeekChange("increment")}
          color="secondary"
          className="flex size-6 shrink-0 items-center justify-center rounded-[6px] border border-solid border-[#E2E4E9] bg-secondary p-0 shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] md:border-[#E2E4E9] md:p-0"
        >
          <ChevronLeftIcon className="w-1.5 shrink-0 text-default-300" />
        </Button>
      </div>
    </div>
  );
}

export default DateSwiper;
