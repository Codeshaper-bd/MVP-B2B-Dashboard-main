"üse client";

import type { CellContext } from "@tanstack/react-table";
import { useState } from "react";

import { getApiErrorMessages } from "@/lib/error/get-api-error-message";
import { cn } from "@/lib/utils";
import { useUpdateAFennecLiveB2BChallengesMutation } from "@/store/api/fennec-live/fennec-live-api";
import type { TGetFennecLiveB2BChallenges } from "@/store/api/fennec-live/fennec-live.types";
import ButtonLoadingContent from "@/components/Buttons/ButtonLoadingContent";
import { InfoIcon as InfoIcon } from "@/components/icons";
import StatusAlert from "@/components/StatusAlert";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function ActionCell({
  row: { original },
}: CellContext<TGetFennecLiveB2BChallenges, unknown>) {
  // data
  const isActive = original?.isActive;
  const [updateAFennecLiveB2BChallenges, { isLoading }] =
    useUpdateAFennecLiveB2BChallengesMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleToggleModal = () => setIsModalOpen(true);
  const { toast } = useToast();
  // update api data
  const updateToggleIsActive = async () => {
    const toastId = toast({
      variant: "loading",
      title: "Updating Challenge Status",
      description: "Please wait while we update challenge status.",
    });
    try {
      await updateAFennecLiveB2BChallenges({
        body: {
          id: original?.id,
          isActive: !isActive,
        },
      }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Challenge Status Updated",
        description: "Challenge status has been updated successfully.",
      });
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "destructive",
        ...getApiErrorMessages({
          error,
          title: "Error Updating Challenge Status",
          description: "An error occurred while updating challenge status",
        }),
      });
    }
  };
  return (
    <div className={cn("flex w-fit items-center gap-9")}>
      <Button
        variant="ghost"
        onClick={() => handleToggleModal()}
        color={isActive ? "destructive" : "success"}
        className="text-sm font-semibold"
      >
        {isActive ? "Deactivate" : "Activate"}
      </Button>
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <StatusAlert
          status={isActive ? "destructive" : "success"}
          withCloseButton
          icon={<InfoIcon className="size-5" />}
          title={
            isActive ? "Are you sure deactivate?" : "Are you sure activate?"
          }
          description=""
        >
          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              fullWidth
              color="secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              fullWidth
              color={isActive ? "destructive" : "success"}
              onClick={updateToggleIsActive}
              disabled={isLoading}
            >
              <ButtonLoadingContent
                isLoading={isLoading}
                actionContent={isActive ? "Deactivate" : "Activate"}
              />
            </Button>
          </div>
        </StatusAlert>
      </AlertDialog>
    </div>
  );
}

export default ActionCell;
