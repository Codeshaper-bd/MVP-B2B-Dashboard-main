"üse client";
import type { CellContext } from "@tanstack/react-table";
import { memo, useCallback } from "react";
import {
  useFormContext,
  useWatch,
  type UseFormSetValue,
} from "react-hook-form";

import EditChallengeModal from "@/app/[locale]/(protected)/dashboard/challenges/components/Modals/EditChallengeModal";
import useBooleanState from "@/hooks/useBooleanState";
import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditPenIcon from "@/components/icons/EditPenIcon";

import type { IStepFormInputs } from "../../../../type";

function ActionCell({ row: { original } }: CellContext<TChallenge, unknown>) {
  const {
    state: isEditModalOpen,
    setOpen: setIsEditModalOpen,
    setClose: setIsEditModalClose,
  } = useBooleanState();

  const { setValue, control } = useFormContext<IStepFormInputs>();

  const challengesFormState = useWatch({
    control,
    name: "challenges",
    defaultValue: [],
  });

  const handleDeleteClick = useCallback(
    ({
      actionData,
      challengesFormState,
      setValue,
    }: {
      actionData: TChallenge;
      challengesFormState: TChallenge[] | TNullish;
      setValue: UseFormSetValue<IStepFormInputs>;
    }) =>
      async () => {
        try {
          const updatedChallenges = challengesFormState?.filter(
            (challenge) => challenge?.id !== actionData?.id,
          );

          if (!updatedChallenges?.length) {
            const deleteALocalChallengeRes =
              await localStorageUtil.removeItemAsync("challenges");
            if (!deleteALocalChallengeRes?.success) {
              throw new Error("Error deleting challenge from local storage");
            }
            setValue("challenges", null);
          } else {
            const deleteLocalChallengesRes =
              await localStorageUtil.setItemAsync<TChallenge[]>(
                "challenges",
                updatedChallenges,
              );
            if (!deleteLocalChallengesRes?.success) {
              throw new Error("Error updating challenges in local storage");
            }
            setValue("challenges", updatedChallenges);
          }
        } catch (error) {
          console.error("🚀 ~ error:", error);
        }
      },
    [],
  );

  return (
    <div className="flex w-fit items-center gap-1">
      <div className="flex size-[40px] items-center justify-end">
        <EditPenIcon
          onClick={setIsEditModalOpen()}
          className="size-[20px] shrink-0 cursor-pointer hover:text-primary"
        />

        <EditChallengeModal
          mode="server-edit"
          editItemSlug={original?.slug}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalClose()}
          onSuccess={async (data) => {
            try {
              let isExisting: boolean = false;
              let updatedChallenges = challengesFormState?.map((challenge) => {
                // update mode
                if (
                  !!challenge?.id &&
                  !!data?.id &&
                  challenge?.id === data?.id
                ) {
                  isExisting = true;
                  return data;
                }

                return challenge;
              });

              // create mode
              if (!isExisting) {
                updatedChallenges = [
                  ...(Array.isArray(updatedChallenges)
                    ? updatedChallenges
                    : []),
                  data,
                ];
              }

              if (updatedChallenges?.length) {
                const localUpdatedChallengesRes =
                  await localStorageUtil.setItemAsync<TChallenge[]>(
                    "challenges",
                    updatedChallenges,
                  );
                if (!localUpdatedChallengesRes?.success) {
                  throw new Error("Error updating challenges in local storage");
                }
                setValue("challenges", updatedChallenges);
              }
            } catch (error) {
              console.error("🚀 ~ error:", error);
            }
          }}
        />
      </div>

      <div className="flex size-[40px] items-center justify-end">
        <DeleteIcon
          onClick={handleDeleteClick({
            actionData: original,
            challengesFormState,
            setValue,
          })}
          className="size-[20px] shrink-0 cursor-pointer hover:text-destructive"
        />
      </div>
    </div>
  );
}

export default memo(ActionCell);
