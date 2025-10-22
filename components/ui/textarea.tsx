import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

import LabelErrorWrapper, {
  type TLabelErrorWrapperProps,
} from "./LabelErrorWrapper";

export const textareaVariants = cva(
  "flex flex-1 bg-background w-full min-h-[80px] rounded-md border border-solid px-[14px] py-[12px] text-base file:border-0 file:bg-transparent file:text-sm file:font-medium read-only:bg-background read-only:text-default-500 disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 leading-6",
  {
    variants: {
      color: {
        default:
          "border-border-primary shadow text-default-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:focus:border-default-500 disabled:bg-default-200 dark:disabled:bg-default-500 placeholder:text-default-500",
        primary:
          "border-primary/50 text-primary focus:border-primary disabled:bg-primary/30 disabled:placeholder:text-primary placeholder:text-primary/70",
        secondary:
          "border-default-300 text-default-700 focus:border-secondary disabled:bg-secondary/30 disabled:placeholder:text-secondary  placeholder:text-default-600",
        info: "border-info/50 text-info focus:border-info  disabled:bg-info/30 disabled:placeholder:text-info placeholder:text-info/70",
        warning:
          "border-warning/50 text-warning focus:border-warning disabled:bg-warning/30 disabled:placeholder:text-info placeholder:text-warning/70",
        success:
          "border-success/50 text-success focus:border-success disabled:bg-success/30 disabled:placeholder:text-info placeholder:text-success/70",
        destructive:
          "border-destructive/50 text-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/30 disabled:bg-destructive/30 disabled:placeholder:text-destructive placeholder:text-destructive/70",
      },

      backgroundColor: {
        secondary: "bg-secondary",
        transparent: "bg-transparent",
      },
    },

    defaultVariants: {
      color: "default",
      backgroundColor: "transparent",
    },
  },
);

export type TTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "color" | "label"
> &
  VariantProps<typeof textareaVariants> & {
    disableResize?: boolean;
  } & TLabelErrorWrapperProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TTextareaProps>(
  (
    {
      className,
      color,
      defaultValue,
      backgroundColor,
      disableResize,
      fragmentWrapper,
      label,
      error,
      labelClassName,

      ...props
    },
    ref,
  ) => {
    const id = props?.id || props?.name;

    return (
      <LabelErrorWrapper
        label={label}
        labelClassName={labelClassName}
        fragmentWrapper={fragmentWrapper}
        error={error}
        htmlFor={id}
        required={props?.required}
      >
        <div className="w-full flex-1">
          <textarea
            className={cn(
              textareaVariants({ color, backgroundColor }),
              {
                "resize-none": disableResize,
              },
              props?.readOnly ? "!bg-[#343842]" : "",
              className,
            )}
            ref={ref}
            {...props}
            id={id}
          >
            {defaultValue}
          </textarea>
        </div>
      </LabelErrorWrapper>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
