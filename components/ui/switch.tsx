"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer relative  inline-flex items-center  [&_.content-box>svg]:h-3  [&_.content-box>svg]:w-3  [&_.content-box]:text-primary-foreground [&_.content-box]:text-[10px] justify-start group  flex-shrink-0  cursor-pointer rounded-full  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-default-300",
  {
    variants: {
      color: {
        default: "data-[state=checked]:bg-default ",
        primary: "data-[state=checked]:bg-primary ",
        secondary: "data-[state=checked]:bg-secondary ",
        info: "data-[state=checked]:bg-info ",
        warning: "data-[state=checked]:bg-warning ",
        success: "data-[state=checked]:bg-success ",
        destructive: "data-[state=checked]:bg-destructive ",
        dark: "data-[state=checked]:bg-foreground ",
      },
      size: {
        sm: "h-4 w-[30px]  [&_.content-box]:text-[7px] [&_.content-box>svg]:h-2.5  [&_.content-box>svg]:w-2.5 ",
        default: "h-5 w-[38px] ",
        md: "h-6 w-[46px]",
        lg: "h-7 w-[48px] ",
        "w-11_h-6": "w-11 h-6",
      },
    },

    defaultVariants: {
      color: "default",
      size: "default",
    },
  },
);

interface SwitchProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
      "color" | "size"
    >,
    VariantProps<typeof switchVariants> {
  startContent?: React.ReactNode | string;
  endContent?: React.ReactNode | string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ color, size, startContent, endContent, className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ color, size }), className)}
    {...props}
    ref={ref}
  >
    {startContent && (
      <span className="content-box text-medium transition-transform-opacity absolute left-1 scale-50 !text-default-1000 opacity-0 group-data-[state=checked]:scale-100 group-data-[state=checked]:opacity-100">
        {startContent}
      </span>
    )}
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-default-1000 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[19px] data-[state=unchecked]:translate-x-[2px] data-[state=unchecked]:dark:bg-default-900",
        {
          "h-3.5 w-3.5 data-[state=checked]:translate-x-3.5": size === "sm",
          "h-5 w-5 data-[state=checked]:translate-x-6": size === "md",
          "h-5 w-5 data-[state=checked]:translate-x-[25px]": size === "lg",
          "size-5 data-[state=checked]:translate-x-[22px]": size === "w-11_h-6",
        },
      )}
    />
    {endContent && (
      <span className="content-box text-medium transition-transform-opacity absolute right-1 z-0 !text-default-1000 opacity-100 group-data-[state=checked]:translate-x-3 group-data-[state=checked]:opacity-0">
        {endContent}
      </span>
    )}
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
