"use client";

import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";
import EyeCloseIcon from "@/components/icons/EyeCloseIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import { Input, type TInputProps } from "@/components/ui/input";

const handleTogglePassword =
  (setShow: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setShow((prev) => !prev);
  };

const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<TInputProps, "type" | "leftContent" | "leftContentClass">
>((props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? "text" : "password"}
        ref={ref}
        rightContent={
          <div
            onClick={handleTogglePassword(setShow)}
            className={cn(
              "absolute right-0 top-0 z-50 inline-flex h-full cursor-pointer px-4 text-default-400",
              props?.readOnly ? "pointer-events-none" : "",
            )}
          >
            {show ? (
              <EyeCloseIcon className="m-auto h-5 w-5 shrink-0" />
            ) : (
              <EyeIcon className="m-auto h-5 w-5 shrink-0" />
            )}
          </div>
        }
      />
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
