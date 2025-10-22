import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Inventory Enums Start
|--------------------------------------------------
*/

export enum EInventoryItemType {
  ALCOHOLIC = "ALCOHOLIC",
  NON_ALCOHOLIC = "NON_ALCOHOLIC",
}
export type TInventoryItemType = `${EInventoryItemType}`;

export enum EInventoryBottleType {
  HARD_LIQUOR = "HARD_LIQUOR",
  BOTTLE_CANNED = "BOTTLE_CANNED",
}
export type TInventoryBottleType = `${EInventoryBottleType}`;

export enum EInventoryItemStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}
export type TInventoryItemStatus = `${EInventoryItemStatus}`;

export enum EUnit {
  ML = "ml",
  OZ = "oz",
}
export type TUnit = `${EUnit}`;

export enum EGroupType {
  SINGLE = "single",
  ALL = "all",
}
export type TGroupType = `${EGroupType}`;

/**
|--------------------------------------------------
| Inventory Enums End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Create Inventory Item Start
|--------------------------------------------------
*/

/**
 * Bottle Canned Volume Type
 */
export type TCommonVolume = {
  id?: number;
  volume: number;
  unit?: TUnit;
  productCode: string;
  openingStock?: number;

  currentStock?: number;
  perLevel?: number;
};

export type TBottleCannedVolume = TCommonVolume & {
  unitPerCase: number;
  casesReceived?: number;
  pricePerCase?: number;
};

/**
 * Hard Liquor Volume Type
 */
export type THardLiquorVolume = TCommonVolume & {
  pricePerUnit: number;
};

export type THardLiquorBottleType = {
  bottleType: `${EInventoryBottleType.HARD_LIQUOR}`;
  volumes: THardLiquorVolume[];
};

export type TBottleCannedBottleType = {
  bottleType: `${EInventoryBottleType.BOTTLE_CANNED}`;
  volumes: TBottleCannedVolume[];
};

export type TBottleTypeVolumes =
  | THardLiquorBottleType
  | TBottleCannedBottleType;

/**
 * Create Inventory Item Args Type
 */
export type TCreateInventoryItemArgs = {
  name: string;
  categoryId: number;
  lcboCode?: string;
  type?: TInventoryItemType;
  status?: TInventoryItemStatus;
  media?: TLinkAMediaToAModuleArgs[];
  currentStock?: number;
  perLevel?: number;
} & TBottleTypeVolumes;

/**
 * API Response Extra Fields
 */
export type TApiResponseExtraFields = {
  id: number;
  slug: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

/**
 * Full Inventory Item Data Type
 */
export type TGroupInventoryItemData = Omit<
  TCreateInventoryItemArgs,
  | "media"
  | "productCode"
  | "unitPerCase"
  | "casesReceived"
  | "pricePerCase"
  | "pricePerUnit"
  | "currentStock"
  | "openingStock"
  | "perLevel"
  | "groupId"
  | "volumes"
> &
  TApiResponseExtraFields &
  TCommonVolume & {
    media: TMedia[] | null;
    children:
      | (Omit<TCreateInventoryItemArgs, "media" | "volumes"> &
          TApiResponseExtraFields &
          TCommonVolume & {
            currentStock?: number;
            groupId: number;
            perLevel?: number;
            media: TMedia[] | null;
          })[]
      | TNullish;
  };
export type TSingleInventoryItemData = Omit<
  TCreateInventoryItemArgs,
  "media" | "volumes"
> &
  TApiResponseExtraFields &
  TCommonVolume & {
    groupId: number;
    perLevel?: number;
    media: TMedia[] | null;
    category?: string | TNullish;
  };

export type TInventoryItemData =
  | TGroupInventoryItemData
  | TSingleInventoryItemData;

/**
 * Create Inventory Item Response
 */
export type TCreateInventoryItemRes = TApiResponse<TInventoryItemData>;

/**
|--------------------------------------------------
| Create Inventory Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Inventory Item Start
|--------------------------------------------------
*/

export type TGetAllInventoryItemArgs = TPaginationArgs<
  TGroupInventoryItemData,
  {
    type?: TInventoryItemType;
    bottleType?: TInventoryBottleType;
  }
>;

export type TGetAllInventoryItemRes = TApiResponse<TGroupInventoryItemData[]>;

/**
|--------------------------------------------------
| Get All Inventory Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Inventory Item Start
|--------------------------------------------------
*/

export type TGetAllInventoryItemIncludingBarArgs = TPaginationArgs<
  TGroupInventoryItemData,
  {
    type?: TInventoryItemType;
    bottleType?: TInventoryBottleType;
    barSlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
    stockRange?: string;
    priceRange?: string;
    categories?: string;
  }
>;

export type TGroupInventoryItemDataIncludingBarData = {
  bar: {
    id: number;
    name: string;
    slug: string;
    description: string;
    media: TMedia[];
  };
  items: TGroupInventoryItemData[];
};

export type TGetAllInventoryItemIncludingBarRes =
  TApiResponse<TGroupInventoryItemDataIncludingBarData>;

/**
|--------------------------------------------------
| Get All Inventory Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All GroupType Inventory Item Start
|--------------------------------------------------
*/

export type TGetAllGroupTypeInventoryItemArgs =
  TGetAllInventoryItemIncludingBarArgs & {
    bottleType?: TInventoryBottleType;
    groupType?: TGroupType;
  };

export type TGetAllGroupTypeInventoryItemRes = TApiResponse<
  TSingleInventoryItemData[]
>;

/**
|--------------------------------------------------
| Get All GroupType Inventory Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Lcbo Code Start
|--------------------------------------------------
*/

type TLcboCode = {
  category: string;
  sku: number;
  productName: string;
  caseConfig: string;
  vendor: string;
  BCRestOfCanada: string;
  distribution: string;
};

export type TGetAllLcboCodeArgs = TPaginationArgs<
  TLcboCode,
  {
    category?: string;
  }
>;

export type TGetAllLcboCodeRes = TApiResponse<TLcboCode[]>;

/**
|--------------------------------------------------
| Get All Lcbo Code End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get An Inventory Item Start
|--------------------------------------------------
*/

export type TGetAnInventoryItemArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetAnInventoryItemRes = TApiResponse<TGroupInventoryItemData>;

/**
|--------------------------------------------------
| Get An Inventory Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update An Inventory Item Start
|--------------------------------------------------
*/

export type TUpdateAnInventoryItemArgs = TUpdateOptionalArgs<
  TCreateInventoryItemArgs,
  "slug"
>;

export type TUpdateAnInventoryItemRes = TApiResponse<TInventoryItemData>;

/**
|--------------------------------------------------
| Update An Inventory Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update Bar Inventory Item Stock Start
|--------------------------------------------------
*/

export type TUpdateBarInventoryItemStockArgs = TUpdateOptionalArgs<
  {
    newStock: number;
  },
  "id"
>;

export type TUpdateBarInventoryItemStockRes = TApiResponse<TInventoryItemData>;

/**
|--------------------------------------------------
| Update Bar Inventory Item Stock End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete An Inventory Item Start
|--------------------------------------------------
*/

export type TDeleteAnInventoryItemArgs = TIdOrSlugOrIdentifier<"slug">;
export type TDeleteAnInventoryItemRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete An Inventory Item End
|--------------------------------------------------
*/
