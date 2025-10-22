"use client";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import type { size } from "@/lib/type";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-default-200 dark:bg-default-300",
  {
    variants: {
      color: {
        default: "[&>div]:bg-default",
        primary: "[&>div]:bg-primary",
        secondary: "[&>div]:bg-secondary",
        destructive: "[&>div]:bg-destructive",
        warning: "[&>div]:bg-warning",
        info: "[&>div]:bg-info",
        success: "[&>div]:bg-success",
      },
      size: {
        sm: "h-2",
        default: "h-3",
        md: "h-3.5",
        lg: "h-4",
      },
    },
    defaultVariants: {
      color: "default",
      size: "default",
    },
  },
);

interface ProgressProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
      "color"
    >,
    VariantProps<typeof progressVariants> {
  size?: size;
  value?: number;
  showValue?: boolean;
  isStripe?: boolean;
  isAnimate?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, value, color, size, showValue, isStripe, isAnimate, ...props },
    ref,
  ) => {
    const stripeStyles = isStripe
      ? {
          backgroundImage: `linear-gradient(
          45deg,
          hsla(0, 0%, 100%, 0.15) 25%,
          transparent 0,
          transparent 50%,
          hsla(0, 0%, 100%, 0.15) 0,
          hsla(0, 0%, 100%, 0.15) 75%,
          transparent 0,
          transparent
        )`,
          backgroundSize: "0.857rem 0.857rem",
        }
      : {};
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ color, size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "flex h-full w-full flex-1 items-center justify-center transition-all",
            className,
            {
              "animate-stripes": isAnimate,
            },
          )}
          style={{
            transform: `translateX(-${100 - (value || 0)}%)`,
            ...stripeStyles,
          }}
        >
          {showValue && (
            <span className="block w-full pe-1 text-end text-xs text-primary-foreground">
              {value}%
            </span>
          )}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    );
  },
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
