import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import type { rounded, shadow } from "@/lib/type";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center px-4 md:px-6 border border-border whitespace-nowrap text-sm font-semibold transition-all  duration-300 group    focus-visible:outline-none focus-visible:hidden focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      color: {
        default:
          "bg-default text-default-700 hover:text-default-1000  hover:bg-default-50 ",
        primary: "bg-primary text-primary-foreground  hover:bg-primary/70",
        secondary:
          "bg-secondary  text-default-700  hover:bg-default-100  hover:text-default-700",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/70 ",
        warning: "bg-warning text-warning-foreground hover:bg-warning/70 ",
        info: "bg-info text-info-foreground hover:bg-info/70",
        success: "bg-success text-success-foreground hover:bg-success/70 ",
        "pagination-btn-active": "bg-default-100 text-[#ECECED]",
        "pagination-btn-inactive":
          "border-transparent bg-transparent hover:bg-default-50 text-default-600",
      },
      variant: {
        default: "",
        outline:
          "border border-border-primary hover:border-default-100 bg-transparent hover:ring-0 hover:ring-transparent",
        soft: "text-default bg-default/10 hover:bg-default  hover:text-default-foreground",
        ghost:
          "text-default-900 border-transparent bg-transparent hover:bg-default-50  hover:text-default-foreground hover:ring-0 hover:ring-transparent hover:ring-offset-0",
        shadow: "shadow-md",
        noborder: "border-0 border-transparent",
      },
      shadow: {
        sm: "shadow",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
      rounded: {
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
        none: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        default: "h-10 md:px-6  px-4 ",
        sm: "h-7 text-xs md:px-4  px-3",
        md: "h-9",
        lg: "h-11 px-8 text-base md:px-10 px-7",
        xl: "h-12  px-8 text-base md:px-10 px-7",
        icon: "h-9 w-9 p-0 md:px-0 flex justify-center items-center",
        "40": "min-h-10 h-fit min-w-10 w-fit px-0 md:px-0 px-4 md:mx-0 m-0 flex justify-center items-center  text-sm leading-5 font-medium",
        "44": "min-h-11 h-fit min-w-11 w-fit px-0 md:px-0 px-4 md:mx-0 m-0 flex justify-center items-center  text-sm leading-5 font-medium",
        "48": "min-h-12 h-fit min-w-12 w-fit px-0 md:px-0 px-4 md:mx-0 m-0 flex justify-center items-center  text-sm leading-5 font-medium",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        color: "primary",
        className:
          "text-primary border-primary hover:text-primary-foreground hover:border-primary hover:bg-primary",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-secondary hover:bg-secondary hover:text-secondary-foreground ",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "text-success border-success hover:text-success-foreground hover:border-success hover:bg-success",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "text-info border-info hover:text-info-foreground hover:border-info hover:bg-info",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "text-warning border-warning hover:text-warning-foreground hover:border-warning hover:bg-warning",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "text-destructive  border-destructive hover:text-destructive-foreground hover:border-destructive hover:bg-destructive",
      },
      {
        variant: "outline",
        color: "info",
        className:
          "text-info hover:text-info-foreground hover:border-info hover:bg-info",
      },
      {
        variant: "soft",
        color: "primary",
        className:
          "text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground",
      },
      {
        variant: "soft",
        color: "secondary",
        className:
          "bg-secondary/90 hover:bg-secondary/80 hover:text-secondary-foreground",
      },
      {
        variant: "soft",
        color: "success",
        className:
          "text-success bg-success/10 hover:bg-success hover:text-success-foreground",
      },
      {
        variant: "soft",
        color: "info",
        className:
          "text-info bg-info/10 hover:bg-info hover:text-info-foreground",
      },
      {
        variant: "soft",
        color: "warning",
        className:
          "text-warning bg-warning/10 hover:bg-warning hover:text-warning-foreground",
      },
      {
        variant: "soft",
        color: "destructive",
        className:
          "text-destructive bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary hover:bg-primary hover:text-primary-foreground ",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "hover:text-secondary-foreground hover:bg-secondary  text-secondary-foreground",
      },
      {
        variant: "ghost",
        color: "success",
        className:
          "text-success hover:text-success-foreground hover:bg-success",
      },
      {
        variant: "ghost",
        color: "info",
        className: "text-info hover:text-info-foreground hover:bg-info",
      },
      {
        variant: "ghost",
        color: "warning",
        className:
          "text-warning hover:text-warning-foreground hover:bg-warning",
      },

      {
        variant: "ghost",
        color: "destructive",
        className:
          "text-destructive hover:text-destructive-foreground hover:bg-destructive",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "default",
      rounded: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "destructive";

  shadow?: shadow;
  rounded?: rounded;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      color,
      fullWidth,
      shadow,
      rounded,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            rounded,
            color,
            shadow,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
