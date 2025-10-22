import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateADiscountMutation,
  useDeleteADiscountMutation,
  useUpdateADiscountMutation,
} from "./discounts-api";

/**
|--------------------------------------------------
| Create Discount Start
|--------------------------------------------------
*/

export enum EDiscountModel {
  PRODUCT = "Product",
  EVENT = "Event",
}

export type TDiscountModel = `${EDiscountModel}`;

export enum EDiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "FIXED_AMOUNT",
}

export type TDiscountType = `${EDiscountType}`;

export type TCreateDiscountArgs = {
  model: TDiscountModel;
  modelId: TIdOrSlugOrIdentifier["id"];
  name: string;
  code: string;
  expireDate: string;
  discountType: TDiscountType;
  amount: number;
  maxNumberOfRedemptions: number;
  maxTicketsPerRedemption: number;
  isDisabled?: boolean;
};

export type TDiscount = TCreateDiscountArgs & {
  id: number;
  redeemedCount?: number | TNullish;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  urlWithDiscountCode?: string | TNullish;
  totalTickets?: number | TNullish;
};

export type TCreateDiscountRes = TApiResponse<TDiscount>;

export type TCreateADiscountMutation = ReturnType<
  typeof useCreateADiscountMutation
>[0];

/**
|--------------------------------------------------
| Create Discount End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Discount Start
|--------------------------------------------------
*/
export type TGetAllDiscountArgs = TPaginationArgs<
  TDiscount,
  {
    model?: TDiscountModel;
    modelId?: TIdOrSlugOrIdentifier["id"];
    discountType?: TDiscountType;
  }
>;

export type TGetAllDiscountRes = TApiResponse<TDiscount[]>;

/**
|--------------------------------------------------
| Get All Discount End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Discount Start
|--------------------------------------------------
*/
export type TGetADiscountArgs = TIdOrSlugOrIdentifier<"id">;

export type TGetADiscountRes = TApiResponse<TDiscount>;
/**
|--------------------------------------------------
| Get A Discount End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A Discount Start
|--------------------------------------------------
*/
export type TUpdateADiscountArgs = TUpdateOptionalArgs<
  TCreateDiscountArgs,
  "id"
>;

export type TUpdateADiscountRes = TApiResponse<TDiscount>;

export type TUpdateADiscountMutation = ReturnType<
  typeof useUpdateADiscountMutation
>[0];
/**
|--------------------------------------------------
| Update A Discount End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Discount Start
|--------------------------------------------------
*/
export type TDeleteADiscountArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteADiscountRes = TApiResponse<null>;

export type TDeleteADiscountMutation = ReturnType<
  typeof useDeleteADiscountMutation
>[0];
/**
|--------------------------------------------------
| Delete Discount End
|--------------------------------------------------
*/
