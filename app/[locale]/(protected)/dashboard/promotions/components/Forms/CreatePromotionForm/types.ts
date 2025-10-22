import { type DateRange } from "react-day-picker";
import type { UseFormReturn } from "react-hook-form";

import type { TIdOrSlugOrIdentifier } from "@/store/api/common-api-types";
import type { TDiscountType } from "@/store/api/discounts/discounts.types";
import type {
  TCreateAPromotionMutation,
  TPromotion,
  TPromotionType,
  TUpdateAPromotionMutation,
} from "@/store/api/promotion/promotion.types";
import type { TUseDialogContextReturnType } from "@/components/CustomizedDialog/DialogContext";
import { type TFoodCardProps } from "@/components/FoodSelectContent/FoodCardList/FoodCard";
import type { usePathname, useRouter } from "@/components/navigation";
import type { TUseToastReturnType } from "@/components/ui/use-toast";

export interface TPromotionTypeOption {
  label: string;
  value: TPromotionType;
}
export interface TDiscountTypeOption {
  label: string;
  value: TDiscountType;
}

export interface IPromotionFormData {
  promotionName: string;
  typeOfPromotion: TPromotionType | undefined;
  promotionDuration: DateRange | undefined;
  description: string;
  buy: number;
  free: number;
  product: TFoodCardProps | undefined;
  discountType: TDiscountType | undefined;
  discount: number;
  pointsNeeded: number;
  maxRedemptionPerNight?: number;
  isPrivate?: boolean;
}

export type TOnFormSubmitReturnType = {
  formData: IPromotionFormData | null;
  apiResData: TPromotion | null;
  success: boolean;
};

export type THandlePromotionSubmit = (props: {
  createPromotionFormProps: UseFormReturn<IPromotionFormData>;
  dialogHookProps: TUseDialogContextReturnType;
  toastHookProps: TUseToastReturnType;
  pathnameHookProps: ReturnType<typeof usePathname>;
  routerHookProps: ReturnType<typeof useRouter>;
  createAPromotion: TCreateAPromotionMutation;
  updateAPromotion: TUpdateAPromotionMutation;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode?: boolean;
  editItemSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  onSuccess?: (data: TPromotion) => void;
}) => (
  data: IPromotionFormData,
  event?: React.BaseSyntheticEvent,
) => TOnFormSubmitReturnType | Promise<TOnFormSubmitReturnType>;

export interface ICreatePromotionFormProps {
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode?: boolean;
  editItemSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  onSuccess?: (data: TPromotion) => void;
}
