"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import ReactCalender from "@/components/date-time/react-calender";
import FilterContent from "@/components/filter-content";
import FilterIcon from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import RenderCalendarContainer from "./calendar-container";

interface IFormInputs {
  dateRange?: { start: Date | null; end: Date | null };
}
function Filters() {
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dateRangeStart, setDateRangeStart] = useState<Date | null>(null);
  const [dateRangeEnd, setDateRangeEnd] = useState<Date | null>(null);

  const toggleOpen = () => setOpen(!open);

  const onSubmit = (data: IFormInputs) => {
    toggleOpen();
  };

  const { handleSubmit, control, setValue } = useForm<IFormInputs>({
    defaultValues: {
      dateRange: { start: null, end: null },
    },
  });
  const onchangeRange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDateRangeStart(start);
    setDateRangeEnd(end);
    setValue("dateRange", { start, end });
  };
  const handleApply = () => {
    if (dateRangeStart !== null && dateRangeEnd !== null) {
      setIsOpen(false);
    }
  };

  const handleCancelApply = () => {
    setIsOpen(false);
  };

  return (
    <FilterContent
      open={open}
      onClose={toggleOpen}
      triggerContent={
        <Button
          color={open ? "primary" : "secondary"}
          onClick={toggleOpen}
          size="lg"
          className="focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20 md:px-3.5"
        >
          <FilterIcon className="me-2 h-4 w-4" />
          Filter
        </Button>
      }
      className="left-0 min-w-[320px] lg:left-auto"
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 pt-2"
      >
        <LabelErrorWrapper label="Date Range" className="relative">
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <ReactCalender
                {...field}
                selected={dateRangeStart}
                onChange={onchangeRange}
                monthsShows={1}
                placeholderText="Select date"
                dateFormat="d MMMM yyyy"
                showIcon={false}
                selectsRange={true}
                rangeStartDate={dateRangeStart}
                rangeEndDate={dateRangeEnd}
                shouldCloseOnSelect={false}
                handleApply={handleApply}
                isOpen={isOpen}
                onInputClick={() => setIsOpen(true)}
                onClickOutside={() => setIsOpen(false)}
                renderCalendarContainer={(props: any) => (
                  <RenderCalendarContainer
                    dateRangeStart={dateRangeStart}
                    dateRangeEnd={dateRangeEnd}
                    handleCancelApply={handleCancelApply}
                    handleApply={handleApply}
                    {...props}
                  />
                )}
              />
            )}
          />
        </LabelErrorWrapper>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button fullWidth size="lg" color="secondary">
            Cancel
          </Button>
          <Button fullWidth color="primary" size="lg" type="submit">
            Apply
          </Button>
        </div>
      </form>
    </FilterContent>
  );
}

export default Filters;
