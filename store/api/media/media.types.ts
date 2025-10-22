import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { useUploadAMediaMutation } from "./media-api";

export enum EMediaTag {
  barMenu = "BarMenu",
  product = "Product",
  addOn = "AddOn",
  venue = "Venue",
  employee = "Employee",
  event = "Event",
  support = "Support",
  user = "User",
  Organization = "Organization",
  club = "club",
  logo = "logo",
}

export type TMediaTag = `${EMediaTag}`;
export type TMediaTags = TMediaTag[];

export type TLinkAMediaToAModuleArgs = TIdOrSlugOrIdentifier & {
  isFeatured?: boolean;
};

/**
 |--------------------------------------------------
 | Upload A Media Start
 |--------------------------------------------------
 */

export type TMedia = {
  id: number;
  name: string | TNullish;
  originalName: string | TNullish;
  type: string | TNullish;
  url: string | TNullish;
  size: number | TNullish;
  tags: TMediaTags | TNullish;
  isFeatured: boolean | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  deletedAt: string | TNullish;
};

export type TUploadAMediaArgs = {
  file: File;
  tags?: TMediaTags;
};

export type TUploadAMediaRes = TApiResponse<TMedia>;

export type TUploadAMediaMutation = ReturnType<
  typeof useUploadAMediaMutation
>[0];

/**
 |--------------------------------------------------
 | Upload A Media End
 |--------------------------------------------------
 */

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Media Start
|--------------------------------------------------
*/

export type TGetAllMediaRes = TApiResponse<TMedia[]>;
export type TGetAllMediaArgs = TPaginationArgs<void, { tags?: TMediaTags }>;

/**
|--------------------------------------------------
| Get All Media End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Media Start
|--------------------------------------------------
*/

export type TGetAMediaRes = TApiResponse<TMedia>;
export type TGetAMediaArgs = TIdOrSlugOrIdentifier;

/**
|--------------------------------------------------
| Get A Media End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Attach Media Start
|--------------------------------------------------
*/

export type TAttachMediaArgs = {
  mediaId: number;
  modelId: number;
  model: string;
  isFeatured?: boolean;
};

export type TAttachMediaData = {
  id: number;
  mediaId: number;
  modelId: number;
  model: string;
  isFeatured: boolean;
  createdAt: string;
};

export type TAttachMediaRes = TApiResponse<TAttachMediaData>;

/**
|--------------------------------------------------
| Attach Media End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete All Media start
|--------------------------------------------------
*/

export type TDeleteMediaArgs = TIdOrSlugOrIdentifier;

export type TDeleteMediaRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete All Media start
|--------------------------------------------------
*/
