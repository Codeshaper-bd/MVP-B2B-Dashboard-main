"use client";

import SaveIcon from "@/components/icons/SaveIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function SaveChangeDialog({ open, setOpen }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="success"
        withCloseButton
        icon={<SaveIcon className="size-5" />}
        title="Successfully saved changes"
        description="Congratulations the file has been successfully updated. "
      >
        <StatusAlert.Buttons.PrimaryButton onClick={() => setOpen(!open)}>
          ok
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default SaveChangeDialog;
