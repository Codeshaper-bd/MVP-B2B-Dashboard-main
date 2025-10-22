import { type TGenerateTimeSlotsProps } from "@/lib/date-time/generate-time-slots-in-a-day";

export interface TimePickerProps extends Partial<TGenerateTimeSlotsProps> {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  disabledHours?: number[];
  disabledMinutes?: number[];
  readonly?: boolean;
  label?: string;
}
