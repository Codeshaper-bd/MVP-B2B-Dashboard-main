"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ICalenderProps {
  selected?: Date | null;
  onChange?: any;
  monthsShows?: number;
  showTimeSelect?: boolean;
  placeholderText?: string;
  showIcon?: boolean;
  icon?: any;
  selectsRange?: any;
  rangeStartDate?: any;
  rangeEndDate?: any;
  shouldCloseOnSelect?: boolean;
  handleApply?: any;
  isOpen?: any;
  onInputClick?: any;
  renderCalendarContainer?: any;
  onClickOutside?: any;
  timeInterval?: number;
  dateFormat?: string;
  isClearable?: boolean;
  showTimeSelectOnly?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  color?: "inputColored" | "default";
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  minTime?: Date | undefined;
  maxTime?: Date | undefined;
}

export default function ReactCalender({
  selected,
  onChange,
  monthsShows = 1,
  showTimeSelect = false,
  placeholderText,
  showIcon,
  selectsRange = false,
  rangeStartDate,
  rangeEndDate,
  shouldCloseOnSelect,
  handleApply,
  isOpen,
  readOnly,
  onInputClick,
  renderCalendarContainer,
  onClickOutside,
  timeInterval = 15,
  dateFormat,
  showTimeSelectOnly,
  isClearable = false,
  color = "default",
  icon,
  disabled,
  minDate,
  maxDate,
  minTime,
  maxTime,
}: ICalenderProps) {
  return (
    <div
      className={`react-calender w-full ${color === "default" ? "" : "inputColored"}`}
    >
      <DatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        monthsShown={monthsShows}
        showTimeSelect={showTimeSelect}
        showIcon={showIcon}
        icon={icon}
        readOnly={readOnly}
        dateFormat={dateFormat}
        isClearable={isClearable}
        timeFormat="HH:mm"
        timeIntervals={timeInterval}
        startDate={rangeStartDate}
        endDate={rangeEndDate}
        selectsRange={selectsRange}
        open={isOpen}
        showTimeSelectOnly={showTimeSelectOnly}
        shouldCloseOnSelect={shouldCloseOnSelect}
        calendarContainer={renderCalendarContainer}
        onInputClick={onInputClick}
        onClickOutside={onClickOutside}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
      />
    </div>
  );
}
