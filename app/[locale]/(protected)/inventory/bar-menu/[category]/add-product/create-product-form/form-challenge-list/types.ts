import type { FieldErrors, UseFormSetValue } from "react-hook-form";

import type { TExternalState } from "@/hooks/useBooleanState";
import type { TDeleteAChallengeMutation } from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { IApiStateInfo } from "@/components/render-data";

import type { TBarMenuItemFormType, TChallengeFormState } from "../types";

export interface IFormChallengeListProps {
  challenges: TChallengeFormState[] | TNullish;
  formErrors: FieldErrors<TBarMenuItemFormType>;
  setValue: UseFormSetValue<TBarMenuItemFormType>;
  isEditMode?: boolean;
  challengesApiState?: IApiStateInfo;
}

export type THandleDeleteChallenge = (props: {
  challenge: TChallengeFormState;
  challenges: TChallengeFormState[] | TNullish;
  setValue: UseFormSetValue<TBarMenuItemFormType>;
  deleteChallenge: TDeleteAChallengeMutation;
}) => () => void;

export type THandleUpdateChallenge = (props: {
  challenge: TChallengeFormState;
  challenges: TChallengeFormState[] | TNullish;
  setValue: UseFormSetValue<TBarMenuItemFormType>;
  setTargetData: React.Dispatch<
    React.SetStateAction<TNullish | TChallengeFormState>
  >;
  setEditModalOpen: (props: Partial<TExternalState> | void) => () => void;
}) => () => void;
