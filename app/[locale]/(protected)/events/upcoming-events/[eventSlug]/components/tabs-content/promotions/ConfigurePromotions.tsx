"use client";
import { useRouter } from "next/navigation";

import useBooleanState from "@/hooks/useBooleanState";
import SettingsIcon from "@/components/icons/sidebar/SettingsIcon";
import DraftSaveDialog from "@/components/modules/event/modals/DraftSaveDialog";
import { Button } from "@/components/ui/button";

interface IConfigurePromotionProps {
  onSave?: () => Promise<boolean>;
  haveChanges?: boolean;
}

function ConfigurePromotion({ onSave, haveChanges }: IConfigurePromotionProps) {
  const {
    state: isDraftSaveActionInProgress,
    setClose: setDraftSaveActionCompleted,
    setOpen: setDraftSaveActionInProgress,
  } = useBooleanState();
  const {
    state: isDraftSaveDialogOpen,
    setClose: setCloseDraftSaveDialog,
    setOpen: setOpenDraftSaveDialog,
  } = useBooleanState();
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Button
        className="h-10 bg-secondary text-primary"
        onClick={
          haveChanges
            ? setOpenDraftSaveDialog()
            : () => router.push("/en/dashboard/promotions/view-more-promotion")
        }
        type="button"
      >
        <SettingsIcon className="me-2 h-4 w-4" /> Configure Promotions
      </Button>

      <DraftSaveDialog
        open={isDraftSaveDialogOpen}
        setOpen={setCloseDraftSaveDialog()}
        title="Save before leaving?"
        description="You are about to leave the promotion update process. Do you want to save your current progress before configuring promotions?"
        actionContent={"Save and Continue"}
        handleCancelSaveAsDraft={async () => {
          router.push("/en/dashboard/promotions/view-more-promotion");
        }}
        handleSaveAsDraft={async () => {
          setDraftSaveActionInProgress()();

          const res = await onSave?.();
          if (!res) {
            setDraftSaveActionCompleted()();
            return;
          }

          setDraftSaveActionCompleted()();
          setCloseDraftSaveDialog()();
          router.push("/en/dashboard/promotions/view-more-promotion");
        }}
        isLoading={isDraftSaveActionInProgress}
      />
    </div>
  );
}

export default ConfigurePromotion;
