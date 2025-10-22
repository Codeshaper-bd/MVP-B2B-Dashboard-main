"use client";

import { memo, useCallback } from "react";
import {
  useFormContext,
  useWatch,
  type UseFormSetValue,
} from "react-hook-form";

import useBooleanState from "@/hooks/useBooleanState";
import { localStorageUtil } from "@/lib/localStorageUtil";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import PlusIcon from "@/components/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import ChallengesContent from "./challenges-content";
import type { IStepFormInputs } from "../../../../type";

function AddChallengeDialog() {
  const {
    state: isAddChallengeOpen,
    setOpen: setAddChallengeOpen,
    setClose: setAddChallengeClose,
  } = useBooleanState();

  const { control, setValue } = useFormContext<IStepFormInputs>();

  const selectedChallenges = useWatch({
    control,
    name: "challenges",
    defaultValue: [],
  });

  const handleToggleChallengeSelect = useCallback(
    ({
      selectedChallenges,
      setValue,
    }: {
      selectedChallenges: TNullish | TChallenge[];
      setValue: UseFormSetValue<IStepFormInputs>;
    }) =>
      async (challenge: TChallenge) => {
        try {
          const selectedChallengesMap = new Map(
            selectedChallenges?.map((challenge) => [challenge.id, challenge]),
          );

          if (selectedChallengesMap.has(challenge.id)) {
            selectedChallengesMap.delete(challenge.id);
          } else {
            selectedChallengesMap.set(challenge.id, challenge);
          }

          const updatedChallengesArr = Array.from(
            selectedChallengesMap.values(),
          );

          if (!updatedChallengesArr?.length) {
            const updateLocalChallengesRes =
              await localStorageUtil.removeItemAsync("challenges");
            if (!updateLocalChallengesRes?.success) {
              throw new Error("Failed to remove challenges from local storage");
            }
            setValue("challenges", null);
          } else {
            const updateLocalChallengesRes =
              await localStorageUtil.setItemAsync(
                "challenges",
                updatedChallengesArr,
              );

            if (!updateLocalChallengesRes?.success) {
              throw new Error("Failed to update challenges in local storage");
            }
            setValue("challenges", updatedChallengesArr);
          }

          setValue("challenges", Array.from(selectedChallengesMap.values()));
        } catch (error) {
          console.error("Failed to toggle challenge select", error);
        }
      },
    [],
  );

  return (
    <Dialog open={isAddChallengeOpen} onOpenChange={setAddChallengeClose()}>
      <Button
        type="button"
        className="h-10 bg-secondary"
        onClick={setAddChallengeOpen()}
      >
        <PlusIcon className="me-2 h-4 w-4" /> Add Challenge
      </Button>

      <DialogContent className="p-0 md:max-w-[512px]" hideInternalClose>
        <ChallengesContent
          open={isAddChallengeOpen}
          setOpen={setAddChallengeClose()}
          selectedChallenges={selectedChallenges}
          onToggleChallengeSelect={handleToggleChallengeSelect({
            selectedChallenges,
            setValue,
          })}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddChallengeDialog);
