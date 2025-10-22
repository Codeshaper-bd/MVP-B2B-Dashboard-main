import type {
  TIdOrSlugOrIdentifier,
  TNullish,
  TApiResponse,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "@/store/api/common-api-types";

import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

export enum EStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type TStatus = `${EStatus}`;

/**
 |--------------------------------------------------
 | Create Product Category Start
 |--------------------------------------------------
 */

export type TBarMenu = {
  id: number | TNullish;
  name: string | TNullish;
  slug: string | TNullish;
  status: TStatus | TNullish;
  media: TMedia | TNullish;
  totalProducts: number | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  deletedAt: string | TNullish;
  isDefault?: boolean;
};

export type TCreateBarMenuArgs = {
  name: string;
  media?: TLinkAMediaToAModuleArgs;
  status?: TStatus;
};

export type TCreateBarMenuRes = TApiResponse<TBarMenu>;

/**
|--------------------------------------------------
| Create Product Category End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All BarMenu Start
|--------------------------------------------------
*/

export type TGetAllBarMenuArgs = TPaginationArgs<TBarMenu>;
export type TGetAllBarMenuRes = TApiResponse<TBarMenu[]>;

/**
|--------------------------------------------------
| Get All BarMenu End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update BarMenu Start
|--------------------------------------------------
*/
export type TUpdateABarMenuRes = TApiResponse<TBarMenu>;

export type TUpdateABarMenuArgs = TUpdateOptionalArgs<
  TCreateBarMenuArgs,
  "slug"
>;

/**
|--------------------------------------------------
| Update BarMenu End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A BarMenu Start
|--------------------------------------------------
*/
export type TGetABarMenuRes = TApiResponse<TBarMenu>;
export type TGetABarMenuArgs = TIdOrSlugOrIdentifier<"slug">;
/**
|--------------------------------------------------
| Get A BarMenu End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete BarMenu Start
|--------------------------------------------------
*/
export type TDeleteABarMenuArgs = TIdOrSlugOrIdentifier<"slug">;
export type TDeleteABarMenuRes = TApiResponse<TBarMenu>;
/**
|--------------------------------------------------
| Delete BarMenu End
|--------------------------------------------------
*/
