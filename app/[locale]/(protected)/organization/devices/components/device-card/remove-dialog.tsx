import DeleteIcon from "@/components/icons/DeleteIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
interface RemoveDialogProps {
  isConfirmDelete: boolean;
  setIsConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
function RemoveConfirmDialog({
  isConfirmDelete,
  setIsConfirmDelete,
}: RemoveDialogProps) {
  return (
    <AlertDialog open={isConfirmDelete} onOpenChange={setIsConfirmDelete}>
      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<DeleteIcon className="size-6" />}
        title="Are you sure you want to remove this device?"
        description="This device will be permanently removed from your list. Are you sure you want to continue?"
      >
        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            fullWidth
            color="secondary"
            className="bg-default-50"
            onClick={() => setIsConfirmDelete(false)}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            color="primary"
            onClick={() => setIsConfirmDelete(false)}
          >
            Remove
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default RemoveConfirmDialog;
