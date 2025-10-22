import { type UseFormReturn } from "react-hook-form";

import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type {
  TCreateADiscountMutation,
  TCreateDiscountArgs,
  TDiscountModel,
  TUpdateADiscountMutation,
} from "@/store/api/discounts/discounts.types";
import type { TEvent } from "@/store/api/events/events.types";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

export type TDiscountForm = Omit<
  TCreateDiscountArgs,
  "model" | "modelId" | "expireDate"
> & {
  expirationDate: Date;
  redeemedCount?: number;
};

export enum EDiscountFormMode {
  LOCAL_CREATE = "local-create",
  LOCAL_EDIT = "local-edit",
  SERVER_CREATE = "server-create",
  SERVER_EDIT = "server-edit",
}

export type TModalWorkMode =
  | {
      mode: `${EDiscountFormMode.LOCAL_CREATE}`;
      onLocalCreateSuccess?: (data: TDiscountForm) => void;
      disableToast?: boolean;
    }
  | {
      mode: `${EDiscountFormMode.LOCAL_EDIT}`;
      onLocalEditSuccess?: (data: TDiscountForm) => void;
      disableToast?: boolean;
      editItemData: TDiscountForm | TNullish;
    }
  | {
      mode: `${EDiscountFormMode.SERVER_CREATE}`;
      onServerCreateSuccess?: (data: TDiscountForm) => void;
      modelId?: TIdOrSlugOrIdentifier<"id">["id"];
      model: TDiscountModel;
    }
  | {
      mode: `${EDiscountFormMode.SERVER_EDIT}`;
      onServerEditSuccess?: (data: TDiscountForm) => void;
      discountId?: TIdOrSlugOrIdentifier<"id">["id"];
    };

export type TCreateOrEditDiscountFormProps = {
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  getAnEventData?: TNullish | TEvent;
} & TModalWorkMode;

export type THandleDiscountSubmit = (
  props: {
    toastHookProps?: TUseToastReturnType;
    formProps?: UseFormReturn<TDiscountForm>;
    createADiscount?: TCreateADiscountMutation;
    updateADiscount?: TUpdateADiscountMutation;
    setClose?: () => void;
  } & TCreateOrEditDiscountFormProps,
) => (data: TDiscountForm) => Promise<void>;
