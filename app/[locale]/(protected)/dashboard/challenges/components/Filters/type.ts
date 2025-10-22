import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type {
  TChallengeType,
  TGetTotalEngagementOfChallengeArgs,
} from "@/store/api/challenges/challenges.types";
import type { TNullish } from "@/store/api/common-api-types";

export type TFilterOption = {
  label: string;
  value: TChallengeType;
};

export type THandleSubmit = (props: {
  setChallengeType: (
    value: React.SetStateAction<TFilterOption | TNullish>,
  ) => void;
  challengeType: TFilterOption | TNullish;
  closeFilter: () => void;
  setError: (value: React.SetStateAction<string | TNullish>) => void;
  manageStateParamsProps: TUseManageStateParamsReturnType<
    Exclude<TGetTotalEngagementOfChallengeArgs, void>
  >;
}) => React.FormEventHandler<HTMLFormElement>;

export type TFiltersProps = {
  manageStateParamsProps: TUseManageStateParamsReturnType<
    Exclude<TGetTotalEngagementOfChallengeArgs, void>
  >;
};
