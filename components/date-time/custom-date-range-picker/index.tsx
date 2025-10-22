import dayjs from "dayjs";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from "@/components/icons/CalendarIcon";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {
  onApply?: (range: { from: Date; to: Date }) => void;
  onClear?: () => void;
  monthsShown?: number;
  showBtnIcon?: boolean;
  buttonLabel?: string;
};

function CustomDatePicker({
  onApply,
  onClear,
  monthsShown,
  showBtnIcon,
  buttonLabel = "Custom Date",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [appliedRange, setAppliedRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const onChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setDateRange(appliedRange);
    }
  };

  const handleApply = () => {
    setAppliedRange(dateRange);
    setIsOpen(false);
    if (dateRange[0] && dateRange[1]) {
      onApply?.({ from: dateRange[0], to: dateRange[1] });
    }
  };

  const handleClear = () => {
    setDateRange([null, null]);
    setAppliedRange([null, null]);
    setIsOpen(false);
    onClear?.();
  };

  const handleCancel = () => {
    setDateRange(appliedRange);
    setIsOpen(false);
  };

  const datesAreEqual = (
    range1: [Date | null, Date | null],
    range2: [Date | null, Date | null],
  ) =>
    dayjs(range1[0]).isSame(range2[0], "day") &&
    dayjs(range1[1]).isSame(range2[1], "day");

  const getButtonLabel = () => {
    if (appliedRange[0] && appliedRange[1]) {
      return `${dayjs(appliedRange[0]).format("MMM DD, YYYY")} - ${dayjs(
        appliedRange[1],
      ).format("MMM DD, YYYY")}`;
    }
    return (
      <span className="flex items-center gap-2">
        {showBtnIcon && <CalendarIcon className="h-4 w-4" />}
        <CalendarIcon className="h-4 w-4" />
        {buttonLabel}
      </span>
    );
  };

  const showApply =
    dateRange[0] &&
    dateRange[1] &&
    (!appliedRange[0] ||
      !appliedRange[1] ||
      !datesAreEqual(dateRange, appliedRange));

  const showClear =
    appliedRange[0] &&
    appliedRange[1] &&
    datesAreEqual(dateRange, appliedRange);

  return (
    <div className="react-calender inline-block">
      <button
        className={`example-custom-input flex items-center gap-2 text-nowrap rounded border px-3 py-2 ${appliedRange[0] && appliedRange[1] ? "bg-default-50" : ""}`}
        onClick={handleClick}
        type="button"
      >
        {getButtonLabel()}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 max-w-[800px] rounded bg-default-50 p-3 shadow">
          <DatePicker
            selected={dateRange[0]}
            onChange={onChange}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            monthsShown={monthsShown || 1}
            inline
            selectsRange
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 60))}
          />
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {dateRange[0] && (
                <>
                  <Button color="secondary" type="button">
                    {dayjs(dateRange[0]).format("MMM DD, YYYY")}
                  </Button>

                  <Separator className="w-8 bg-default-200" />
                </>
              )}
              {dateRange[1] && (
                <Button color="secondary" type="button">
                  {dayjs(dateRange[1]).format("MMM DD, YYYY")}
                </Button>
              )}
            </div>
            <div className="flex flex-1 justify-end gap-2">
              <Button
                color="secondary"
                className="rounded border px-3 py-1 text-sm"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </Button>
              {showClear && (
                <Button
                  color="primary"
                  className="py- rounded text-sm"
                  onClick={handleClear}
                  type="button"
                >
                  Clear
                </Button>
              )}
              {!showClear && (
                <Button
                  color="primary"
                  disabled={!showApply}
                  className="rounded text-sm"
                  onClick={handleApply}
                  type="button"
                >
                  Apply
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
