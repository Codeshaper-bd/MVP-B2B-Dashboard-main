import { compareDateTimes } from "@/lib/date-time/compare-date-times";
import { getApiErrorMessages } from "@/lib/error/get-api-error-message";

import type {
  THandleClearData,
  THandleDelete,
  THandleDeleteButtonClick,
  THandleEditButtonClick,
  THandleOnOpenChange,
  THandleOnSwitchChange,
  THandleViewButtonClick,
  THandleViewEventsButtonClick,
} from "./types";

export const handleOnOpenChange: THandleOnOpenChange =
  ({ setCardData, setEditModalState }) =>
  (value) => {
    setEditModalState?.(value);
    setCardData(undefined);
  };

export const handleClearData: THandleClearData =
  ({ setCardData, setIsDeleting }) =>
  () => {
    setCardData(undefined);
    setIsDeleting?.(false);
  };

export const handleDeleteButtonClick: THandleDeleteButtonClick =
  ({ setCardData, setIsDeleteAlertOpen }) =>
  (_, data) => {
    setCardData(data);
    setIsDeleteAlertOpen()();
  };

export const handleEditButtonClick: THandleEditButtonClick =
  ({ setCardData, setEditModalOpen }) =>
  (_, data) => {
    setCardData(data);
    setEditModalOpen?.()?.();
  };
export const handleViewButtonClick: THandleViewButtonClick =
  ({ setCardData, setViewModalOpen }) =>
  (_, data) => {
    setCardData(data);
    setViewModalOpen?.()?.();
  };
export const handleViewActiveEventButtonClick: THandleViewEventsButtonClick =
  ({ setCardData, setViewEventModalOpen }) =>
  (_, data) => {
    setCardData(data);
    setViewEventModalOpen?.()?.();
  };

export const handleOnSwitchChange: THandleOnSwitchChange =
  ({
    updateAChallenge,
    toastProps: { toast },
    currentChallengeData,
    setCardData,
    setSwitchConfirmationModalOpen,
    checkChallengeActiveEvents,
  }) =>
  async (_, data) => {
    setCardData(data);

    if (currentChallengeData?.status === "Active") {
      // Check if the challenge has active events before allowing deactivation
      const hasActiveEvents = await checkChallengeActiveEvents(
        data?.slug || "",
      );

      if (hasActiveEvents) {
        setSwitchConfirmationModalOpen?.()?.();
        return;
      }
    }

    const toastId = toast({
      title: "Updating Challenge Status",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      if (!data?.id) {
        throw new Error("Challenge ID is required to update challenge status");
      }

      const { status } = compareDateTimes({
        providedDateTime: currentChallengeData?.endDate,
        comparisonUnit: "seconds",
      });

      if (status !== "after") {
        // if (currentChallengeData?.status === "Active") {
        //   await updateAChallenge({
        //     slug: String(data.id),
        //     body: {
        //       status: data?.switchedOn ? "Inactive" : "Active",
        //     },
        //   }).unwrap();
        // }
        // If the challenge has expired, we cannot update its status
        toastId.update({
          id: toastId.id,
          variant: "error",
          title: "Cannot Activate Expired Challenge",
          description:
            "You cannot update this challenge because it has expired.",
        });

        return;
      }

      await updateAChallenge({
        slug: String(data.id),
        body: {
          status: !data.switchedOn ? "Active" : "Inactive",
        },
      }).unwrap();
      toastId.update({
        id: toastId.id,
        title: "Challenge Status Updated",
        description: "Challenge status has been updated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating challenge status:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Error Updating Challenge Status",
          description: "An error occurred while updating challenge status",
        }),
      });
    }
  };

export const handleDelete: THandleDelete =
  ({
    toastProps,
    data,
    deleteAChallenge,
    setIsDeleteAlertClose,
    setCardData,
    setIsDeleting,
  }) =>
  async () => {
    const toastId = toastProps.toast({
      title: "Deleting Challenge",
      description: "Please wait...",
      variant: "loading",
    });

    try {
      setIsDeleting?.(true);
      if (!data?.id) {
        throw new Error("Challenge ID is required to delete challenge");
      }

      await deleteAChallenge({ slug: String(data.id) }).unwrap();
      toastId.update({
        id: toastId.id,
        title: "Challenge Deleted",
        description: "Challenge has been deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting challenge:", error);
      toastId.update({
        id: toastId.id,
        variant: "error",
        ...getApiErrorMessages({
          error,
          title: "Challenge Deleted",
          description: "An error occurred while deleting challenge",
        }),
      });
    } finally {
      setIsDeleteAlertClose?.()?.();
      setCardData?.(undefined);
      setIsDeleting?.(false);
    }
  };
