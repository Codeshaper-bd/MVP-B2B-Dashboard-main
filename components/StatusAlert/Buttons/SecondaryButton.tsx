import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button, type ButtonProps } from "@/components/ui/button";

interface ISecondaryButtonProps extends Omit<ButtonProps, "color"> {
  disableInternallyClose?: boolean;
}

function SecondaryButton({
  fullWidth = true,
  disableInternallyClose,
  ...restProps
}: ISecondaryButtonProps) {
  let content = (
    <AlertDialogCancel asChild>
      <Button color="secondary" fullWidth={fullWidth} {...restProps} />
    </AlertDialogCancel>
  );

  if (disableInternallyClose) {
    content = <Button color="secondary" fullWidth={fullWidth} {...restProps} />;
  }

  return content;
}

export default SecondaryButton;
