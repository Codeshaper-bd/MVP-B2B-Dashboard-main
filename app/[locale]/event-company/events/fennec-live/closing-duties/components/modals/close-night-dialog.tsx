import MoonIcon from "@/components/icons/MoonIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ICloseNightDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CloseNightDialog({ open, setOpen }: ICloseNightDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        withCloseButton
        icon={<MoonIcon className="size-5" />}
        title="Close Night?"
        description={
          <div className="">
            are you sure you want to override and close the night?
            <span className="ms-1 text-[#F97066]">(NOT RECOMMENDED)</span>
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
            className="md:px-2"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close Night
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default CloseNightDialog;
