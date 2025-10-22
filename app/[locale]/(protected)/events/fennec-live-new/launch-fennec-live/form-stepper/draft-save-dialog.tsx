"use client";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import DraftIcon from "@/components/icons/DraftIcon";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DraftSaveDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSaveAsDraft?: () => void;
  handleCancelSaveAsDraft?: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  actionContent?: string;
}

function DraftSaveDialog({
  open,
  setOpen,
  handleSaveAsDraft,
  handleCancelSaveAsDraft,
  isLoading,
  title = "Save As Draft?",
  description = "You are about to leave the event creation process. Do you want to save your current progress as a draft before configuring challenges?",
  actionContent = "Save As Draft",
}: DraftSaveDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <StatusAlert
        icon={<DraftIcon className="size-6" />}
        title={title}
        description={description}
        disableInternallyClose
        withCloseButton
        onClose={() => {
          if (!isLoading) {
            setOpen(false);
          }
        }}
      >
        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            size="lg"
            type="button"
            fullWidth
            onClick={() => {
              handleCancelSaveAsDraft?.();
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            size="lg"
            fullWidth
            type="button"
            color="primary"
            onClick={() => {
              handleSaveAsDraft?.();
            }}
            disabled={isLoading}
          >
            <ButtonLoadingContent
              isLoading={isLoading}
              actionContent={actionContent}
            />
          </Button>
        </div>
      </StatusAlert>
    </AlertDialog>
  );
}

export default DraftSaveDialog;
