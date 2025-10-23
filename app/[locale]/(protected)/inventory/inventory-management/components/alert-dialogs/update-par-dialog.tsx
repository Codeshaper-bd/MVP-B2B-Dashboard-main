"use client";

import { CheckIcon as CheckIcon } from "@/components/icons";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function UpdateParDialog({ open, setOpen }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="success"
        withCloseButton
        icon={<CheckIcon className="size-5" />}
        title="Successfully updated Par Level"
        description="Congratulations! Par Level successfully updated"
      >
        <StatusAlert.Buttons.PrimaryButton onClick={() => setOpen(!open)}>
          ok
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default UpdateParDialog;
