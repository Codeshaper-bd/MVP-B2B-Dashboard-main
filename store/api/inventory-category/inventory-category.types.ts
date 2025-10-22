import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TStatus,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateInventoryCategoryMutation,
  useDeleteAnInventoryCategoryMutation,
  useUpdateAnInventoryCategoryMutation,
} from "./inventory-category-api";
import type {
  EInventoryItemType,
  TInventoryItemType,
} from "../inventory-item/inventory-item.types";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";
export enum EInventoryCategoryUnits {
  GRAM_PER_ML = "G_PER_ML",
  GRAM_PER_OZ = "G_PER_OZ ",
}
export type TInventoryCategoryUnits = `${EInventoryCategoryUnits}`;

/**
|--------------------------------------------------
| Create Inventory Category Start
|--------------------------------------------------
*/
export type TCommonCreateInventoryCategoryArgs = {
  name: string;
  unit: TInventoryCategoryUnits;
  media?: TLinkAMediaToAModuleArgs | undefined;
  status?: TStatus;
  notes?: string;
};

export type TCreateAlcoholicInventoryCategoryArgs = {
  categoryType: `${EInventoryItemType.ALCOHOLIC}`;
  density: number;
};

export type TCreateNonAlcoholicInventoryCategoryArgs = {
  categoryType: `${EInventoryItemType.NON_ALCOHOLIC}`;
};

export type TCreateInventoryCategoryArgs = TCommonCreateInventoryCategoryArgs &
  (
    | TCreateAlcoholicInventoryCategoryArgs
    | TCreateNonAlcoholicInventoryCategoryArgs
  );

export type TInventoryCategory = Omit<TCreateInventoryCategoryArgs, "media"> & {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  media?: TMedia | TNullish;
  // extra fields
  totalProducts: number;
  gramsPerOunce: number | TNullish;
};

export type TCreateInventoryCategoryRes = TApiResponse<TInventoryCategory>;

export type TCreateInventoryCategoryMutation = ReturnType<
  typeof useCreateInventoryCategoryMutation
>[0];

/**
|--------------------------------------------------
| Create Inventory Category End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Inventory Category Start
|--------------------------------------------------
*/

export type TGetAllInventoryCategoryArgs = TPaginationArgs<
  TInventoryCategory,
  {
    categoryType?: TInventoryItemType;
  }
>;

export type TGetAllInventoryCategoryRes = TApiResponse<TInventoryCategory[]>;

/**
|--------------------------------------------------
| Get All Inventory Category End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get An Inventory Category Start
|--------------------------------------------------
*/

export type TGetAnInventoryCategoryArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetAnInventoryCategoryRes = TApiResponse<TInventoryCategory>;

/**
|--------------------------------------------------
| Get An Inventory Category End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update An Inventory Category Start
|--------------------------------------------------
*/

export type TUpdateAnInventoryCategoryArgs = TUpdateOptionalArgs<
  TCreateInventoryCategoryArgs,
  "slug"
>;

export type TUpdateAnInventoryCategoryRes = TApiResponse<TInventoryCategory>;

export type TUpdateAnInventoryCategoryMutation = ReturnType<
  typeof useUpdateAnInventoryCategoryMutation
>[0];

/**
|--------------------------------------------------
| Update An Inventory Category End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete An Inventory Category Start
|--------------------------------------------------
*/

export type TDeleteAnInventoryCategoryArgs = TIdOrSlugOrIdentifier<"slug">;
export type TDeleteAnInventoryCategoryRes = TApiResponse<null>;

export type TDeleteAnInventoryCategoryMutation = ReturnType<
  typeof useDeleteAnInventoryCategoryMutation
>[0];

/**
|--------------------------------------------------
| Delete An Inventory Category End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
