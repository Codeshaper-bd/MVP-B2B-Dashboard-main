"use client";
import React, { forwardRef, useEffect, useState } from "react";

import { convertToNumber } from "@/lib/data-types/number";
import { cn } from "@/lib/utils";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";

import { Input, type TInputProps } from "./input";

const InputCounter = forwardRef<
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
      if (value !== undefined && value !== null && !Number.isNaN(value)) {
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
        className={cn("text-center", rest.className)}
        leftContent={
          <div
            className={cn(
              "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#85888E] text-default-100 transition-colors hover:bg-white",
              {
                "cursor-not-allowed hover:bg-[#85888E]": rest.disabled,
              },
            )}
          >
            <MinusIcon
              className="size-3"
              onClick={() => !rest.disabled && decrement()}
            />
          </div>
        }
        rightContent={
          <div
            className={cn(
              "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#85888E] text-default-100 transition-colors hover:bg-white",
              {
                "cursor-not-allowed hover:bg-[#85888E]": rest.disabled,
              },
            )}
          >
            <PlusIcon
              className="size-4"
              onClick={() => !rest.disabled && increment()}
            />
          </div>
        }
      />
    );
  },
);

InputCounter.displayName = "InputCounter";
export default InputCounter;
