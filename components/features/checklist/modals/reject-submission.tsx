import CrossIcon from "@/components/icons/CrossIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type IApproveSubmissionDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function RejectSubmissionDialog({
  open,
  setOpen,
}: IApproveSubmissionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button color="secondary">
          <CrossIcon className="me-1 size-5 text-warning" /> Reject Submission
        </Button>
      </AlertDialogTrigger>

      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<CrossIcon className="size-5" />}
        title="Reject Checklist?"
        description="Are you sure you want to reject this checklist?"
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
            Reject Checklist
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default RejectSubmissionDialog;
