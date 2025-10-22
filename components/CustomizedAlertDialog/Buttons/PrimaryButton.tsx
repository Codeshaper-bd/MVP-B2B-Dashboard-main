"use client";
import React from "react";

import {
  useBooleanContext,
  type TBooleanContextType,
} from "@/contexts/BooleanContext";
import { Button, type ButtonProps } from "@/components/ui/button";

import { handleOnClick } from ".";

interface IPrimaryButtonProps extends Omit<ButtonProps, "color" | "onClick"> {
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    dialogContextValue: TBooleanContextType,
  ) => void;
}

function PrimaryButton({
  fullWidth = true,
  onClick,
  ...restProps
}: IPrimaryButtonProps) {
  const dialogContextValue = useBooleanContext();

  return (
    <Button
      color={"primary"}
      fullWidth={fullWidth}
      {...restProps}
      onClick={handleOnClick({ dialogContextValue, onClick })}
    />
  );
}

export default PrimaryButton;
