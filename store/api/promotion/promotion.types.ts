import type { TBarMenuItem } from "../bar-menu-item/bar-menu-item.types";
import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TTimeRange,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateAPromotionMutation,
  useDeleteAPromotionMutation,
  useUpdateAPromotionMutation,
} from "./promotion-api";
import type { TActiveEvent } from "../challenges/challenges.types";
import type { TDiscountType } from "../discounts/discounts.types";

/**
|--------------------------------------------------
| Create Promotion start
|--------------------------------------------------
*/
export enum EStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  EXPIRED = "Expired",
}

export type TStatus = `${EStatus}`;
export enum EPeriodType {
  ONE_TIME = "ONE_TIME",
  EVERY_DAY = "EVERY_DAY",
  EVERY_WEEK = "EVERY_WEEK",
  EVERY_MONTH = "EVERY_MONTH",
}

export type TPeriodType = `${EPeriodType}`;

export enum EPromotionType {
  BUY_X_GET_X_FREE = "BUY_X_GET_X_FREE",
  FREE_DRINK = "FREE_DRINK",
  APPLY_DISCOUNT = "APPLY_DISCOUNT",
}

export type TPromotionType = `${EPromotionType}`;

export type TCreatePromotionCommonArgs = {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  pointsNeeded: number;
  status?: TStatus;
  uses?: number;
  maxRedemptionPerNight?: number;
  isPrivate?: boolean;
  qrCode?: string;
};

export type TBuyXGetX = {
  type: `${EPromotionType.BUY_X_GET_X_FREE}`;
  productId: number;
  buyQuantity: number;
  freeQuantity: number;
};

export type TFreeDrink = {
  type: `${EPromotionType.FREE_DRINK}`;
  productId: number;
};

export type TApplyDiscount = {
  type: `${EPromotionType.APPLY_DISCOUNT}`;
  productId: number;
  discountType: TDiscountType;
  discountAmount: number;
};
export type TConditionalCreatePromotionArgs =
  | TBuyXGetX
  | TFreeDrink
  | TApplyDiscount;
export type TCreatePromotionArgs = TCreatePromotionCommonArgs &
  TConditionalCreatePromotionArgs;

export type TPromotion = TCreatePromotionCommonArgs & {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | TNullish;
  product: TBarMenuItem;
} & (
    | Omit<TBuyXGetX, "productId">
    | Omit<TFreeDrink, "productId">
    | Omit<TApplyDiscount, "productId">
  );

export type TCreatePromotionRes = TApiResponse<TPromotion>;

export type TCreateAPromotionMutation = ReturnType<
  typeof useCreateAPromotionMutation
>[0];

/**
|--------------------------------------------------
| Create Promotion end
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Promotions Start
|--------------------------------------------------
*/
export type TGetAllPromotionsArgs = TPaginationArgs<
  TPromotion,
  {
    status?: TStatus;
    type?: TPromotionType;
    startDate?: string;
    endDate?: string;
  }
>;

export type TGetAllPromotionsRes = TApiResponse<TPromotion[]>;

/**
|--------------------------------------------------
| Get All Promotions End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Promotion Start
|--------------------------------------------------
*/
export type TGetAPromotionArgs = TIdOrSlugOrIdentifier<"slug">;

export type TGetAPromotionRes = TApiResponse<TPromotion>;
/**
|--------------------------------------------------
| Get A Promotion End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A Promotion Start
|--------------------------------------------------
*/

export type TUpdateAPromotionArgs = TUpdateOptionalArgs<
  TCreatePromotionArgs,
  "slug"
>;

export type TUpdateAPromotionRes = TApiResponse<TPromotion>;

export type TUpdateAPromotionMutation = ReturnType<
  typeof useUpdateAPromotionMutation
>[0];
/**
|--------------------------------------------------
| Update A Promotion End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Promotion Start
|--------------------------------------------------
*/
export type TDeleteAPromotionArgs = TIdOrSlugOrIdentifier<"slug">;

export type TDeleteAPromotionRes = TApiResponse<null>;

export type TDeleteAPromotionMutation = ReturnType<
  typeof useDeleteAPromotionMutation
>[0];
/**
|--------------------------------------------------
| Delete Promotion End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Top Promotions Start
|--------------------------------------------------
*/

export type TTopPromotion = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string;
  totalRevenue: number;
  completed: number;
};

export type TGetTopPromotionQuery = {
  status?: TStatus;
  startDate?: string;
  endDate?: string;
};
export type TGetTopPromotionArgs = TPaginationArgs<TGetTopPromotionQuery>;
export type TGetTopPromotionsRes = TApiResponse<TTopPromotion[]>;
/**
|--------------------------------------------------
|  Get Top Promotions End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Total Engagement of Promotion Start
|--------------------------------------------------
*/

export type TTotalEngagementOfPromotion = {
  totalCount: number | TNullish;
  previousCount: number | TNullish;
  increase: boolean;
  percentage: number | TNullish;
};

export type TGetTotalEngagementOfPromotionArgs = TGetTopPromotionQuery;
export type TGetTotalEngagementOfPromotionRes =
  TApiResponse<TTotalEngagementOfPromotion>;

/**
|--------------------------------------------------
|  Get Total Engagement of Promotion End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Monthly Promotion Revenue Start
|--------------------------------------------------
*/

export type TGetMonthlyPromotionRevenueCategories = string[];
export type TGetMonthlyPromotionRevenueDataSeriesItem = {
  name: string;
  data: number[];
};
export type TGetMonthlyPromotionRevenueDataSeriesData = {
  categories: TGetMonthlyPromotionRevenueCategories;
  series: TGetMonthlyPromotionRevenueDataSeriesItem[];
};

export type TGetMonthlyPromotionRevenueArgs = {
  statusId?: number;
  startDate?: string;
  endDate?: string;
  filterType?: TTimeRange;
};
export type TGetMonthlyPromotionRevenueRes =
  TApiResponse<TGetMonthlyPromotionRevenueDataSeriesData>;

/**
|--------------------------------------------------
|  Get Monthly Promotion Revenue End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Challenge Active Events Start
|--------------------------------------------------
*/

export type TGetAPromotionActiveEventsArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
};

export type TGetAPromotionActiveEventsRes = TApiResponse<TActiveEvent[]>;

/**
|--------------------------------------------------
| Get A Challenge Active Events End
|--------------------------------------------------
*/
