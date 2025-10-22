import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateAGroupDiscountMutation,
  useDeleteAGroupDiscountMutation,
  useUpdateAGroupDiscountMutation,
} from "./group-discounts-api";
import type { TDiscountType } from "../discounts/discounts.types";

/**
|--------------------------------------------------
| Create GroupDiscount Start
|--------------------------------------------------
*/

export type TCreateGroupDiscountArgs = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  type: TDiscountType;
  amount: number;
  minQty: number;
  maxQty: number;
};

export type TGroupDiscount = TCreateGroupDiscountArgs & {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type TCreateGroupDiscountRes = TApiResponse<TGroupDiscount>;

export type TCreateAGroupDiscountMutation = ReturnType<
  typeof useCreateAGroupDiscountMutation
>[0];

/**
|--------------------------------------------------
| Create GroupDiscount End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All GroupDiscount Start
|--------------------------------------------------
*/
export type TGetAllGroupDiscountArgs = TPaginationArgs<
  TGroupDiscount,
  {
    eventId?: TIdOrSlugOrIdentifier<"id">["id"];
    discountType?: TDiscountType;
  }
>;

export type TGetAllGroupDiscountRes = TApiResponse<TGroupDiscount[]>;

/**
|--------------------------------------------------
| Get All GroupDiscount End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A GroupDiscount Start
|--------------------------------------------------
*/
export type TGetAGroupDiscountArgs = TIdOrSlugOrIdentifier<"id">;

export type TGetAGroupDiscountRes = TApiResponse<TGroupDiscount>;
/**
|--------------------------------------------------
| Get A GroupDiscount End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A GroupDiscount Start
|--------------------------------------------------
*/
export type TUpdateAGroupDiscountArgs = TUpdateOptionalArgs<
  TCreateGroupDiscountArgs,
  "id"
>;

export type TUpdateAGroupDiscountRes = TApiResponse<TGroupDiscount>;

export type TUpdateAGroupDiscountMutation = ReturnType<
  typeof useUpdateAGroupDiscountMutation
>[0];
/**
|--------------------------------------------------
| Update A GroupDiscount End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete GroupDiscount Start
|--------------------------------------------------
*/
export type TDeleteAGroupDiscountArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteAGroupDiscountRes = TApiResponse<null>;

export type TDeleteAGroupDiscountMutation = ReturnType<
  typeof useDeleteAGroupDiscountMutation
>[0];
/**
|--------------------------------------------------
| Delete GroupDiscount End
|--------------------------------------------------
*/
