"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { DateRange } from "react-day-picker";

import type { TNullish } from "@/store/api/common-api-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface IViewActiveEventModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  setDateRange?: (range: DateRange) => void;
  dateRange?: DateRange | TNullish;
}

function CalendarModal({
  open,
  onOpenChange,
  setDateRange,
  dateRange,
}: IViewActiveEventModalProps) {
  const today = dayjs();

  const [localRange, setLocalRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const defaultDateRange: DateRange = {
    from: today.toDate(),
    to: today.endOf("month").toDate(),
  };

  useEffect(() => {
    if (dateRange?.from || dateRange?.to) {
      setLocalRange([dateRange?.from ?? null, dateRange?.to ?? null]);
    } else {
      setLocalRange([null, null]);
    }
  }, [dateRange]);

  const handleCalendarChange = (range: [Date | null, Date | null]) => {
    setLocalRange(range);
  };

  const handleApply = () => {
    if (setDateRange) {
      const [from, to] = localRange;
      setDateRange({
        from: from ?? undefined,
        to: to ?? undefined,
      });
    }
    onOpenChange(false);
  };

  const handleClear = () => {
    setLocalRange([null, null]);
    if (setDateRange) {
      setDateRange({ from: today.toDate(), to: today.endOf("month").toDate() });
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLocalRange([dateRange?.from ?? null, dateRange?.to ?? null]);
    onOpenChange(false);
  };

  const isSameAsCurrent =
    localRange[0]?.getTime() === dateRange?.from?.getTime() &&
    localRange[1]?.getTime() === dateRange?.to?.getTime();

  const isSameDate = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) {
      return false;
    }
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isDefaultDate =
    isSameDate(dateRange?.from, defaultDateRange.from) &&
    isSameDate(dateRange?.to, defaultDateRange.to);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 780);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[350px] max-w-[400px] p-5 md:max-w-[700px]">
        <div className="react-calender flex items-center justify-center pt-5">
          <DatePicker
            selectsRange
            selected={localRange[0]}
            startDate={localRange[0]}
            endDate={localRange[1]}
            onChange={handleCalendarChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            monthsShown={isMobile ? 1 : 2}
            minDate={new Date()}
            inline
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 md:justify-between">
          <div className="flex flex-1 items-center justify-center gap-2 md:flex-auto">
            {dateRange?.from && (
              <>
                <Button color="secondary" type="button">
                  {dayjs(dateRange.from).format("MMM DD, YYYY")}
                </Button>

                <Separator className="w-8 bg-default-200" />
              </>
            )}
            {dateRange?.to && (
              <Button color="secondary" type="button">
                {dayjs(dateRange.to).format("MMM DD, YYYY")}
              </Button>
            )}
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <Button color="secondary" onClick={handleCancel}>
              Cancel
            </Button>

            {isSameAsCurrent && isDefaultDate ? (
              <Button color="primary" onClick={handleApply} disabled>
                Apply
              </Button>
            ) : isSameAsCurrent && !isDefaultDate ? (
              <Button color="primary" onClick={handleClear}>
                Clear
              </Button>
            ) : isDefaultDate && !isSameAsCurrent ? (
              <Button color="primary" onClick={handleApply}>
                Apply
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={handleApply}
                disabled={!localRange[0] || !localRange[1]}
              >
                Apply
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CalendarModal;
