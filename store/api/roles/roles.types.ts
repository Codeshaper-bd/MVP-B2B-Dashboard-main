import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";

export type TRolePermissions = {
  id: number;
  name: string | TNullish;
  slug: string | TNullish;
  guardName: string | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  deletedAt: string | TNullish;
};

/**
 |--------------------------------------------------
 | Create Role Start
 |--------------------------------------------------
 */

export type TCreateRoleArgs = {
  name: string;
  description?: string;
  permissions: number[];
};

export type TRole = Omit<TCreateRoleArgs, "permissions"> & {
  id: number;
  slug: string | TNullish;
  userCount: number | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  deletedAt: string | TNullish;
  permissions: TRolePermissions[];
};

export type TCreateRoleRes = TApiResponse<TRole>;

/**
 |--------------------------------------------------
 | Create Role End
 |--------------------------------------------------
 */

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Roles Start
|--------------------------------------------------
*/

export type TGetAllRolesArgs = TPaginationArgs;
export type TGetAllRolesRes = TApiResponse<TRole[]>;

/**
|--------------------------------------------------
| Get All Roles End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Role Start
|--------------------------------------------------
*/

export type TGetARoleArgs = TIdOrSlugOrIdentifier;
export type TGetARoleRes = TApiResponse<TRole>;

/**
|--------------------------------------------------
| Get A Role End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A Role Start
|--------------------------------------------------
*/

export type TUpdateARoleArgs = TUpdateOptionalArgs<TCreateRoleArgs, "id">;
export type TUpdateARoleRes = TApiResponse<TRole>;

/**
|--------------------------------------------------
| Update A Role End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete A Role Start
|--------------------------------------------------
*/

export type TDeleteARoleArgs = TIdOrSlugOrIdentifier<"id">;
export type TDeleteARoleRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Role End
|--------------------------------------------------
*/
