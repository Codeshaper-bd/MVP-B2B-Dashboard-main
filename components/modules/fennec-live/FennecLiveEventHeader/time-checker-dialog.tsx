"use client";
import { useRouter } from "next/navigation";

import XIcon from "@/components/icons/X";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ITimeCheckedDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TimeCheckedDialog({ open, setOpen }: ITimeCheckedDialogProps) {
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        withCloseButton
        icon={<XIcon className="size-3.5" />}
        status="destructive"
        title="Close Duties"
        description="Are you sure want to close the night?"
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
            className="bg-[#F04438] text-default-1000 hover:bg-[#F04438]"
            // onClick={() => setOpen(false)}
            onClick={() => {
              setOpen(false);
              router.push("/en/events/fennec-live/closing-duties");
            }}
          >
            Close
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default TimeCheckedDialog;
