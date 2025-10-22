import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import InfoIcon from "@/components/icons/InfoIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";

export interface IDeleteConfirmationDialog {
  open: boolean;
  setOpen?: (value: boolean) => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

function DeleteConfirmationDialog({
  open,
  setOpen,
  onConfirm,
  isLoading,
}: IDeleteConfirmationDialog) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        status="destructive"
        withCloseButton
        disableInternallyClose
        onClose={() => setOpen?.(false)}
        icon={<InfoIcon className="size-5" />}
        title="Delete Discount"
        description="Are you sure you want to delete this discount? This action cannot be undone."
      >
        <StatusAlert.Buttons.SecondaryButton
          onClick={() => setOpen?.(false)}
          disabled={isLoading}
        >
          Close
        </StatusAlert.Buttons.SecondaryButton>

        <StatusAlert.Buttons.PrimaryButton
          onClick={() => {
            onConfirm?.();
          }}
          disabled={isLoading}
        >
          <ButtonLoadingContent
            isLoading={isLoading}
            actionContent="Continue"
          />
        </StatusAlert.Buttons.PrimaryButton>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DeleteConfirmationDialog;
