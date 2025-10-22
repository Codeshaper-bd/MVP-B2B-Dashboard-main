"use client";
import { memo } from "react";

import { cn } from "@/lib/utils";
import { InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import {
  getOtpInputHighlightState,
  type TGetOtpInputHighlightStateArgs,
} from "./utils/get-otp-input-highlight-state";

interface IOtpFieldProps extends TGetOtpInputHighlightStateArgs {
  isError: boolean;
}

function OtpField(props: IOtpFieldProps) {
  const { isFieldFocused, isFieldHighlighted } =
    getOtpInputHighlightState(props);

  return (
    <InputOTPGroup key={props?.index}>
      <InputOTPSlot
        index={props.index}
        className={cn(
          "z-10 h-20 w-20 border border-slate-700 bg-background text-5xl",
          {
            "border-primary": isFieldHighlighted,
            "ring-[4px] ring-primary ring-opacity-20": isFieldFocused,
            "border-destructive": props.isError,
            "ring-[4px] ring-destructive ring-opacity-20":
              props.isError && isFieldFocused,
          },
        )}
      />
    </InputOTPGroup>
  );
}

export default memo(OtpField);
