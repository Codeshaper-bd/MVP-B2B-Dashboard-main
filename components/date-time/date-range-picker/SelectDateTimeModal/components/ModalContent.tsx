import dayjs from "dayjs";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { type Matcher } from "react-day-picker";

import type { TExternalState } from "@/hooks/useBooleanState";
import { isToday } from "@/lib/date-time/compare-date-times";
import { getTodaysPastTimeSlots } from "@/lib/date-time/generate-time-slots-in-a-day";
import {
  convertUTCToLocal,
  convertUTCToLocalDate,
} from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogFooter } from "@/components/ui/dialog";

import Hours from "./Hours";

type TModalContentProps = {
  readonly?: boolean;
  disabled?: Matcher | Matcher[];
  disabledTime?: (time: string, selectedDate?: Date) => boolean;
  defaultMonth?: Date;
  selectedDate: Date | undefined;
  onApply?: (
    date: Date,
    setClose: (props: Partial<TExternalState> | void) => () => void,
  ) => void;
  setClose: (props: Partial<TExternalState> | void) => () => void;
  applyButtonText?: string;
  cancelButtonText?: string;
  isApplyLoading?: boolean;
  hideTodayButton?: boolean;
  endDateTime?: string;
};

function ModalContent({
  selectedDate,
  defaultMonth,
  disabled,
  disabledTime,
  readonly,
  onApply,
  setClose,
  applyButtonText,
  cancelButtonText,
  isApplyLoading,
  hideTodayButton,
  endDateTime,
}: TModalContentProps) {
  const [tempDate, setTempDate] = useState<Date | undefined>(selectedDate);
  const [disabledSlots, setDisabledSlots] = useState<string[]>([]);
  const [hasManuallySelectedTime, setHasManuallySelectedTime] = useState(false);
  const isSameDate = useMemo(
    () => selectedDate?.getTime() === tempDate?.getTime(),
    [selectedDate, tempDate],
  );

  const handleHourMinuteChange = useCallback((time: string) => {
    setHasManuallySelectedTime(true);
    setTempDate((prevDate) => {
      if (!prevDate) {
        return undefined;
      }
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = dayjs(prevDate)
        .hour(hours)
        .minute(minutes)
        .second(0)
        .millisecond(0)
        .toDate();
      return newDate;
    });
  }, []);

  const handleApply = useCallback(
    ({
      setClose,
      tempDate,
      onApply,
    }: Pick<TModalContentProps, "onApply" | "setClose"> & {
      tempDate: Date | undefined;
    }) =>
      () => {
        if (tempDate) {
          onApply?.(tempDate, setClose);
        }
      },
    [],
  );

  const endDate = convertUTCToLocalDate({
    utcDateTime: endDateTime,
  });
  const endDateTimeSlot = convertUTCToLocal({
    utcDateTime: endDateTime,
    format: "HH:mm",
  });

  // Create a function to check if time should be disabled based on endDate
  const checkEndDateDisabled = useCallback(
    (time: string, selectedDate?: Date) => {
      if (!endDate || !selectedDate || !endDateTimeSlot) {
        return false;
      }

      // Check if selected date is the same as endDate
      const isSameDay = dayjs(selectedDate).isSame(endDate, "day");
      if (!isSameDay) {
        return false;
      }

      // If same day, check if time is after endDateTimeSlot (e.g., "15:58")
      return time > endDateTimeSlot;
    },
    [endDate, endDateTimeSlot],
  );

  // Combine with existing disabledTime function
  const combinedDisabledTime = useCallback(
    (time: string, selectedDate?: Date) => {
      const isEndDateDisabled = checkEndDateDisabled(time, selectedDate);
      const isCustomDisabled = disabledTime
        ? disabledTime(time, selectedDate)
        : false;

      return isEndDateDisabled || isCustomDisabled;
    },
    [checkEndDateDisabled, disabledTime],
  );

  useEffect(() => {
    if (tempDate) {
      // Only automatically disable past time slots if no custom disabledTime function is provided
      if (isToday(tempDate) && !disabledTime) {
        setDisabledSlots(getTodaysPastTimeSlots());
      } else {
        setDisabledSlots([]);
      }
    }
  }, [tempDate, disabledTime, endDate]);

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2",
          readonly && "pointer-events-none",
        )}
      >
        <Calendar
          initialFocus
          mode="single"
          defaultMonth={defaultMonth}
          selected={tempDate}
          onDayClick={setTempDate}
          numberOfMonths={1}
          disabled={disabled}
          classNames={{
            day_selected:
              "!bg-primary !text-black rounded-full hover:bg-default hover:text-default-foreground focus:bg-primary focus:text-default-foreground",
          }}
        />

        <Hours
          selectedTime={tempDate ? dayjs(tempDate).format("HH:mm") : undefined}
          onSelect={handleHourMinuteChange}
          disabledTimeSlots={disabledSlots}
          disabledTime={combinedDisabledTime}
          selectedDate={tempDate}
        />
      </div>

      <DialogFooter>
        <div className="flex w-full justify-end gap-3 p-4">
          {!hideTodayButton && (
            <Button
              color="secondary"
              type="button"
              onClick={() => {
                setTempDate(new Date());
              }}
            >
              Today
            </Button>
          )}

          <Button
            color="secondary"
            type="button"
            onClick={setClose()}
            disabled={isApplyLoading}
          >
            {cancelButtonText}
          </Button>

          <Button
            color="primary"
            type="button"
            disabled={isSameDate || isApplyLoading || !hasManuallySelectedTime}
            onClick={handleApply({ setClose, tempDate, onApply })}
          >
            <ButtonLoadingContent
              actionContent={applyButtonText}
              isLoading={isApplyLoading}
            />
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}

export default memo(ModalContent);
