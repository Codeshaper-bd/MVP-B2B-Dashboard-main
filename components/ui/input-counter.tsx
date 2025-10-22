"use client";
import { forwardRef } from "react";

import { ensureNumberInStepRange } from "@/lib/data-types/number/ensure-number-in-step-range";
import { blockInvalidKeys } from "@/lib/key/block-invalid-keys";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import { Input } from "@/components/ui/input";

interface IInputCounterProps {
  label: string;
  error?: string;
  containerClassName?: string;
  value: number | undefined;
  onChange: (value: number) => void;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  allowDecimal?: boolean;
  disabled?: boolean;
}

const InputCounter = forwardRef<HTMLInputElement, IInputCounterProps>(
  (
    {
      label,
      error,
      value = 0,
      onChange,
      containerClassName,
      required,
      min,
      max = Infinity,
      step = 1,
      allowDecimal = true,
      disabled = false,
    }: IInputCounterProps,
    ref,
  ) => {
    const handleIncrement = () => {
      const newValue = value + step;
      if (max !== undefined && newValue >= max) {
        onChange(
          ensureNumberInStepRange({
            value: max,
            step,
            fallback: 0,
          }),
        );
        return;
      }
      onChange(
        ensureNumberInStepRange({
          value: newValue,
          step,
          fallback: 0,
        }),
      );
    };

    const handleDecrement = () => {
      const newValue = value > 0 ? value - step : 0;
      if (min !== undefined && newValue <= min) {
        onChange(
          ensureNumberInStepRange({
            value: min,
            step,
            fallback: 0,
          }),
        );
        return;
      }
      onChange(
        ensureNumberInStepRange({
          value: newValue,
          step,
          fallback: 0,
        }),
      );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e?.target?.value);
      if (max !== undefined && newValue >= max) {
        onChange(
          ensureNumberInStepRange({
            value: max,
            step,
            fallback: 0,
          }),
        );
        return;
      }
      if (min !== undefined && newValue <= min) {
        onChange(
          ensureNumberInStepRange({
            value: min,
            step,
            fallback: 0,
          }),
        );
        return;
      }
      onChange(
        ensureNumberInStepRange({
          value: newValue,
          step,
          fallback: 0,
        }),
      );
    };

    return (
      <Input
        ref={ref}
        type="number"
        className="number-input-no-spinner bg-default text-center"
        min={min}
        max={max}
        step={step}
        onKeyDown={(e) =>
          blockInvalidKeys({
            e,
            allowDecimal,
          })
        }
        label={label}
        value={value}
        onChange={handleInputChange}
        containerClassName={containerClassName}
        error={error}
        required={required}
        disabled={disabled}
        leftContent={
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#85888E] text-default-100 transition-colors hover:bg-white">
            <MinusIcon
              className="size-3 cursor-pointer"
              onClick={disabled ? undefined : handleDecrement}
            />
          </div>
        }
        rightContent={
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#85888E] text-default-100 transition-colors hover:bg-white">
            <PlusIcon
              className="size-4 cursor-pointer"
              onClick={disabled ? undefined : handleIncrement}
            />
          </div>
        }
      />
    );
  },
);

InputCounter.displayName = "InputCounter";

export default InputCounter;
