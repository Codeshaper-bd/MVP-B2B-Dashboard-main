import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface IButtonsProps {
  children?: React.ReactNode;
  className?: string;
}

function Buttons({ children, className }: IButtonsProps) {
  return (
    <div className={cn("flex w-full flex-1 items-center gap-3", className)}>
      {children}
    </div>
  );
}

Buttons.PrimaryButton = PrimaryButton;
Buttons.SecondaryButton = SecondaryButton;
Buttons.Button = Button;

export default Buttons;
