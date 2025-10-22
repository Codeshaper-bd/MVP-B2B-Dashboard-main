"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm text-default-700  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-0 cursor-pointer",
);

const Label = React.memo(
  React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
      VariantProps<typeof labelVariants>
  >(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants(),
        "mb-1.5 text-sm font-medium leading-5 text-default-700",
        className,
      )}
      {...props}
    />
  )),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
