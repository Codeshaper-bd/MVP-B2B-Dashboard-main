import type { TUserType, TVerificationMethod } from "../auth/auth.types";
import type { TStatus } from "../bar-menu/bar-menu.types";
import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

export type TCreateBarArgs = {
  name: string;
  media?: TLinkAMediaToAModuleArgs | TNullish;
  status?: TStatus;
};
export type TBar = {
  id: number;
  name: string;
  slug: string;
  subTitle: string;
  description: string;
  revenue: number;
  productCount: number;
  productsSold: number;
  reamingStock: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  media?: TMedia | TNullish;
  topEvent?: string | TNullish;
  topSellingDrink?: string | TNullish;
};

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Bar Start
|--------------------------------------------------
*/

export type TGetAllBarArgs = TPaginationArgs<TBar>;

export type TGetAllBarRes = TApiResponse<TBar[]>;

/**
|--------------------------------------------------
| Get All Bar End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Bar Start
|--------------------------------------------------
*/

export type TGetABarArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetABarRes = TApiResponse<TBar>;

/**
|--------------------------------------------------
| Get A Bar End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Bar Employee Graph Start
|--------------------------------------------------
*/
export type TRole = {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: TMedia | TNullish;
  type: TUserType;
  verifiedAt: string;
  verificationMethod: TVerificationMethod;
  statusId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  roles: TRole[] | TNullish;
};

export type TBarEmployee = {
  id: number;
  userId: number;
  organizationId: number;
  dob?: string | TNullish;
  jobTitle: string;
  department?: string | TNullish;
  address?: string | TNullish;
  zipCode?: string | TNullish;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: TUser | TNullish;
  media: TMedia | TNullish;
};

export type TGetAllBarEmployeeArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetAllBarEmployeeRes = TApiResponse<TBarEmployee>;

/**
|--------------------------------------------------
| Get All Bar Employee Graph End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Bar Inventory Item Start
|--------------------------------------------------
*/

export type TBarInventoryItem = {
  id: number;
  name: string;
  media: TMedia[] | TNullish;
  openingStock: number;
  currentStock: number;
  stockPercentage: number;
  sold: number;
};

export type TGetAllBarInventoryItemArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetAllBarInventoryItemRes = TApiResponse<TBarInventoryItem[]>;

/**
|--------------------------------------------------
| Get All Bar Inventory Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Top Ten Selling Item Start
|--------------------------------------------------
*/

export type TTopItem = {
  id: number;
  name: string;
  type: string;
  unitSold: number | TNullish;
  revenue: number | TNullish;
  media: TMedia | TNullish;
};
export type TTopTenItemsData = {
  items: TTopItem[];
  media: TMedia;
};
export type TGetTopTenItemsArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetTopTenItemsRes = TApiResponse<TTopTenItemsData>;

/**
|--------------------------------------------------
| Get Top Ten Selling Item End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Top Ten Events Start
|--------------------------------------------------
*/

export type TTopEventItem = {
  id: number;
  name: string;
  joined: number | TNullish;
  revenue: number | TNullish;
  eventImage: TMedia | TNullish;
};
export type TGetTopTenEvents = {
  items: TTopEventItem[];
  media: TMedia;
};
export type TGetTopTenEventsArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetTopTenEventsRes = TApiResponse<TGetTopTenEvents>;

/**
|--------------------------------------------------
| Get Top Ten Events End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Bar revenue Graph Start
|--------------------------------------------------
*/

export enum EBarRevenueGraphFilter {
  ALL = "all",
  "12H" = "12h",
  "24H" = "24h",
  "7D" = "7d",
  "1M" = "1mo",
  "3MO" = "3mo",
  "1Y" = "1y",
  "RANGE" = "range",
}
export type TBarRevenueGraphFilter = `${EBarRevenueGraphFilter}`;
export type TGetBarRevenueGraphQueryParams = {
  filter?: TBarRevenueGraphFilter;
  startDate?: string;
  endDate?: string;
};

export type TBarRevenueGraphData = {
  category: [];
  value: number[] | TNullish;
};

export type TGetBarRevenueGraphArgs = TIdOrSlugOrIdentifier<"slug"> &
  TGetBarRevenueGraphQueryParams;
export type TGetBarRevenueGraphRes = TApiResponse<TBarRevenueGraphData>;

/**
|--------------------------------------------------
| Get A Bar revenue Graph End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update Bar Start
|--------------------------------------------------
*/
export type TUpdateABarRes = TApiResponse<TBar>;

export type TUpdateABarArgs = TUpdateOptionalArgs<TCreateBarArgs, "slug">;

/**
|--------------------------------------------------
| Update Bar End
|--------------------------------------------------
*/
