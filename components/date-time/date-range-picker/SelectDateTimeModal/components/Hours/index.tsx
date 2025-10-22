import dayjs from "dayjs";
import React, { useState, useCallback, useMemo } from "react";

import { useDelay } from "@/hooks/useDelay";
import { findNearestTimeSlot } from "@/lib/date-time/find-nearest-time-slot";
import {
  generateTimeSlotsInADay,
  type TGenerateTimeSlotsProps,
} from "@/lib/date-time/generate-time-slots-in-a-day";

import Hour from "./Hour";

type THoursProps = Partial<TGenerateTimeSlotsProps> & {
  selectedTime?: string;
  selectedDate?: Date;
  onSelect?: (time: string) => void;
  readonly?: boolean;
  disabled?: boolean;
  disabledTimeSlots?: string[];
  disabledTime?: (time: string, selectedDate?: Date) => boolean;
};

function Hours({
  intervalUnit = "minute",
  interval = 30,
  duration = 24,
  onSelect,
  selectedTime,
  selectedDate,
  disabled,
  readonly,
  disabledTimeSlots,
  disabledTime,
}: THoursProps) {
  const [timeSlots] = useState(() =>
    generateTimeSlotsInADay({
      intervalUnit,
      interval,
      duration,
    }),
  );
  const nearestTimeSlot = useMemo(() => {
    const currentTime = selectedTime?.includes?.(":")
      ? selectedTime
      : dayjs().format("HH:mm");

    return findNearestTimeSlot({
      currentTime,
      timeSlots,
    });
  }, [timeSlots, selectedTime]);

  const handleScrollToCurrentTimeSlot = useCallback(() => {
    const itemElement = document?.getElementById?.(nearestTimeSlot);
    if (itemElement) {
      itemElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [nearestTimeSlot]);

  useDelay(10, handleScrollToCurrentTimeSlot);

  return (
    <div className="custom-scrollbar relative flex h-[300px] w-full flex-col justify-between gap-0.5 overflow-x-hidden overflow-y-scroll">
      {timeSlots?.map((time) => (
        <Hour
          key={time}
          time={time}
          onSelect={onSelect}
          readonly={readonly}
          disabled={disabled}
          disabledTimeSlots={
            disabledTime?.(time, selectedDate) ||
            disabledTimeSlots?.includes(time)
          }
          isSelected={!!selectedTime && nearestTimeSlot === time}
        />
      ))}
    </div>
  );
}

Hours.displayName = "Hours";

export default Hours;
