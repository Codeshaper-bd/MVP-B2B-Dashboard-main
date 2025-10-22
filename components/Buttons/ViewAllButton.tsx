import React from "react";

import { cn } from "@/lib/utils";

import RightArrowIcon from "../icons/RightArrowIcon";
import { Button, type ButtonProps } from "../ui/button";

interface IViewAllButtonProps
  extends React.RefAttributes<HTMLButtonElement>,
    ButtonProps {
  children?: React.ReactNode;
}

function ViewAllButton({
  className,
  color = "secondary",
  children = "View All",
  type = "button",
  fullWidth = true,
  ...restProps
}: IViewAllButtonProps) {
  return (
    <Button
      color={color}
      type={type}
      fullWidth={fullWidth}
      className={cn(
        "flex flex-1 items-center gap-2",
        "text-sm font-semibold leading-5 text-default-700",
        className,
      )}
      {...restProps}
    >
      {children}
      <RightArrowIcon className="size-3" />
    </Button>
  );
}

export default ViewAllButton;
