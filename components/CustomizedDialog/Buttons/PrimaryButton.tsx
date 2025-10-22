"use client";
import React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

import { handleOnClick } from ".";
import { useDialogContext, type TDialogContextType } from "../DialogContext";

interface IPrimaryButtonProps extends Omit<ButtonProps, "color" | "onClick"> {
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    dialogContextValue: TDialogContextType,
  ) => void;
}

function PrimaryButton({
  fullWidth = true,
  onClick,
  ...restProps
}: IPrimaryButtonProps) {
  const dialogContextValue = useDialogContext();

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
