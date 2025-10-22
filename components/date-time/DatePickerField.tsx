"use client";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import LabelErrorWrapper from "../ui/LabelErrorWrapper";

interface DatePickerFieldProps {
  label?: string;
  selected?: Date | undefined;
  selectedLabel?: string;
  onChange?: (date: Date | undefined) => void;
  error?: string;
  required?: boolean;
  formatValue?: (utcDateTime: string) => React.ReactNode;
  placeholder?: React.ReactNode;
  isDateDisabled?: (date: Date) => boolean;
  isOpenModal?: boolean;
  isTriggerDisabled?: boolean;
}

function DatePickerField({
  label,
  selected,
  selectedLabel,
  onChange,
  error,
  required = false,
  placeholder = <span>Select Date</span>,
  isDateDisabled,
  isOpenModal = false,
  isTriggerDisabled = false,
}: DatePickerFieldProps) {
  return (
    <LabelErrorWrapper label={label} error={error} required={required}>
      <Popover modal={isOpenModal}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            color="secondary"
            size="lg"
            fullWidth
            className="justify-start border border-default-200 text-base font-normal text-default-500 md:px-3 [&[data-state=open]>svg:last-of-type]:rotate-180"
            disabled={isTriggerDisabled}
          >
            <span className="flex-1 text-start">
              {selectedLabel || placeholder}
            </span>
            <ChevronDownIcon className="h-4 w-4 flex-none text-default-600" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => onChange?.(date)}
            initialFocus
            disabled={isDateDisabled}
          />
        </PopoverContent>
      </Popover>
    </LabelErrorWrapper>
  );
}

export default DatePickerField;
