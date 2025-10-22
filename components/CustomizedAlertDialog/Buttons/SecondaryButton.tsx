"use client";

import {
  useBooleanContext,
  type TBooleanContextType,
} from "@/contexts/BooleanContext";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button, type ButtonProps } from "@/components/ui/button";

import { handleOnClick } from ".";

interface ISecondaryButtonProps extends Omit<ButtonProps, "color" | "onClick"> {
  disableInternallyClose?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    dialogContextValue: TBooleanContextType,
  ) => void;
}

function SecondaryButton({
  fullWidth = true,
  disableInternallyClose,
  onClick,
  ...restProps
}: ISecondaryButtonProps) {
  const dialogContextValue = useBooleanContext();

  let content = (
    <AlertDialogCancel asChild>
      <Button color="secondary" fullWidth={fullWidth} {...restProps} />
    </AlertDialogCancel>
  );

  if (disableInternallyClose) {
    content = (
      <Button
        color="secondary"
        fullWidth={fullWidth}
        {...restProps}
        onClick={handleOnClick({ dialogContextValue, onClick })}
      />
    );
  }

  return content;
}

export default SecondaryButton;
