import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateATicketTierMutation,
  useDeleteATicketTierMutation,
  useUpdateATicketTierMutation,
} from "./ticket-tier-api";

/**
|--------------------------------------------------
| Create TicketTier Start
|--------------------------------------------------
*/

export enum ETicketTierType {
  GENERAL = "GENERAL",
  VIP = "VIP",
  EARLY_BIRD = "EARLY_BIRD",
  STUDENT = "STUDENT",
  GROUP = "GROUP",
}

export type TTicketTierType = `${ETicketTierType}`;
export enum ETicketTierStatus {
  ACTIVE = "Active",
  UPCOMING = "Upcoming",
  ENDED = "Ended",
}

export type TTicketTierStatus = `${ETicketTierStatus}`;
export type TCreateTicketTierArgs = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  name: string;
  price: number;
  maxQty: number;
  type?: TTicketTierType;
  isPrivate?: boolean;
  status?: TTicketTierStatus;
  isAutoRelease: boolean;
  maxTicketsPerCustomer: number;
  startDate?: string;
  endDate?: string;
};

export type TTicketTier = TCreateTicketTierArgs & {
  slug: string;
  id: number;
  createdAt: string;
  soldQty?: number;
  updatedAt: string;
  deletedAt: string | null;
};

export type TCreateTicketTierRes = TApiResponse<TTicketTier>;

export type TCreateATicketTierMutation = ReturnType<
  typeof useCreateATicketTierMutation
>[0];

/**
|--------------------------------------------------
| Create TicketTier End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All TicketTier Start
|--------------------------------------------------
*/
export type TGetAllTicketTierArgs = TPaginationArgs<
  TTicketTier,
  {
    eventId?: TIdOrSlugOrIdentifier<"id">["id"];
    type?: TTicketTierType;
  }
>;

export type TGetAllTicketTierRes = TApiResponse<TTicketTier[]>;

/**
|--------------------------------------------------
| Get All TicketTier End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A TicketTier Start
|--------------------------------------------------
*/
export type TGetATicketTierArgs = TIdOrSlugOrIdentifier<"slug">;

export type TGetATicketTierRes = TApiResponse<TTicketTier>;
/**
|--------------------------------------------------
| Get A TicketTier End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A TicketTier Start
|--------------------------------------------------
*/
export type TUpdateATicketTierArgs = TUpdateOptionalArgs<
  TCreateTicketTierArgs,
  "slug"
>;

export type TUpdateATicketTierRes = TApiResponse<TTicketTier>;

export type TUpdateATicketTierMutation = ReturnType<
  typeof useUpdateATicketTierMutation
>[0];
/**
|--------------------------------------------------
| Update A TicketTier End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete TicketTier Start
|--------------------------------------------------
*/
export type TDeleteATicketTierArgs = TIdOrSlugOrIdentifier<"slug">;

export type TDeleteATicketTierRes = TApiResponse<null>;

export type TDeleteATicketTierMutation = ReturnType<
  typeof useDeleteATicketTierMutation
>[0];
/**
|--------------------------------------------------
| Delete TicketTier End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get Ticket Tiers Details Start
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

export type TTicketTierGender = {
  male: number | TNullish;
  female: number | TNullish;
  notSpecified: number | TNullish;
};
export type TTicketTierItem = {
  name: string | TNullish;
  totalSold: number | TNullish;
  guestListLimit: number | TNullish;
} & TTicketTierGender;

export type TTotalTax = {
  eventSlug: TIdOrSlugOrIdentifier<"slug">["slug"];
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  totalTax: number | TNullish;
};
export type TTicketTiersDetailsData = {
  totalSold: number | TNullish;
  revenue: number | TNullish;
  data: TTicketTierItem[];
  addOnsRevenue: number | TNullish;
  totalTax: TTotalTax;
} & TTicketTierGender;

export type TGetTicketTiersDetailsArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetTicketTiersDetailsRes = TApiResponse<TTicketTiersDetailsData>;

/**
|--------------------------------------------------
| Get Ticket Tiers Details End
|--------------------------------------------------
*/
