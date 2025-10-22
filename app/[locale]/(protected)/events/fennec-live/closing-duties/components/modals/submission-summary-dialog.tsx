import Image from "next/image";

import BankNoteIcon from "@/components/icons/BankNoteIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface FormData {
  cashOnHand?: string;
  debitAmount?: string;
  posAmount?: string;
}
interface ISubmissionSummaryDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: FormData | null;
}

function SubmissionSummaryDialog({
  open,
  data,
  setOpen,
}: ISubmissionSummaryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="transparent-with-rounded-border"
        withCloseButton
        icon={<BankNoteIcon className="size-5" />}
        title="Confirm Cash-Out"
        description={
          <div className="mt-4 space-y-4 rounded-[8px] bg-default-50 p-4">
            <div className="flex justify-between gap-[1px]">
              <p>Category:</p>
              <div className="flex gap-3">
                <Image
                  src="/assets/all/mainbar.png"
                  alt="mainbar Image"
                  width={32}
                  height={24}
                  className="rounded-[3px]"
                />
                <span>Main Bar</span>
              </div>
            </div>
            <div className="flex justify-between gap-[1px]">
              <span>Cash On Hand:</span> <span>${data?.cashOnHand}</span>
            </div>
            <div className="flex justify-between gap-[1px]">
              <span>Debit Terminal Close-Out:</span>{" "}
              <span>${data?.debitAmount}</span>
            </div>
            <div className="flex justify-between gap-[1px]">
              <span>POS Read Amount:</span> <span>${data?.posAmount}</span>
            </div>
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
            Submit
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default SubmissionSummaryDialog;
