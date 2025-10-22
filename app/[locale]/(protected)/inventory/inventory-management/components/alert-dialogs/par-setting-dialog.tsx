"use client";

import BellIcon from "@/components/icons/BellIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function ParSettingDialog({ open, setOpen, alertOpen, setAlertOpen }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="warning"
        withCloseButton
        icon={<BellIcon className="size-5" />}
        title="Receive email notification?"
        description="Receive email notification when alert gets triggered. Who should be notified?"
      >
        <StatusAlert.Buttons.SecondaryButton onClick={() => setOpen(!open)}>
          Cancel
        </StatusAlert.Buttons.SecondaryButton>
        <StatusAlert.Buttons.PrimaryButton
          onClick={() => {
            setAlertOpen(!alertOpen);
            setOpen(!open);
          }}
        >
          Confirm
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default ParSettingDialog;
