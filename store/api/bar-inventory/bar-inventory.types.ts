import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TStatus,
} from "../common-api-types";
import type { useSoftDeleteBarInventoryItemMutation } from "./bar-inventory-api";
import type { TSoldBy } from "../inventory-item/inventory-item.types";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

export enum EBarInventoryType {
  ALCOHOLIC = "ALCOHOLIC",
  NON_ALCOHOLIC = "NON_ALCOHOLIC",
}
export type TBarInventoryType = `${EBarInventoryType}`;

export enum EUnit {
  ML = "ml",
  OZ = "oz",
  G = "g",
}
export type TUnit = `${EUnit}`;

export enum EBarInventoryStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}
export type TBarInventoryStatus = `${EBarInventoryStatus}`;

/**
 * Ingredient Input Type
 */
export type TBarInventoryIngredient = {
  ingredientId: number;
  usageQuantity: number;
  usageUnit?: TUnit;
  isFullSize?: boolean;
};

/**
 * Create Bar Inventory Args Type
 */

/* new start */

export type TChildren = {
  id: number;
  inventoryItemId: number;
  name: string;
  slug: string;
  categoryId: number;
  category: string;
  groupId: number;
  soldBy: TSoldBy;
  type: TBarInventoryType;
  volume: number;
  unit: TUnit;
  productCode: string;
  netWeight: number;
  netWeightUnit: TUnit;
  netWeightOfLiquid: number;
  weightOfEmptyBottle: number;
  addShipment: boolean;
  unitPerCase?: number | TNullish;
  casesReceived?: number | TNullish;
  pricePerCase?: number | TNullish;
  pricePerUnit: number;
  currentStock: number;
  openingStock: number;
  perLevel: number;
  threshold?: number | TNullish;
  status: TStatus;
  media: TMedia[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | TNullish;
  children?: TChildren[] | null;
};

export type TTBarInventoryItemData = {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  category: string;
  groupId?: number | null;
  soldBy: TSoldBy;
  type: TBarInventoryType;
  volume: number;
  unit: TUnit;
  productCode?: string | TNullish;
  netWeight?: number | TNullish;
  netWeightOfLiquid?: number | TNullish;
  weightOfEmptyBottle?: number | TNullish;
  netWeightUnit: TUnit;
  unitPerCase?: number | TNullish;
  pricePerUnit?: number | TNullish;
  currentStock?: number | TNullish;
  openingStock?: number | TNullish;
  perLevel?: number | TNullish;
  status: TStatus;
  media: TMedia[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | TNullish;
  children?: TChildren[];
};

/* ******************************************************************************************************************************************************************************************** */

/**
 * Get Single Bar Menu Item start
 */
export type TGetBarInventoryItemArgs = {
  barSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  inventoryItemId: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TGetBarInventoryItemRes = TApiResponse<TTBarInventoryItemData>;
/**
 * Get Single Bar Menu Item end
 */

/* ******************************************************************************************************************************************************************************************** */

/**
 * Update Bar Menu Item start
 */
export type TUpdateBarInventoryVolumeInput = {
  id: number;
  inventoryItemId: number;
  volume: number;
  unit: TUnit;
  productCode: string;
  netWeight: number;
  netWeightUnit: TUnit;
  netWeightOfLiquid: number;
  weightOfEmptyBottle: number;
  threshold: number;
  openStock: number;
  closedStock: number;
  pricePerUnit: number;
};
export type TUpdateBarInventoryPayload = {
  name: string;
  categoryId: number;
  status: TStatus;
  soldBy: TSoldBy;
  type: TBarInventoryType;
  media: TLinkAMediaToAModuleArgs[];
  volumes: Partial<TUpdateBarInventoryVolumeInput>[];
};
export type TUpdateBarInventoryArgs = {
  barSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  itemSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  body: Partial<TUpdateBarInventoryPayload>;
};

export type TUpdateBarInventoryRes = TApiResponse<TTBarInventoryItemData>;
/**
 * Update Bar Menu Item end
 */

/* ******************************************************************************************************************************************************************************************** */

/**
 * Delete Bar Menu Item start
 */
export type TSoftDeleteBarInventoryItemArgs = {
  body: {
    ids: number[];
  };
};
export type TSoftDeleteBarInventoryItemRes = TApiResponse<null>;
export type TSoftDeleteBarInventoryItemMutation = ReturnType<
  typeof useSoftDeleteBarInventoryItemMutation
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
export type TGetAllBarInventoryStats = {
  revenue: TStat | TNullish;
  totalSales: TStat | TNullish;
  averageOrderSize: TStat | TNullish;
  ranking: TStat | TNullish;
  revenueGraph: TRevenueGraph | TNullish;
};

export type TGetABarInventoryStatsArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  range?: TTimeRange;
};

export type TGetABarInventoryStatsRes = TApiResponse<TGetAllBarInventoryStats>;
/**
 * Get  Bar Menu Items Stats End
 */
