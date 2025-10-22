import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import type { InputColor, rounded } from "@/lib/type";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex whitespace-nowrap items-center rounded-md border py-1 px-3 text-xs font-medium  capitalize font-semibold bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 relative before:absolute before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full",
  {
    variants: {
      color: {
        default: "border-default-300  text-white",
        primary: "border-primary  text-primary",
        secondary: "border-secondary text-secondary",
        destructive: "border-destructive  text-destructive",
        success:
          "border-success bg-[#053321]  text-success before:bg-[#17B26A]",
        info: "border-info border-info text-info ",
        warning: "border-warning  border-warning text-warning",
        waringTwo: "border-[#932F19] bg-[#511C10] text-[#F7B27A]",
      },
      rounded: {
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
        none: "rounded-none",
      },
    },

    defaultVariants: {
      color: "default",
      rounded: "full",
    },
  },
);
export interface IBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  color?: InputColor;
  rounded?: rounded;
  dot?: boolean;
}

function Badge({ className, color, rounded, dot, ...props }: IBadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ color, rounded }),
        className,
        dot
          ? "pl-[18px] before:left-1.5 before:block"
          : "before:left-0 before:hidden",
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
