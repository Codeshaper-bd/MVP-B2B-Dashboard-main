import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DeleteIcon from "@/components/icons/DeleteIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface IDeleteEquivalentInventoryItemProps {
  isLoading?: boolean;
  onConfirm?: () => void;
}

function DeleteEquivalentInventoryItem({
  isLoading,
  onConfirm,
}: IDeleteEquivalentInventoryItemProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" color="primary" disabled={isLoading}>
          <ButtonLoadingContent actionContent="Update" isLoading={isLoading} />
        </Button>
      </AlertDialogTrigger>

      <StatusAlert
        status="destructive"
        withCloseButton
        icon={<DeleteIcon className="size-5" />}
        title="No Volume or Unit Option Available"
        description="This action will update the bar inventory product, which is equivalent to deleting it. If you're unsure, please cancel."
      >
        <StatusAlert.Buttons>
          <StatusAlert.Buttons.SecondaryButton disabled={isLoading}>
            Cancel
          </StatusAlert.Buttons.SecondaryButton>

          <StatusAlert.Buttons.PrimaryButton
            disabled={isLoading}
            onClick={onConfirm}
          >
            <ButtonLoadingContent
              actionContent="Confirm Delete"
              isLoading={isLoading}
            />
          </StatusAlert.Buttons.PrimaryButton>
        </StatusAlert.Buttons>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DeleteEquivalentInventoryItem;
