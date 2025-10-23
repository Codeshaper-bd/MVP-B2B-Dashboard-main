"use client";

import { memo } from "react";

import useBooleanState from "@/hooks/useBooleanState";
import type { TChallenge } from "@/store/api/challenges/challenges.types";
import { PlusIcon as PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import ChallengesContent from "./challenges-content";
import { useChallengeContext } from "../challenge-context";

function AddChallengeDialog() {
  const {
    state: isAddChallengeOpen,
    setOpen: setAddChallengeOpen,
    setClose: setAddChallengeClose,
  } = useBooleanState();

  const { addChallenge, challenges } = useChallengeContext();

  const handleAddChallenge = (Challenge: TChallenge) => {
    addChallenge(Challenge);
  };

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
          selectedChallenges={challenges}
          onToggleChallengeSelect={handleAddChallenge}
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddChallengeDialog);
