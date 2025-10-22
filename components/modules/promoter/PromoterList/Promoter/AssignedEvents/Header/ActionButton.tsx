"use client";
import { memo, useCallback } from "react";

import { cn } from "@/lib/utils";
import type { TPromoter } from "@/store/api/promoters/promoters.types";

export interface IActionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: IActionButtonProps["data"],
  ) => void;
  data: TPromoter | null;
}

export type TProcessHandleButtonClick = (props: {
  data: IActionButtonProps["data"];
  onClick: IActionButtonProps["onClick"];
}) => (e: React.MouseEvent<HTMLButtonElement>) => void;

function ActionButton({
  className,
  children = "See All",
  type = "button",
  onClick,
  ...restProps
}: IActionButtonProps) {
  const processHandleButtonClick: TProcessHandleButtonClick = useCallback(
    ({ data, onClick }) =>
      (e) => {
        onClick?.(e, data);
      },
    [],
  );

  return (
    <button
      {...restProps}
      className={cn("text-sm font-medium leading-5 text-[#FFC833]", className)}
      type={type}
      onClick={processHandleButtonClick({
        data: restProps["data"],
        onClick,
      })}
    >
      {children}
    </button>
  );
}

export default memo(ActionButton);
