import LockLockedIcon from "@/components/icons/LockLockedIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ILockEventDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLockEvent: React.Dispatch<React.SetStateAction<boolean>>;
}

function LockEventDialog({
  open,
  setOpen,
  setLockEvent,
}: ILockEventDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        withCloseButton
        icon={<LockLockedIcon className="size-5" />}
        title="Lock Event"
        description={
          <div>
            Fennec live will be disabled on all devices
            <span className="ms-1 text-[#F97066]">
              (This action cannot be undone)
            </span>
          </div>
        }
        maxWidth="480px"
      >
        <div className="mt-3 grid w-full grid-cols-2 gap-3">
          <Button
            fullWidth
            color="secondary"
            size="lg"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            color="primary"
            size="lg"
            className="bg-[#F04438] text-default-1000 hover:bg-[#F04438] md:px-2"
            onClick={() => {
              setOpen(false);
              setLockEvent(true);
            }}
          >
            Proceed
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default LockEventDialog;
