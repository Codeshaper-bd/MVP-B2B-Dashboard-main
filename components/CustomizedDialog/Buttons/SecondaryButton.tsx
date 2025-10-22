"use client";
import { Button, type ButtonProps } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

import { handleOnClick } from ".";
import { useDialogContext, type TDialogContextType } from "../DialogContext";

interface ISecondaryButtonProps extends Omit<ButtonProps, "color" | "onClick"> {
  disableInternallyClose?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    dialogContextValue: TDialogContextType,
  ) => void;
}

function SecondaryButton({
  fullWidth = true,
  disableInternallyClose,
  onClick,
  ...restProps
}: ISecondaryButtonProps) {
  const dialogContextValue = useDialogContext();

  let content = (
    <DialogClose asChild>
      <Button color="secondary" fullWidth={fullWidth} {...restProps} />
    </DialogClose>
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
