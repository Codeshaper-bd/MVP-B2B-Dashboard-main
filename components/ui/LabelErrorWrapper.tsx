import { memo } from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";

type TContainer = {
  fragmentWrapper?: false;
  className?: string;
};

export type TLabelErrorWrapperProps = {
  label?: React.ReactNode;
  error?: string | number | null | boolean;
  htmlFor?: string;
  children?: React.ReactNode;
  labelClassName?: string;
  errorClassName?: string;
  required?: boolean;
} & TContainer;

function LabelErrorWrapper({
  label,
  labelClassName,
  errorClassName,
  error,
  children,
  htmlFor,
  fragmentWrapper,
  required,
  ...restProps
}: TLabelErrorWrapperProps) {
  const content = (
    <>
      {!!label && (
        <Label
          htmlFor={htmlFor}
          className={cn("inline-flex items-center gap-0.5", labelClassName)}
        >
          {label}
          {!!required && <span className="text-[#F97066]">*</span>}
        </Label>
      )}
      {children}
      {!!error && (
        <p className={cn("mt-1.5 text-sm text-[#F97066]", errorClassName)}>
          {error}
        </p>
      )}
    </>
  );

  if (fragmentWrapper) {
    return content;
  }

  return (
    <div
      className={cn(
        "className" in restProps ? restProps?.className : undefined,
      )}
    >
      {content}
    </div>
  );
}

export default memo(LabelErrorWrapper) as unknown as typeof LabelErrorWrapper;
