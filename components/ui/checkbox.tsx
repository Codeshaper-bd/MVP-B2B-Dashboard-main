"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer group shrink-0 ring-offset-background border border-default-200 transition-all duration-300   disabled:cursor-not-allowed disabled:opacity-50 rounded h-4 w-4 [&_svg]:stroke-primary-foreground [&_svg]:h-3 [&_svg]:w-3",
  {
    variants: {
      color: {
        default:
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        defaultGray:
          "data-[state=checked]:border-default-400 data-[state=checked]:bg-default-400 [&_svg]:stroke-success-foreground",
        primary:
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary [&_svg]:stroke-white",
        secondary:
          "data-[state=checked]:bg-secondary [&_svg]:stroke-secondary-foreground",
        destructive:
          "data-[state=checked]:border-destructive data-[state=checked]:bg-destructive [&_svg]:stroke-destructive-foreground",
        warning:
          "data-[state=checked]:border-warning data-[state=checked]:bg-warning [&_svg]:stroke-warning-foreground",
        info: "data-[state=checked]:border-info data-[state=checked]:bg-info [&_svg]:stroke-info-foreground",
        success:
          "data-[state=checked]:border-success data-[state=checked]:bg-success [&_svg]:stroke-success-foreground",
        successDefault:
          "data-[state=checked]:border-success data-[state=checked]:bg-success",
        purple:
          "data-[state=checked]:border-[#7f56d9] data-[state=checked]:bg-[#7f56d9] [&_svg]:stroke-success-foreground",
      },
    },
    defaultVariants: {
      color: "default",
    },
  },
);

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof checkboxVariants> & {
    icon?: React.ReactNode;
    selected?: boolean;
    onChange?: (checked: boolean) => void;
    readonly?: boolean;
  };

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      color,
      selected,
      onChange,
      icon = <Check className="h-3 w-3" strokeWidth={3} />,
      readonly,
      ...props
    },
    ref,
  ) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        checkboxVariants({ color }),
        readonly
          ? "!pointer-events-none !cursor-none bg-opacity-80"
          : "pointer-events-auto cursor-pointer bg-opacity-100",
        className,
      )}
      checked={selected}
      onCheckedChange={!readonly ? onChange : undefined}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex items-center justify-center text-current",
          readonly
            ? "!pointer-events-none !cursor-none bg-opacity-80"
            : "pointer-events-auto cursor-pointer bg-opacity-100",
        )}
      >
        {/* <Check className="h-3 w-3" strokeWidth={3} /> */}
        {icon}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
