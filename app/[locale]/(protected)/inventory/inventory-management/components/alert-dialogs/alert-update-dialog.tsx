"use client";

import CheckIcon from "@/components/icons/CheckIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function AlertUpdateDialog({ open, setOpen }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="success"
        withCloseButton
        icon={<CheckIcon className="size-5" />}
        title="Alert update successful"
        description="Congratulations! Alert update successful"
      >
        <StatusAlert.Buttons.PrimaryButton onClick={() => setOpen(!open)}>
          ok
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default AlertUpdateDialog;
