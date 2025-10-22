"use client";
import { useRouter } from "next/navigation";

import useBooleanState from "@/hooks/useBooleanState";
import { localStorageUtil } from "@/lib/localStorageUtil";
import SettingsIcon from "@/components/icons/sidebar/SettingsIcon";
import DraftSaveDialog from "@/components/modules/event/modals/DraftSaveDialog";
import { Button } from "@/components/ui/button";

import { useEventStepperForm } from "../../../../useEventStepperForm";

function ConfigureChallenge() {
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
        <SettingsIcon className="me-2 h-4 w-4" /> Configure Challenges
      </Button>

      <DraftSaveDialog
        open={isDraftSaveDialogOpen}
        setOpen={setCloseDraftSaveDialog()}
        handleCancelSaveAsDraft={async () => {
          try {
            setDraftSaveActionInProgress()();
            const response =
              await localStorageUtil.removeItemAsync("challenges");
            if (!response?.success) {
              throw new Error("Failed to remove challenges from local storage");
            }
            setCloseDraftSaveDialog()();
            router.push("/en/dashboard/challenges/view-all-challenges");
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
            router.push("/en/dashboard/challenges/view-all-challenges");
          }
        }}
        isLoading={isDraftSaveActionInProgress}
      />
    </div>
  );
}

export default ConfigureChallenge;
