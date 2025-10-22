import CheckIcon from "@/components/icons/CheckIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type IApproveSubmissionDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ApproveSubmissionDialog({
  open,
  setOpen,
}: IApproveSubmissionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button color="secondary">
          <CheckIcon className="me-1 size-5 text-success" /> Approve Submission
        </Button>
      </AlertDialogTrigger>

      <StatusAlert
        status="success"
        withCloseButton
        icon={<CheckIcon className="size-5" />}
        title="Approve Checklist?"
        description="Are you sure you want to approve this checklist?"
      >
        <div className="grid w-full grid-cols-2 gap-3">
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
            onClick={() => setOpen(false)}
          >
            Approve
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default ApproveSubmissionDialog;
