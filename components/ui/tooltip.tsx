"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, memo } from "react";

import { cn } from "@/lib/utils";

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-lg px-3 py-2.5 text-xs text-center font-medium leading-normal animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-w-52",
  {
    variants: {
      color: {
        default: "bg-default-100 text-default-1000 [&_svg]:fill-default-100",
        primary: "bg-primary text-primary-foreground [&_svg]:fill-primary",
        secondary:
          "bg-secondary text-secondary-foreground [&_svg]:fill-secondary",
        destructive:
          "bg-destructive text-destructive-foreground [&_svg]:fill-destructive",
        warning: "bg-warning text-warning-foreground [&_svg]:fill-warning",
        info: "bg-info text-info-foreground [&_svg]:fill-info",
        success: "bg-success text-success-foreground [&_svg]:fill-success",
      },
    },
    defaultVariants: {
      color: "default",
    },
  },
);

interface ToolTipProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
      "color"
    >,
    VariantProps<typeof tooltipVariants> {}
const Tooltip = memo(TooltipPrimitive.Root);
Tooltip.displayName = TooltipPrimitive.Root.displayName;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipProvider = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Provider>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
>(({ delayDuration = 0, ...props }, ref) => (
  <TooltipPrimitive.Provider {...props} delayDuration={delayDuration} />
));
TooltipProvider.displayName = TooltipPrimitive.Provider.displayName;

const TooltipContent = forwardRef<
  Omit<React.ElementRef<typeof TooltipPrimitive.Content>, "color">,
  ToolTipProps
>(({ className, sideOffset = 4, color, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ color }), className, {})}
    {...props}
  >
    {children}
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipComponentProps {
  className?: string;
  content?: React.ReactNode;
  isArrow?: boolean;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  color?: VariantProps<typeof tooltipVariants>["color"];
}

function TooltipComponentWithoutMemo({
  className,
  content = "Default Tooltip",
  isArrow = true,
  children,
  side = "top",
  color,
}: TooltipComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className} side={side} color={color}>
          {isArrow ? <TooltipArrow className="h-2 w-4" /> : ""}
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
const TooltipComponent = memo(TooltipComponentWithoutMemo);

export {
  Tooltip,
  TooltipArrow,
  TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};
