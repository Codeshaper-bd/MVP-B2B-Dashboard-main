import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type { useDeleteAnInventoryItemMutation } from "./inventory-item-api";
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

export enum ESoldBy {
  UNIT = "UNIT",
  VOLUME = "VOLUME",
}
export type TSoldByUnit = `${ESoldBy.UNIT}`;
export type TSoldByVolume = `${ESoldBy.VOLUME}`;
export type TSoldBy = `${ESoldBy}`;

export enum EInventoryItemStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}
export type TInventoryItemStatusActive = `${EInventoryItemStatus.ACTIVE}`;
export type TInventoryItemStatusInactive = `${EInventoryItemStatus.INACTIVE}`;
export type TInventoryItemStatus = `${EInventoryItemStatus}`;

export enum EUnit {
  ML = "ml",
  OZ = "oz",
  G = "g",
}
export type TUnit = `${EUnit}`;

export enum EGroupType {
  SINGLE = "single",
  ALL = "all",
}
export type TGroupType = `${EGroupType}`;

// ========== SHARED STRUCTURES ==========
export type TBaseVolume = {
  productId?: number;
  id?: number;
  volume: number;
  unit?: TUnit;
  productCode: string;
  netWeight?: number;
  netWeightUnit?: TUnit;
  weightOfEmptyBottle?: number;
  netWeightOfLiquid?: number;
  perLevel?: number;
  pricePerUnit?: number;
  unitPerCase?: number;
  currentStockInCases?: number;
  currentStock?: number;
};

// ========== VOLUME STRUCTURES ==========
export type TUnitWithShipmentInActive = {
  addShipment: false;
};
export type TUnitNoShipmentVolume = TBaseVolume & TUnitWithShipmentInActive;

export type TUnitWithShipmentActive = {
  addShipment: true;
  unitPerCase?: number;
  casesReceived?: number;
  pricePerCase?: number;
  currentStockInCases?: number;
};

export type TUnitWithShipmentVolume = TBaseVolume & TUnitWithShipmentActive;

export type TVolumeWithShipmentInActive = {
  addShipment: false;
};

export type TVolumeNoShipmentVolume = TBaseVolume & TVolumeWithShipmentInActive;

export type TVolumeWithShipmentActive = {
  addShipment: true;
  pricePerUnit: number;
  openingStock: number;
  currentStock?: number;
};

export type TVolumeWithShipmentVolume = TBaseVolume & TVolumeWithShipmentActive;

export type TVolume =
  | (TUnitNoShipmentVolume | TUnitWithShipmentVolume)
  | (TVolumeNoShipmentVolume | TVolumeWithShipmentVolume);

// ========== PAYLOAD STRUCTURES ==========
export type TCommonInventoryItemFields = {
  name: string;
  categoryId: number;
  // lcboCode: string;
  type: TInventoryItemType;
  // slug?: string;
  status: TInventoryItemStatus;
  media: TLinkAMediaToAModuleArgs[] | undefined;
};

// Unit
export type TUnitItem = TCommonInventoryItemFields & {
  soldBy: TSoldByUnit;
  volumes: (TUnitNoShipmentVolume | TUnitWithShipmentVolume)[];
};

// Volume
export type TVolumeItem = TCommonInventoryItemFields & {
  soldBy: TSoldByVolume;
  volumes: (TVolumeNoShipmentVolume | TVolumeWithShipmentVolume)[];
};

// ========== FINAL DISCRIMINATED UNION ==========
export type TCreateInventoryItemArgs = TUnitItem | TVolumeItem;

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
  TVolume &
  TApiResponseExtraFields &
  TBaseVolume & {
    media: TMedia[] | null;
    category?: string;
    children:
      | (Omit<TCreateInventoryItemArgs, "media" | "volumes"> &
          TApiResponseExtraFields &
          TBaseVolume &
          TVolume & {
            inventoryItemId?: number;
            openingStock?: number;
            currentStock?: number;
            groupId: number;
            perLevel?: number;
            pricePerUnit?: number;
            media: TMedia[] | null;
            netWeight?: number;
            netWeightUnit?: TUnit;
            weightOfEmptyBottle?: number;
            threshold?: number | TNullish;
            currentStockInCases?: number;
            pricePerCase?: number;
          })[]
      | TNullish;
  };

export type TSingleInventoryItemData = Omit<
  TCreateInventoryItemArgs,
  "media" | "volumes"
> &
  TApiResponseExtraFields &
  TBaseVolume &
  TVolume & {
    groupId: number;
    perLevel?: number;
    media: TMedia[] | null;
    category?: string | TNullish;
    currentStock?: number;
    unitPerCase?: number;
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
export type TRangeTemplate =
  | `${number}-${number}`
  | `>${number}`
  | `<${number}`
  | (string & {});

export type TGetAllInventoryItemArgs = TPaginationArgs<
  TGroupInventoryItemData,
  {
    type?: TInventoryItemType;
    soldBy?: TSoldBy;
    stockRange?: TRangeTemplate;
    priceRange?: TRangeTemplate;
    categories?: string | number;
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
    barSlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
    soldBy?: TSoldBy;
    stockRange?: TRangeTemplate;
    priceRange?: TRangeTemplate;
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
    soldBy?: TSoldBy;
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
export type TDeleteAnInventoryItemMutation = ReturnType<
  typeof useDeleteAnInventoryItemMutation
>[0];

/**
|--------------------------------------------------
| Delete An Inventory Item End
|--------------------------------------------------
*/
