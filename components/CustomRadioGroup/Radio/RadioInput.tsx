"use client";
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type TRadioInputElement = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

export interface IRadioInputProps extends TRadioInputElement {}

const RadioInput = forwardRef<HTMLInputElement, IRadioInputProps>(
  ({ className, ...restProps }, ref) => (
    <input
      ref={ref}
      className={cn("peer hidden", className)}
      {...restProps}
      type="radio"
    />
  ),
);

RadioInput.displayName = "RadioInput";

export default RadioInput;
