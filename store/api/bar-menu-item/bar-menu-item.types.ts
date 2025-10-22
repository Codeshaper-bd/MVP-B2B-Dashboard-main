import type { TBarMenu } from "../bar-menu/bar-menu.types";
import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateBarMenuItemMutation,
  useDeleteBarMenuItemMutation,
  useUpdateBarMenuItemMutation,
} from "./bar-menu-item-api";
import type { TSingleInventoryItemData } from "../inventory-item/inventory-item.types";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

export enum EBarMenuItemType {
  ALCOHOLIC = "ALCOHOLIC",
  NON_ALCOHOLIC = "NON_ALCOHOLIC",
}
export type TBarMenuItemType = `${EBarMenuItemType}`;

export enum EUnit {
  ML = "ml",
  OZ = "oz",
  G = "g",
}
export type TUnit = `${EUnit}`;

export enum EBarMenuItemStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}
export type TBarMenuItemStatus = `${EBarMenuItemStatus}`;

/**
 |--------------------------------------------------
 | Create Product Start
 |--------------------------------------------------
 */

/**
 * Ingredient Input Type
 */
export type TBarMenuItemIngredient = {
  ingredientId: number;
  usageQuantity: number;
  usageUnit?: TUnit;
  isFullSize?: boolean;
};

/**
 * Create Bar Menu Item Args Type
 */
export type TCreateBarMenuItemArgs = {
  name: string;
  subTitle?: string;
  description?: string;
  volume: number;
  type?: TBarMenuItemType;
  unit?: TUnit;
  price: number;
  isSaleable?: boolean;
  barMenuId: number;
  status?: TBarMenuItemStatus;
  media?: TLinkAMediaToAModuleArgs[];
  ingredients?: TBarMenuItemIngredient[];
};

/**
 * API Response Extra Fields
 */
export type TApiResponseExtraFields = {
  id: number;
  slug: string;
  barMenuSlug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

/**
 * Full Bar Menu Item Data Type
 */
export type TBarMenuItem = Omit<
  TCreateBarMenuItemArgs,
  "media" | "ingredients"
> &
  TApiResponseExtraFields & {
    media: TMedia[] | null;
    ingredients: (TSingleInventoryItemData & {
      usageQuantity: number;
      isFullSize?: boolean;
    })[];
  };

/**
 * Create Bar Menu Item Response
 */
export type TCreateBarMenuItemRes = TApiResponse<TBarMenuItem>;

export type TCreateBarMenuItemMutation = ReturnType<
  typeof useCreateBarMenuItemMutation
>[0];

/**
|--------------------------------------------------
| Create Product End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
 * Get All Bar Menu Items start
 */

export type TGetAllBarMenuItemArgs = TPaginationArgs<
  TBarMenuItem,
  {
    status?: TBarMenuItemStatus;
    barMenuSlug?: string;
  }
>;
export type TGetAllBarMenuItemInfiniteArgs = Exclude<
  TGetAllBarMenuItemArgs,
  void | undefined
>;
export type TGetAllBarMenuItemRes = TApiResponse<TBarMenuItem[]>;
/**
 * Get All Bar Menu Items end
 */

/* ******************************************************************************************************************************************************************************************** */

/**
 * Get Single Bar Menu Item start
 */
export type TGetBarMenuItemArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetBarMenuItemRes = TApiResponse<TBarMenuItem>;
/**
 * Get Single Bar Menu Item end
 */

/* ******************************************************************************************************************************************************************************************** */

/**
 * Get All Bar Menu Items By Category start
 */
export type TGetAllBarMenuItemByCategoryArgs = TPaginationArgs<
  TBarMenuItem,
  {
    status?: TBarMenuItemStatus;
    barMenuId?: number;
  }
>;

export type TGetAllBarMenuItemByBarMenuSlugArgs = TPaginationArgs &
  TIdOrSlugOrIdentifier<"slug"> & {
    type?: TBarMenuItemType;
    isSaleable?: boolean;
  };

type TBarMenuItemsByBarMenu = {
  barMenu: TBarMenu | TNullish;
  items: TBarMenuItem[] | TNullish;
};
export type TGetAllBarMenuItemByBarMenuSlugRes =
  TApiResponse<TBarMenuItemsByBarMenu>;
/**
 * Get All Bar Menu Items By Category end
 */

/* ******************************************************************************************************************************************************************************************** */

/**
 * Update Bar Menu Item start
 */
export type TUpdateBarMenuItemArgs = TUpdateOptionalArgs<
  TCreateBarMenuItemArgs,
  "slug"
>;

export type TUpdateBarMenuItemRes = TApiResponse<TBarMenuItem>;
export type TUpdateBarMenuItemMutation = ReturnType<
  typeof useUpdateBarMenuItemMutation
>[0];
/**
 * Update Bar Menu Item end
 */

/* ******************************************************************************************************************************************************************************************** */

/**
 * Delete Bar Menu Item start
 */
export type TDeleteBarMenuItemArgs = TIdOrSlugOrIdentifier<"slug">;
export type TDeleteBarMenuItemRes = TApiResponse<null>;
export type TDeleteBarMenuItemMutation = ReturnType<
  typeof useDeleteBarMenuItemMutation
>[0];
/**
 * Delete Bar Menu Item end
 */

/* ******************************************************************************************************************************************************************************************** */

/**
 * Get  Bar Menu Items Stats Start
 */
export enum ETimeRange {
  ThreeHours = "3h",
  TwelveHours = "12h",
  TwentyFourHours = "24h",
  OneWeek = "1week",
  OneMonth = "1month",
  SixMonths = "6month",
  OneYear = "1year",
  All = "all",
}
export type TTimeRange = `${ETimeRange}`;

export type TStat = {
  value: number | TNullish;
  increased: boolean;
  percentage: number | TNullish;
};
export type TRevenueGraph = {
  category: string[] | TNullish;
  series: number[] | TNullish;
};
export type TGetAllBarMenuItemStats = {
  revenue: TStat | TNullish;
  totalSales: TStat | TNullish;
  averageOrderSize: TStat | TNullish;
  ranking: TStat | TNullish;
  revenueGraph: TRevenueGraph | TNullish;
};

export type TGetABarMenuItemStatsArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  range?: TTimeRange;
};

export type TGetABarMenuItemStatsRes = TApiResponse<TGetAllBarMenuItemStats>;
/**
 * Get  Bar Menu Items Stats End
 */
