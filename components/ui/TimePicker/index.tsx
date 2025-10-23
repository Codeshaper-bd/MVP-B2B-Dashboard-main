"use client";

import React, { useState, useRef, useEffect } from "react";

import useClickOutside from "@/hooks/use-click-outside";
// import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { cn } from "@/lib/utils";
import { ClockIcon as ClockIcon } from "@/components/icons";

import { Button } from "../button";
import { Input } from "../input";
import Slot from "./Slot";
import TimepickerButton from "./TimepickerButton";
import type { TimePickerProps } from "./types";
import { getHours, getMinutes } from "./utils";

export function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  error,
  required,
  disabled,
  readonly,
  interval = 1,
  label,
  disabledHours,
  disabledMinutes,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || "");
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");
  const containerRef = useRef<HTMLDivElement>(null);
  const hourContainerRef = useRef<HTMLDivElement>(null);
  const minuteContainerRef = useRef<HTMLDivElement>(null);

  const hours = getHours();
  const minutes = getMinutes(interval);

  useClickOutside({ ref: containerRef, callback: () => setIsOpen(false) });
  // useLockBodyScroll(isOpen);
  useEffect(() => {
    setSelectedTime(value || "");
    if (value) {
      const [hour, minute] = value.split(":").map(Number);
      setSelectedHour(hour === 0 ? 12 : hour > 12 ? hour - 12 : hour);
      setSelectedMinute(minute || 0);
      setSelectedPeriod(hour >= 12 ? "PM" : "AM");
    }
  }, [value]);

  const scrollToNearestSlot = (
    containerRef: React.RefObject<HTMLDivElement>,
    selectedValue: number,
    items: number[],
  ) => {
    if (containerRef.current) {
      const nearestItem = items.reduce((prev, curr) =>
        Math.abs(curr - selectedValue) < Math.abs(prev - selectedValue)
          ? curr
          : prev,
      );
      const itemIndex = items.indexOf(nearestItem);
      const itemHeight = 40; // Approximate height of each item
      const scrollTop = itemIndex * itemHeight;

      containerRef.current.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Scroll to nearest hour and minute after a short delay
      setTimeout(() => {
        scrollToNearestSlot(hourContainerRef, selectedHour, hours);
        scrollToNearestSlot(minuteContainerRef, selectedMinute, minutes);
      }, 100);
    }
  }, [isOpen, selectedHour, selectedMinute, hours, minutes]);

  const handleTimeSelect = () => {
    const hour24 =
      selectedPeriod === "PM" && selectedHour !== 12
        ? selectedHour + 12
        : selectedPeriod === "AM" && selectedHour === 12
          ? 0
          : selectedHour;

    const timeString = `${hour24.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`;
    setSelectedTime(timeString);
    onChange?.(timeString);
    setIsOpen(false);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedTime(newValue);
    onChange?.(newValue);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="custom-time-picker relative">
        <Input
          type="time"
          value={selectedTime}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          step={interval * 60}
          // onFocus={(e) => e.target.blur()}
          label={label}
          rightContent={
            <div className="cursor-pointer" onClick={handleClockClick}>
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          }
        />

        {isOpen && (
          <div className="absolute top-full z-50 mt-2 w-72 rounded-md border bg-popover p-4 shadow-md">
            <div className="grid grid-cols-3 gap-4">
              <Slot containerRef={hourContainerRef} label="Hour">
                {hours?.map((hour) => (
                  <TimepickerButton
                    key={hour}
                    value={hour}
                    onClick={() => setSelectedHour(hour)}
                    selected={selectedHour === hour}
                    disabled={disabledHours?.includes(hour)}
                    readonly={readonly || false}
                  />
                ))}
              </Slot>

              {/* Minutes */}
              <Slot containerRef={minuteContainerRef} label="Minute">
                {minutes?.map((minute) => (
                  <TimepickerButton
                    key={minute}
                    value={minute}
                    onClick={() => setSelectedMinute(minute)}
                    selected={selectedMinute === minute}
                    disabled={disabledMinutes?.includes(minute)}
                    readonly={readonly || false}
                  />
                ))}
              </Slot>

              {/* AM/PM */}
              <Slot label="Period">
                <div className="space-y-1">
                  {(["AM", "PM"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={cn(
                        "flex w-fit min-w-20 items-center justify-center gap-2 rounded-lg py-2 text-sm font-normal leading-6",
                        selectedPeriod === period
                          ? "bg-secondary text-secondary-foreground"
                          : "text-muted-foreground hover:bg-secondary",
                        disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer",
                        readonly ? "pointer-events-none" : "",
                      )}
                      type="button"
                      disabled={disabled || readonly}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </Slot>
            </div>

            {/* Apply Button */}
            <div className="flex justify-end">
              <Button onClick={handleTimeSelect} color="primary">
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
