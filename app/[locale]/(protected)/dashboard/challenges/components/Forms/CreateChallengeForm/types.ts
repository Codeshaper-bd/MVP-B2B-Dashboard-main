import { type DateRange } from "react-day-picker";
import type { UseFormReset } from "react-hook-form";

import type {
  TChallenge,
  TChallengeType,
  TCreateAChallengeMutation,
  TCreateChallengeRes,
  TUpdateAChallengeMutation,
  TUpdateAChallengeRes,
} from "@/store/api/challenges/challenges.types";
import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type { TUseDialogContextReturnType } from "@/components/CustomizedDialog/DialogContext";
import { type TFoodCardProps } from "@/components/FoodSelectContent/FoodCardList/FoodCard";
import type { usePathname, useRouter } from "@/components/navigation";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

import type { TCreateChallengeFormProps } from ".";

export interface TChallengeTypeOption {
  label: string;
  value: TChallengeType;
}

export interface IChallengeFormData {
  // common fields
  name: string;
  dateRange: DateRange | undefined;
  pointesEarned: number;
  description: string;

  // type specific fields
  typeOfChallenge: TChallengeTypeOption | undefined;
  amountSpent: number;
  numberOfFriends: number;
  purchaseQuantity: number;
  checkInTime: string | undefined;
  item: TFoodCardProps | undefined;
  maxRedemptionPerNight?: number;
}

export type THandleChallengeSubmitReturnType =
  | {
      mode: `${EChallengeFormMode.SERVER_CREATE}`;
      data: TCreateChallengeRes | TNullish;
    }
  | {
      mode: `${EChallengeFormMode.SERVER_EDIT}`;
      data: TUpdateAChallengeRes | TNullish;
    }
  | {
      mode: `${EChallengeFormMode.LOCAL_CREATE}`;
      data: IChallengeFormData | TNullish;
    }
  | {
      mode: `${EChallengeFormMode.LOCAL_EDIT}`;
      data: IChallengeFormData | TNullish;
    }
  | TNullish;

export type THandleChallengeSubmit = (
  props: {
    reset?: UseFormReset<IChallengeFormData>;
    dialogHookProps?: TUseDialogContextReturnType;
    toastHookProps?: TUseToastReturnType;
    createChallenge?: TCreateAChallengeMutation;
    updateAChallenge?: TUpdateAChallengeMutation;
    pathNameHookProps?: ReturnType<typeof usePathname>;
    routerHookProps?: ReturnType<typeof useRouter>;
  } & TCreateChallengeFormProps,
) => (
  data: IChallengeFormData,
  event?: React.BaseSyntheticEvent,
) => Promise<THandleChallengeSubmitReturnType>;

export type TCreateAChallengeHandler = (
  props: {
    data: IChallengeFormData;
    reset: UseFormReset<IChallengeFormData>;
    dialogHookProps: TUseDialogContextReturnType;
    toastHookProps: TUseToastReturnType;
    setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    createChallenge: TCreateAChallengeMutation;
    onSuccess?: (data: TChallenge) => void;
  } & TModalWorkMode,
) => Promise<void>;

export type TUpdateAChallengeHandler = (
  props: {
    data: IChallengeFormData;
    editItemSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
    reset: UseFormReset<IChallengeFormData>;
    dialogHookProps: TUseDialogContextReturnType;
    toastHookProps: TUseToastReturnType;
    setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
    updateAChallenge: TUpdateAChallengeMutation;
    onSuccess?: (data: TChallenge) => void;
  } & TModalWorkMode,
) => Promise<void>;

export enum EChallengeFormMode {
  LOCAL_CREATE = "local-create",
  LOCAL_EDIT = "local-edit",
  SERVER_CREATE = "server-create",
  SERVER_EDIT = "server-edit",
}

export type TModalWorkMode =
  | {
      mode: `${EChallengeFormMode.LOCAL_CREATE}`;
      isProductMode?: boolean;
      onLocalCreateSuccess?: (data: IChallengeFormData) => void;
      disableToast?: boolean;
    }
  | {
      mode: `${EChallengeFormMode.LOCAL_EDIT}`;
      isProductMode?: boolean;
      onLocalEditSuccess?: (data: IChallengeFormData) => void;
      disableToast?: boolean;
      editItemData: IChallengeFormData | TNullish;
    }
  | {
      mode: `${EChallengeFormMode.SERVER_CREATE}`;
      onServerCreateSuccess?: (data: IChallengeFormData) => void;
    }
  | {
      mode: `${EChallengeFormMode.SERVER_EDIT}`;
      editItemSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
      onServerEditSuccess?: (data: IChallengeFormData) => void;
    };

export type TGetChallengeApiDataToFormData = (props: {
  getAChallengeData: TChallenge | TNullish;
  callBack?: (data: IChallengeFormData) => void;
}) => IChallengeFormData | undefined;
