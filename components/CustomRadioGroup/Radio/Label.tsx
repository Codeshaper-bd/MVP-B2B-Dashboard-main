import React from "react";

import { cn } from "@/lib/utils";

export type TLabelElement = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export interface ICustomRadioLabelProps {
  mode?: "button" | "label-right" | "label-left";
  size?:
    | "10px"
    | "xs"
    | "sm"
    | "15px"
    | "base"
    | "17px"
    | "lg"
    | "xl"
    | "22px"
    | "2xl"
    | "28px"
    | "3xl";

  ringSize?:
    | "1px"
    | "2px"
    | "3px"
    | "4px"
    | "5px"
    | "6px"
    | "7px"
    | "8px"
    | "9px"
    | "10px"
    | "11px"
    | "12px"
    | "13px"
    | "14px"
    | "15px"
    | "16px"
    | "17px"
    | "18px"
    | "19px"
    | "20px"
    | "21px"
    | "22px"
    | "23px"
    | "24px"
    | "25px"
    | "26px"
    | "27px"
    | "28px"
    | "29px"
    | "30px";

  ringColor?:
    | "destructive"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "neutral";

  centerColor?:
    | "white"
    | "transparent"
    | "destructive"
    | "primary"
    | "secondary"
    | "success"
    | "warning";

  textSize?:
    | "10px"
    | "12px"
    | "14px"
    | "15px"
    | "16px"
    | "17px"
    | "18px"
    | "20px"
    | "22px"
    | "24px"
    | "28px"
    | "30px";

  verticalAlign?: "top" | "middle" | "bottom";
}

export interface ILabelProps extends TLabelElement, ICustomRadioLabelProps {}

function Label({
  mode = "label-right",
  children,
  className,
  ringSize = "5px",
  ringColor = "primary",
  centerColor = mode === "button" ? "transparent" : "white",
  size = "base",
  verticalAlign = "middle",
  textSize,
  ...restProps
}: ILabelProps) {
  return (
    <label
      {...restProps}
      className={cn(
        "pointer-events-none flex items-center gap-2 *:transition-all *:duration-300 *:ease-linear",
        {
          "rounded-lg px-2.5 py-3.5 group-has-[input:checked]:bg-default-100":
            mode === "button",
          "w-fit flex-row": mode === "label-right",
          "w-fit flex-row-reverse": mode === "label-left",
        },
        {
          "items-start": verticalAlign === "top",
          "items-center": verticalAlign === "middle",
          "items-end": verticalAlign === "bottom",
        },
      )}
    >
      <span
        className={cn(
          "pointer-events-auto cursor-pointer overflow-hidden rounded-full border border-solid border-default-200 group-has-[input:checked]:border-4 group-has-[input:checked]:border-primary",
          {
            "size-[10px]": size === "10px",
            "size-[12px]": size === "xs",
            "size-[14px]": size === "sm",
            "size-[15px]": size === "15px",
            "size-[16px]": size === "base",
            "size-[17px]": size === "17px",
            "size-[18px]": size === "lg",
            "size-[20px]": size === "xl",
            "size-[22px]": size === "22px",
            "size-[24px]": size === "2xl",
            "size-[28px]": size === "28px",
            "size-[30px]": size === "3xl",
          },
          {
            "group-has-[input:checked]:border-transparent":
              centerColor === "transparent",
            "group-has-[input:checked]:bg-white": centerColor === "white",
            "group-has-[input:checked]:bg-primary": centerColor === "primary",
            "group-has-[input:checked]:bg-secondary":
              centerColor === "secondary",
            "group-has-[input:checked]:bg-success": centerColor === "success",
            "group-has-[input:checked]:bg-[#DC6803]": centerColor === "warning",
            "group-has-[input:checked]:bg-[#D92D20]":
              centerColor === "destructive",
          },
          {
            "group-has-[input:checked]:border": ringSize === "1px",
            "group-has-[input:checked]:border-2": ringSize === "2px",
            "group-has-[input:checked]:border-[3px]": ringSize === "3px",
            "group-has-[input:checked]:border-4": ringSize === "4px",
            "group-has-[input:checked]:border-[5px]": ringSize === "5px",
            "group-has-[input:checked]:border-[6px]": ringSize === "6px",
            "group-has-[input:checked]:border-[7px]": ringSize === "7px",
            "group-has-[input:checked]:border-[8px]": ringSize === "8px",
            "group-has-[input:checked]:border-[9px]": ringSize === "9px",
            "group-has-[input:checked]:border-[10px]": ringSize === "10px",
          },
          {
            "group-has-[input:checked]:border-primary": ringColor === "primary",
            "group-has-[input:checked]:border-default-200":
              ringColor === "secondary",
            "group-has-[input:checked]:border-success": ringColor === "success",
            "group-has-[input:checked]:border-[#DC6803]":
              ringColor === "warning",
            "group-has-[input:checked]:border-transparent":
              ringColor === "neutral",
            "group-has-[input:checked]:border-[#D92D20]":
              ringColor === "destructive",
          },
        )}
      />

      <span
        className={cn(
          "pointer-events-auto cursor-pointer select-none",
          {
            "text-[10px]": textSize === "10px",
            "text-[12px]": textSize === "12px",
            "text-[14px]": textSize === "14px",
            "text-[15px]": textSize === "15px",
            "text-[16px]": textSize === "16px",
            "text-[17px]": textSize === "17px",
            "text-[18px]": textSize === "18px",
            "text-[20px]": textSize === "20px",
            "text-[22px]": textSize === "22px",
            "text-[24px]": textSize === "24px",
            "text-[28px]": textSize === "28px",
            "text-[30px]": textSize === "30px",
          },
          {
            "text-base font-medium leading-6 text-default-900":
              mode === "button",
            "text-sm font-medium leading-6 text-default-700":
              mode === "label-right" || mode === "label-left",
          },
          className,
        )}
      >
        {children}
      </span>
    </label>
  );
}

export default Label;
