import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import type { TDialogContextType } from "../DialogContext";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface IButtonsProps {
  children?: React.ReactNode;
  className?: string;
}

export type THandleOnClick = ({
  dialogContextValue,
  onClick,
}: {
  dialogContextValue: TDialogContextType;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    dialogContextValue: TDialogContextType,
  ) => void;
}) => (e: React.MouseEvent<HTMLButtonElement>) => void;

export const handleOnClick: THandleOnClick =
  ({ dialogContextValue, onClick }) =>
  (e) => {
    onClick?.(e, dialogContextValue);
  };

function Buttons({ children, className }: IButtonsProps) {
  return (
    <div
      className={cn("flex w-full flex-1 items-center gap-3 pt-8", className)}
    >
      {children}
    </div>
  );
}

Buttons.PrimaryButton = PrimaryButton;
Buttons.SecondaryButton = SecondaryButton;
Buttons.Button = Button;

export default Buttons;
