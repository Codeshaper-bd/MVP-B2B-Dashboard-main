import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TStatus,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateAnAddOnMutation,
  useDeleteAnAddOnMutation,
  useUpdateAnAddOnMutation,
} from "./add-ons-api";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Create AddOns Start
|--------------------------------------------------
*/

export type TCreateAddOnArgs = {
  status?: TStatus;
  name: string;
  description: string;
  price: number;
  maxQty: number;
  soldQty?: number;
  media: TLinkAMediaToAModuleArgs;
};

export type TAddOn = Omit<TCreateAddOnArgs, "media"> & {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  media: TMedia | TNullish;
};

export type TCreateAddOnRes = TApiResponse<TAddOn>;

export type TCreateAnAddOnMutation = ReturnType<
  typeof useCreateAnAddOnMutation
>[0];

/**
|--------------------------------------------------
| Create AddOn End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All AddOn Start
|--------------------------------------------------
*/
export type TGetAllAddOnArgs = TPaginationArgs<TAddOn>;

export type TGetAllAddOnRes = TApiResponse<TAddOn[]>;

/**
|--------------------------------------------------
| Get All AddOn End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get An AddOn Start
|--------------------------------------------------
*/
export type TGetAnAddOnArgs = TIdOrSlugOrIdentifier<"slug">;

export type TGetAnAddOnRes = TApiResponse<TAddOn>;
/**
|--------------------------------------------------
| Get An AddOn End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update An AddOn Start
|--------------------------------------------------
*/
export type TUpdateAnAddOnArgs = TUpdateOptionalArgs<TCreateAddOnArgs, "slug">;

export type TUpdateAnAddOnRes = TApiResponse<TAddOn>;

export type TUpdateAnAddOnMutation = ReturnType<
  typeof useUpdateAnAddOnMutation
>[0];
/**
|--------------------------------------------------
| Update An AddOn End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete An AddOn Start
|--------------------------------------------------
*/
export type TDeleteAnAddOnArgs = TIdOrSlugOrIdentifier<"slug">;

export type TDeleteAnAddOnRes = TApiResponse<null>;

export type TDeleteAnAddOnMutation = ReturnType<
  typeof useDeleteAnAddOnMutation
>[0];
/**
|--------------------------------------------------
| Delete An AddOn End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Addon Purchased Start
|--------------------------------------------------
*/
export type TGetAddonPurchasedArgs = {
  ticketSoldId: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TGetAddonPurchased = TAddOn & {
  unitSold: number | TNullish;
  revenue: number | TNullish;
};
export type TGetAddonPurchasedRes = TApiResponse<TGetAddonPurchased[]>;

/**
|--------------------------------------------------
| Get Addon Purchased End
|--------------------------------------------------
*/
