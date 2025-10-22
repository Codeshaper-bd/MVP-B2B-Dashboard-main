"use client";

import InfoIcon from "@/components/icons/InfoIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function IncorrectFileDialog({ open, setOpen }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<InfoIcon className="size-5" />}
        title="Incorrect file format"
        description="Please enter the file in the correct format "
      >
        <StatusAlert.Buttons.PrimaryButton onClick={() => setOpen(!open)}>
          ok
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default IncorrectFileDialog;
