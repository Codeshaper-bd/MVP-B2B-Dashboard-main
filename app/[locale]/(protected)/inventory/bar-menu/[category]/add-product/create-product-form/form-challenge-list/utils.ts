import type { THandleDeleteChallenge, THandleUpdateChallenge } from "./types";

export const handleUpdateChallenge: THandleUpdateChallenge =
  ({ challenge, challenges, setTargetData, setEditModalOpen, setValue }) =>
  () => {
    setTargetData?.(challenge);
    setEditModalOpen?.()?.();
  };

export const handleDeleteChallenge: THandleDeleteChallenge =
  ({ challenge, challenges, setValue, deleteChallenge }) =>
  async () => {
    try {
      if (challenge?.mode === "edit") {
        await deleteChallenge?.({
          slug: challenge?.slug,
        }).unwrap();
      }
      const newChallenges = challenges?.filter(
        (item) => item?.formIdentifier !== challenge?.formIdentifier,
      );
      setValue("challenges", newChallenges);
    } catch (error) {
      console.error("Error deleting challenge:", error);
      // Handle error if needed
    }
  };
