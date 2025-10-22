import type {
  TIdOrSlugOrIdentifier,
  TNullish,
} from "@/store/api/common-api-types";
import type {
  TCreateAGroupDiscountMutation,
  TCreateGroupDiscountArgs,
  TUpdateAGroupDiscountMutation,
} from "@/store/api/group-discounts/group-discounts.types";
import { type TUseToastReturnType } from "@/components/ui/use-toast";

export type TGroupDiscountFormInput = Omit<TCreateGroupDiscountArgs, "eventId">;

export type THandleGroupDiscountSubmit = (props: {
  toastProps: TUseToastReturnType;
  createAGroupDiscount: TCreateAGroupDiscountMutation;
  updateAGroupDiscount: TUpdateAGroupDiscountMutation;
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  isEditMode: boolean | TNullish;
  groupDiscountId: TIdOrSlugOrIdentifier<"id">["id"];
}) => (data: TGroupDiscountFormInput) => Promise<void>;
