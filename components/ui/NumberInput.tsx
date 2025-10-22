"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { forwardRef, useEffect, useState } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";

import { Input, type TInputProps } from "./input";

const NumberInput = forwardRef<
  HTMLInputElement,
  Omit<TInputProps, "type"> & {
    onChange?: (value: number | null) => void;
    value?: number;
    step?: number;
    min?: number | string;
    max?: number;
    allowDecimal?: boolean;
    allowNegative?: boolean;
  }
>(
  (
    {
      onChange,
      value,
      step = 1,
      min = 0,
      max = Infinity,
      allowDecimal = false,
      allowNegative = false,
      ...rest
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value?.toString() ?? "");
    const minNumber = convertToNumber({
      value: min,
      digit: 0,
    });
    useEffect(() => {
      if (value !== undefined && !Number.isNaN(value)) {
        setInputValue(value.toString());
      }
    }, [value]);

    const getRegex = () => (allowDecimal ? /^-?\d*(\.\d*)?$/ : /^-?\d*$/);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = e.target.value;

      if (raw === "") {
        setInputValue("");
        onChange?.(null);
        return;
      }
      raw = raw.replace(/^0+(?=\d)/, "");
      if (getRegex().test(raw)) {
        setInputValue(raw);
        const num = convertToNumber({ value: raw });
        if (!isNaN(num)) {
          onChange?.(num);
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;
      const { value } = e.currentTarget;

      const allowed = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Enter",
      ];

      const isNumberKey = /^[0-9]$/.test(key);
      const alreadyHasDot = value.includes(".");
      const alreadyHasMinus = value.includes("-");
      const shouldAllowMinus =
        allowNegative &&
        key === "-" &&
        e.currentTarget.selectionStart === 0 &&
        !alreadyHasMinus;

      if (
        isNumberKey ||
        allowed.includes(key) ||
        (key === "." && allowDecimal && !alreadyHasDot) ||
        shouldAllowMinus
      ) {
        return;
      }

      // Custom stepper support
      if (key === "ArrowUp") {
        e.preventDefault();
        const current = convertToNumber({ value }) || 0;
        const next = Math.min(current + step, max);
        setInputValue(next.toString());
        onChange?.(next);
        return;
      }

      if (key === "ArrowDown") {
        e.preventDefault();
        const current = convertToNumber({ value }) || 0;
        const next = Math.max(current - step, minNumber);
        setInputValue(next.toString());
        onChange?.(next);
        return;
      }

      e.preventDefault();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pasted = e.clipboardData.getData("text");
      if (!getRegex().test(pasted)) {
        e.preventDefault();
      }
    };
    const increment = () => {
      const current = convertToNumber({ value: inputValue }) || 0;
      const next = Math.min(current + step, max);
      setInputValue(next.toString());
      onChange?.(next);
    };

    const decrement = () => {
      const current = convertToNumber({ value: inputValue }) || 0;
      const next = Math.max(current - step, minNumber);
      setInputValue(next.toString());
      onChange?.(next);
    };
    return (
      <Input
        {...rest}
        ref={ref}
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        rightContent={
          <div className="z-50 me-1 hidden cursor-pointer flex-col group-hover:flex">
            <ChevronUp
              className={cn(
                "mt-1 h-4 w-4 cursor-pointer text-default-600 hover:text-primary",
                {
                  "cursor-not-allowed hover:text-default-600": rest.disabled,
                },
              )}
              onClick={() => !rest.disabled && increment()}
            />
            <ChevronDown
              className={cn(
                "-mt-1 h-4 w-4 cursor-pointer text-default-600 hover:text-primary",
                {
                  "cursor-not-allowed hover:text-default-600": rest.disabled,
                },
              )}
              onClick={() => !rest.disabled && decrement()}
            />
          </div>
        }
      />
    );
  },
);

NumberInput.displayName = "NumberInput";
export default NumberInput;
