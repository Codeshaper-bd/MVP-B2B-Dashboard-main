"use client";
import { useRouter } from "next/navigation";

import useBooleanState from "@/hooks/useBooleanState";
import { localStorageUtil } from "@/lib/localStorageUtil";
import SettingsIcon from "@/components/icons/sidebar/SettingsIcon";
import { Button } from "@/components/ui/button";

import DraftSaveDialog from "../../../../draft-save-dialog";
import { useEventStepperForm } from "../../../../useEventStepperForm";

function ConfigurePromotion() {
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
  const { handleNext } = useEventStepperForm();
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Button
        className="h-10 bg-secondary text-primary"
        onClick={setOpenDraftSaveDialog()}
        type="button"
      >
        <SettingsIcon className="me-2 h-4 w-4" /> Configure Promotions
      </Button>

      <DraftSaveDialog
        open={isDraftSaveDialogOpen}
        setOpen={setCloseDraftSaveDialog()}
        handleCancelSaveAsDraft={async () => {
          try {
            setDraftSaveActionInProgress()();
            const response =
              await localStorageUtil.removeItemAsync("promotions");
            if (!response?.success) {
              throw new Error("Failed to remove promotions from local storage");
            }
            setCloseDraftSaveDialog()();
            router.push("/en/dashboard/promotions/view-more-promotion");
          } catch (error) {
            console.error(error);
          } finally {
            setDraftSaveActionCompleted()();
          }
        }}
        handleSaveAsDraft={async () => {
          setDraftSaveActionInProgress()();
          const response = await handleNext();
          setDraftSaveActionCompleted()();

          if (response) {
            setCloseDraftSaveDialog()();
            router.push("/en/dashboard/promotions/view-more-promotion");
          }
        }}
        isLoading={isDraftSaveActionInProgress}
      />
    </div>
  );
}

export default ConfigurePromotion;
