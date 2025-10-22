import type { TExternalState } from "@/hooks/useBooleanState";
import type {
  TChallenge,
  TDeleteAChallengeMutation,
  TUpdateAChallengeMutation,
} from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TCallbackData } from "@/components/features/cards/ItemCardList/ItemCard";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

export type THandleOnOpenChange = (props: {
  setEditModalState: React.Dispatch<
    React.SetStateAction<boolean | void | null | undefined>
  >;
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
}) => React.Dispatch<React.SetStateAction<boolean | void | null | undefined>>;

export type THandleClearData = (props: {
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setIsDeleting?: React.Dispatch<React.SetStateAction<boolean>>;
}) => () => void;

export type THandleDeleteButtonClick = (props: {
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setIsDeleteAlertOpen: (props: Partial<TExternalState> | void) => () => void;
}) => (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: TCallbackData,
) => void;

export type THandleEditButtonClick = (props: {
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setEditModalOpen: (props: Partial<TExternalState> | void) => () => void;
}) => (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: TCallbackData,
) => void;
export type THandleViewButtonClick = (props: {
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setViewModalOpen: (props: Partial<TExternalState> | void) => () => void;
}) => (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: TCallbackData,
) => void;
export type THandleViewEventsButtonClick = (props: {
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setViewEventModalOpen: (props: Partial<TExternalState> | void) => () => void;
}) => (
  _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: TCallbackData,
) => void;

// api calls
export type THandleOnSwitchChange = (props: {
  toastProps: TUseToastReturnType;
  updateAChallenge: TUpdateAChallengeMutation;
  currentChallengeData: TChallenge | TNullish;
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setSwitchConfirmationModalOpen: (
    props: Partial<TExternalState> | void,
  ) => () => void;
  checkChallengeActiveEvents: (challengeSlug: string) => Promise<boolean>;
}) => (checked: boolean, data: TCallbackData) => Promise<void>;

export type THandleDelete = (props: {
  toastProps: TUseToastReturnType;
  deleteAChallenge: TDeleteAChallengeMutation;
  data: TCallbackData | undefined;
  setIsDeleteAlertClose: (props: Partial<TExternalState> | void) => () => void;
  setCardData: React.Dispatch<React.SetStateAction<TCallbackData | undefined>>;
  setIsDeleting?: React.Dispatch<React.SetStateAction<boolean>>;
}) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
