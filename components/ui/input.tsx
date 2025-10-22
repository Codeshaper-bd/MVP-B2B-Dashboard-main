"use client";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { useBlockNumberInputScroll } from "@/hooks/useBlockNumberInputScroll";
import useMeasure from "@/hooks/useMeasure";
import { blockInvalidKeys } from "@/lib/key/block-invalid-keys";
import { cn } from "@/lib/utils";

import LabelErrorWrapper, {
  type TLabelErrorWrapperProps,
} from "./LabelErrorWrapper";

export const inputVariants = cva(
  "w-full py-1.5 px-4 text-base font-normal border outline-none focus:outline-none bg-default file:border-0 file:bg-transparent read-only:bg-default-200 transition-all duration-300 file:border-0 file:bg-transparent file:text-sm",
  {
    variants: {
      color: {
        default:
          "border-default-200 shadow text-default-900 focus:outline-none focus:border-primary focus:ring-primary focus:ring-opacity-20 focus:ring-4 placeholder:text-[#85888E] text-default-1000 focus:text-default-1000",
        primary:
          "border-primary/50 text-primary focus:border-primary disabled:bg-primary/30 disabled:placeholder:text-primary  placeholder:text-primary/70",
        secondary:
          "border-default-300 text-default-700  focus:border-secondary  disabled:bg-secondary/30 disabled:placeholder:text-secondary  placeholder:text-default-600",
        info: "border-info/50 text-info focus:border-info disabled:bg-info/30 disabled:placeholder:text-info  placeholder:text-info/70",
        warning:
          "border-warning/50 text-warning  focus:border-warning disabled:bg-warning/30 disabled:placeholder:text-info  placeholder:text-warning/70",
        success:
          "border-success/50 text-success focus:border-success   disabled:bg-success/30 disabled:placeholder:text-info  placeholder:text-success/70",
        destructive:
          "border-destructive/50 text-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/30 disabled:bg-destructive/30 disabled:placeholder:text-destructive  placeholder:text-destructive/70",
      },

      size: {
        sm: "h-10 read-only:leading-10",
        default: "h-11 read-only:leading-11", // use
        md: "h-11 read-only:leading-11",
        lg: "h-12 read-only:leading-[48px]",
      },
      rounded: {
        lg: "rounded-lg",
        none: "rounded-none",
      },
      backgroundColor: {
        secondary: "bg-secondary",
        transparent: "bg-transparent",
      },
    },

    defaultVariants: {
      color: "default",
      size: "default",
      rounded: "lg",
      backgroundColor: "transparent",
    },
  },
);

interface IInputExtensionProps {
  className?: string;
  children: React.ReactNode;
  roundedMode?: "left" | "right";
}

function InputExtension({
  className,
  children,
  roundedMode,
}: IInputExtensionProps) {
  return (
    <div
      className={cn(
        "h-11 overflow-hidden rounded-[0px_8px_8px_0px] border border-l-0 border-solid border-default-200 bg-secondary px-4 py-[9.4px] text-base font-semibold leading-6 text-default-700",
        {
          "border-l-1 rounded-[8px_0px_0px_8px] border-r-0":
            roundedMode === "left",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

export type TInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> &
  VariantProps<typeof inputVariants> & {
    extensionWrapperClassName?: string;
    leftExtensionContent?: React.ReactNode;
    rightExtensionContent?: React.ReactNode;
    leftContent?: React.ReactNode;
    leftContentClass?: string;
    rightContent?: React.ReactNode;
    rightContentClass?: string;
    wrapperClass?: string;
    containerClassName?: string;
    isLoading?: boolean;
    required?: boolean;
    isPositiveOnly?: boolean;
    allowDecimal?: boolean;
  } & TLabelErrorWrapperProps;

const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      // custom input props
      label,
      error,
      labelClassName,
      containerClassName,
      fragmentWrapper,
      wrapperClass,
      leftContent,
      leftContentClass,
      rightContent,
      rightContentClass,
      rounded,
      backgroundColor,
      size,
      color,
      isLoading,
      leftExtensionContent,
      rightExtensionContent,
      extensionWrapperClassName,
      required,
      isPositiveOnly,
      allowDecimal,
      // original input props below
      className,
      type = "text",
      disabled,
      ...props
    },
    ref,
  ) => {
    const { ref: leftRef, dimensions: leftDimensions } =
      useMeasure<HTMLDivElement>();
    const { ref: rightRef, dimensions: rightDimensions } =
      useMeasure<HTMLDivElement>();
    const iconCommonClass =
      "absolute top-0 inline-flex h-full select-none items-center justify-center";
    const id = props?.id || props?.name;
    const { onTouchMove, onWheel } = useBlockNumberInputScroll({
      onWheel: props?.onWheel,
      onTouchMove: props?.onTouchMove,
      type,
    });

    return (
      <LabelErrorWrapper
        error={error}
        label={label}
        htmlFor={id}
        className={containerClassName}
        labelClassName={labelClassName}
        fragmentWrapper={fragmentWrapper}
        required={required}
      >
        <div
          className={cn(
            "group flex w-full items-center",
            extensionWrapperClassName,
          )}
        >
          <div
            className={cn(
              "flex w-full items-center",
              !!leftExtensionContent || !!rightExtensionContent
                ? "rounded-lg border ring-0 group-focus-within:border-primary group-focus-within:ring-4 group-focus-within:ring-primary/30"
                : "",
            )}
          >
            {!!leftExtensionContent && leftExtensionContent}

            <div className={cn("relative grow", wrapperClass)}>
              {!!leftContent && (
                <div
                  ref={leftRef}
                  className={cn(
                    "left-0 pl-3 text-default-600",
                    iconCommonClass,
                    leftContentClass,
                  )}
                >
                  {leftContent}
                </div>
              )}

              <input
                ref={ref}
                type={type}
                onKeyDown={(e) =>
                  isPositiveOnly &&
                  type === "number" &&
                  blockInvalidKeys({
                    e,
                    allowDecimal,
                  })
                }
                className={cn(
                  inputVariants({ color, rounded, size, backgroundColor }),
                  {
                    "border-red focus:border-red": !!error,
                    "pl-10 sm:pl-11": !!leftContent,
                    "pr-10 sm:!pr-11": !!rightContent,
                    "select-none disabled:cursor-not-allowed disabled:opacity-50":
                      !!disabled,
                  },
                  !!leftExtensionContent || !!rightExtensionContent
                    ? "border-0 outline-none ring-0 focus-within:border-0 focus-within:outline-none focus-within:ring-0 focus:border-0 focus:outline-none focus:ring-0"
                    : "",
                  {
                    "rounded-r-none": !!rightExtensionContent,
                    "rounded-l-none": !!leftExtensionContent,
                  },
                  className,
                )}
                disabled={disabled || isLoading}
                {...props}
                id={id}
                style={{
                  ...props?.style,
                  paddingLeft: leftDimensions?.width
                    ? leftDimensions.width + 12
                    : undefined,
                  paddingRight: rightDimensions?.width
                    ? rightDimensions.width + 12
                    : undefined,
                }}
                onWheel={onWheel}
                onTouchMove={onTouchMove}
              />

              {!!rightContent && (
                <div
                  ref={rightRef}
                  className={cn(
                    "right-0 pr-4",
                    iconCommonClass,
                    rightContentClass,
                  )}
                >
                  {rightContent}
                </div>
              )}
            </div>

            {!!rightExtensionContent && rightExtensionContent}
          </div>
        </div>
      </LabelErrorWrapper>
    );
  },
);

Input.displayName = "Input";

export { Input, InputExtension };
