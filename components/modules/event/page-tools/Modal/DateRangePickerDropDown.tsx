import dayjs from "dayjs";
import { memo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import type { TNullish } from "@/store/api/common-api-types";
import { Button } from "@/components/ui/button";

interface IDateRangePickerDropDownProps {
  selectedDate: DateRange | TNullish;
  onApply?: (value: IDateRangePickerDropDownProps["selectedDate"]) => void;
  onCancel?: () => void;
}

function DateRangePickerDropDown({
  selectedDate,
  onApply,
  onCancel,
}: IDateRangePickerDropDownProps) {
  const [selectedDateState, setSelectedDateState] =
    useState<IDateRangePickerDropDownProps["selectedDate"]>(selectedDate);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setSelectedDateState(start ? { from: start, to: end || undefined } : null);
  };

  const isSameDateRange = () => {
    if (!selectedDate?.from && !selectedDate?.to && !selectedDateState) {
      return true;
    }
    return (
      dayjs(selectedDate?.from).isSame(selectedDateState?.from, "day") &&
      dayjs(selectedDate?.to).isSame(selectedDateState?.to, "day")
    );
  };

  const hasSelection = !!selectedDateState?.from;

  const isClearState =
    hasSelection && selectedDate?.from && selectedDate?.to && isSameDateRange();

  return (
    <div className="react-calender top-18 absolute -right-5 z-10 rounded-lg border border-secondary !bg-default shadow-lg sm:right-0">
      {/* Desktop */}
      <div className="hidden p-3 sm:block">
        <DatePicker
          // onClickOutside={onCancel}
          selected={selectedDateState?.from ?? null}
          onChange={handleDateChange}
          startDate={selectedDateState?.from ?? null}
          endDate={selectedDateState?.to ?? null}
          selectsRange
          inline
          monthsShown={1}
        />
      </div>

      {/* Mobile */}
      {/* <div className="block w-fit p-3 sm:hidden">
        <DatePicker
          selected={selectedDateState?.from ?? null}
          onChange={handleDateChange}
          startDate={selectedDateState?.from ?? null}
          endDate={selectedDateState?.to ?? null}
          selectsRange
          inline
          monthsShown={1}
        />
      </div> */}

      <div
        className={cn(
          "border-t border-secondary px-3 pb-3 pt-2",
          "grid gap-3",
          "sm:flex sm:flex-wrap sm:items-center sm:justify-between",
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-normal">
          {hasSelection ? (
            <>
              <span className="rounded-md border border-secondary px-2 py-1.5">
                {dayjs(selectedDateState.from).format("DD/MM/YYYY")}
              </span>{" "}
              -
              <span className="rounded-md border border-secondary px-2 py-1.5">
                {selectedDateState.to
                  ? dayjs(selectedDateState.to).format("DD/MM/YYYY")
                  : "DD/MM/YYYY"}
              </span>
            </>
          ) : (
            <span className="rounded-md border border-secondary px-2 py-1.5">
              No Date Selected
            </span>
          )}
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            className="w-full sm:w-fit"
            size="md"
            onClick={() => {
              onCancel?.();
              setSelectedDateState(selectedDate ?? null);
            }}
          >
            Cancel
          </Button>

          <Button
            className="w-full sm:w-fit"
            size="md"
            color="primary"
            disabled={!hasSelection}
            onClick={() => {
              if (isClearState) {
                setSelectedDateState(null);
                onApply?.(null);
              } else {
                onApply?.(selectedDateState ?? null);
              }
            }}
          >
            {isClearState ? "Clear" : "Apply"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(DateRangePickerDropDown);
