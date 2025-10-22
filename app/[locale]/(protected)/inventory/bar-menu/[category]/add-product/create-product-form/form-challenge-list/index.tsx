"use client";

import dayjs from "dayjs";
import { useState } from "react";

import EditChallengeModal from "@/app/[locale]/(protected)/dashboard/challenges/components/Modals/EditChallengeModal";
import useBooleanState from "@/hooks/useBooleanState";
import { useDeleteAChallengeMutation } from "@/store/api/challenges/challenges-api";
import type { TNullish } from "@/store/api/common-api-types";
import RenderData from "@/components/render-data";
import LabelErrorWrapper from "@/components/ui/LabelErrorWrapper";

import ChallengeCard from "../challenge/challenge-card";
import type { TChallengeFormState } from "../types";
import type { IFormChallengeListProps } from "./types";
import { handleDeleteChallenge, handleUpdateChallenge } from "./utils";

function FormChallengeList({
  challenges,
  formErrors,
  setValue,
  isEditMode,
  challengesApiState,
}: IFormChallengeListProps) {
  const [deleteChallenge] = useDeleteAChallengeMutation();
  const {
    state: isEditModalOpen,
    setState: setEditModalState,
    setOpen: setEditModalOpen,
    setClose: setEditModalClose,
  } = useBooleanState();
  const [targetData, setTargetData] = useState<TChallengeFormState | TNullish>(
    null,
  );

  return (
    <LabelErrorWrapper
      label="Challenges"
      error={
        formErrors?.challenges?.message || formErrors?.challenges?.root?.message
      }
    >
      <RenderData
        isError={challengesApiState?.isError || false}
        isLoading={challengesApiState?.isLoading || false}
        isFetching={challengesApiState?.isFetching || false}
        error={challengesApiState?.error || null}
        isSuccess
        expectedDataType="array"
        data={challenges ?? []}
      >
        <div className="space-y-3">
          {challenges?.map((challenge) => (
            <ChallengeCard
              key={challenge?.formIdentifier}
              item={{
                id: challenge?.formIdentifier,
                title: challenge?.name,
                points: String(challenge?.pointesEarned ?? "N/A"),
                description: challenge?.description,
                duration:
                  challenge?.dateRange?.from && challenge?.dateRange?.to
                    ? `${dayjs(challenge?.dateRange?.to).diff(dayjs(challenge?.dateRange?.from), "days")} days`
                    : "N/A",
              }}
              enableChallengeActions
              deleteDiscountHandler={handleDeleteChallenge({
                challenge,
                challenges,
                setValue,
                deleteChallenge,
              })}
              editDiscountHandler={handleUpdateChallenge({
                challenge,
                challenges,
                setValue,
                setTargetData,
                setEditModalOpen,
              })}
            />
          ))}
        </div>
      </RenderData>

      {/* {targetData?.mode === "edit" ? null : (
        // <EditChallengeModal
        //   mode="server-edit"
        //   editItemSlug={targetData?.slug}
        //   open={isEditModalOpen}
        //   onOpenChange={setEditModalState}
        // />
      )} */}
      <EditChallengeModal
        mode="local-edit"
        isProductMode
        editItemData={targetData}
        open={isEditModalOpen}
        onOpenChange={setEditModalState}
        onLocalEditSuccess={(data) => {
          const updatedChallenges = challenges?.map((challenge) => {
            if (challenge?.formIdentifier === targetData?.formIdentifier) {
              return { ...targetData, ...data };
            }
            return challenge;
          });
          setTargetData(null);
          setEditModalClose()();
          setValue("challenges", updatedChallenges);
        }}
      />
    </LabelErrorWrapper>
  );
}

export default FormChallengeList;
