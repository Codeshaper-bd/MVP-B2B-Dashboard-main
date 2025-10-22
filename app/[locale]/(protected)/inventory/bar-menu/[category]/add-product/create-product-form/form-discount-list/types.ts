import type { FieldErrors, UseFormSetValue } from "react-hook-form";

import type { TExternalState } from "@/hooks/useBooleanState";
import type { TNullish } from "@/store/api/common-api-types";
import type { TDeleteADiscountMutation } from "@/store/api/discounts/discounts.types";
import type { IApiStateInfo } from "@/components/render-data";

import type { TBarMenuItemFormType, TDiscountFormState } from "../types";

export interface IFormDiscountListProps {
  discounts: TDiscountFormState[] | TNullish;
  formErrors: FieldErrors<TBarMenuItemFormType>;
  setValue: UseFormSetValue<TBarMenuItemFormType>;
  isEditMode?: boolean;
  discountsApiState?: IApiStateInfo;
}

export type THandleDeleteDiscount = (props: {
  discount: TDiscountFormState;
  discounts: TDiscountFormState[] | TNullish;
  setValue: UseFormSetValue<TBarMenuItemFormType>;
  deleteADiscount: TDeleteADiscountMutation;
}) => () => void;

export type THandleUpdateDiscount = (props: {
  discount: TDiscountFormState;
  discounts: TDiscountFormState[] | TNullish;
  setValue: UseFormSetValue<TBarMenuItemFormType>;
  setTargetData: React.Dispatch<
    React.SetStateAction<TNullish | TDiscountFormState>
  >;
  setEditModalOpen: (props: Partial<TExternalState> | void) => () => void;
}) => () => void;
