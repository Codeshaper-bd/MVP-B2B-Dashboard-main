/**
 * Promoter Portal API Types
 */

import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { TDiscount } from "../discounts/discounts.types";
import type { TCreateEventData, TEventType } from "../events/events.types";
import type { TMedia } from "../media/media.types";
import type {
  TGuestListType,
  TPromoter,
  TPromoterTicketSoldData,
} from "../promoters/promoters.types";
import type { TVenue } from "../venues/venues.types";

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Promoters In Organization Start
|--------------------------------------------------
*/

export type TOrganizationPromoter = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  name: string | TNullish;
  email: string | TNullish;
  phone: string | TNullish;
  description: string | TNullish;
  address: string | TNullish;
  venue: TVenue | TNullish;
  media: TMedia[] | TNullish;
};
export type TGetAllPromotersInOrganizationArgs =
  TPaginationArgs<TOrganizationPromoter>;

export type TGetAllPromotersInOrganizationRes = TApiResponse<
  TOrganizationPromoter[]
>;

/**
|--------------------------------------------------
| Get All Promoters In Organization End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Events in an Organization Start
|--------------------------------------------------
*/

export type TPromoterEventsArgs = {
  organizationSlug: string;
  type: TEventType;
};
export type TGetAllEventsInOrganizationArgs = TPaginationArgs &
  TPromoterEventsArgs;
export type TPromoterEvent = {
  id: number | TNullish;
  name: string | TNullish;
  slug: string | TNullish;
  description: string | TNullish;
  promoterSalesAmount: string | TNullish;
  isGratuity: boolean;
  gratuityValue: number | null;
  publishDate: string | TNullish;
  startTime: string | TNullish;
  endTime: string | TNullish;
  checkInEnd: string | TNullish;
  isFreeGuestList: boolean;
  guestListLimit: number | TNullish;
  guestListLimitType: string | TNullish;
  perUserGuestListLimitQty: number | TNullish;
  isRecurring: boolean;
  recurringFor: string | TNullish;
  isFennecLive: boolean;
  isLiveMenuEnabled: boolean;
  status: string | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  media: TMedia[] | TNullish;
  venue: TVenue | TNullish;
  ticketPrice: number | TNullish;
};

export type TGetAllEventsInOrganizationRes = TApiResponse<TPromoterEvent[]>;

/**
|--------------------------------------------------
| Get All Assigned Events for the Promoter Start
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
| Get All Events in an Organization Start
|--------------------------------------------------
*/

export type TGetAllAssignedEventsArgs = TPaginationArgs & {
  type: TEventType;
};
export type TGetAllAssignedEventsRes = TApiResponse<TPromoterEvent[]>;

/**
|--------------------------------------------------
| Get All Assigned Events for the Promoter End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get promoter events ticket ties start
|--------------------------------------------------
*/
// [key: string]: unknown;
export type TTicketData = {
  id: number;
  eventId: number;
  name: string;
  slug: string;
  price: number;
  maxQty: number;
  startDate: string | TNullish;
  endDate: string | TNullish;
  barcode: string | TNullish;
  isAutoRelease: boolean;
  maxTicketsPerCustomer: number;
  soldCount: number;
  statusId: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | TNullish;
};
export type TGetPromoterTicketTierArgs = {
  slug: string;
};
export type TGetPromoterTicketTierRes = TApiResponse<TTicketData[]>;
/**
|--------------------------------------------------
| Get promoter events ticket ties end
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get A promoter Event Details Start
|--------------------------------------------------
*/

export type TEvent = {
  details: TCreateEventData;
  venue: TVenue;
};

export type TGetAPromoterEventDetailsArgs = {
  slug: string;
};
export type TGetAPromoterEventDetailsRes = TApiResponse<TEvent>;
/**
|--------------------------------------------------
| Get A promoter Event Details End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get A promoter Event Details Start
|--------------------------------------------------
*/

export type TGetPromoterTicketSoldArgs = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  ticketTierId?: string;
};
export type TGetPromoterTicketSoldRes = TApiResponse<TPromoterTicketSoldData>;
/**
|--------------------------------------------------
| Get A promoter Event Details End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
|Get Promoter ticket sold revenue start
|--------------------------------------------------
*/
export type TGetPromoterTicketSoldRevenueArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"][];
};
export type TPromoterTicketSoldRevenueData = {
  category: string[] | TNullish;
  series: number[] | TNullish;
};

export type TGetPromoterTicketSoldRevenueRes =
  TApiResponse<TPromoterTicketSoldRevenueData>;

/**
|--------------------------------------------------
|Get Promoter ticket sold revenue end
|--------------------------------------------------
*/
/**
|--------------------------------------------------
|Get Promoter ticket sold list start
|--------------------------------------------------
*/
export enum ETicktetType {
  Individual = "individual",
  Group = "group",
}
export type TTicketType = `${ETicktetType}`;
export type TGetPromotersTicketSoldListArgs = TPaginationArgs & {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  type?: TTicketType;
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"][];
  hasDiscount?: "yes" | "no" | undefined;
  hasAddons?: "yes" | "no" | undefined;
  revenueAmount?: number | undefined;
  subTotal?: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};
export type TGuestListDiscount = TDiscount & {
  display: string;
};
export type TPromotersTicketSoldListData = {
  id: number;
  no: number;
  name: string;
  paidAmount: string;
  ticketTier: string;
  numberOfTickets: number;
  gender: "MALE" | "FEMALE" | "N/A";
  discount: TGuestListDiscount | TNullish;
  createdAt: string;
  addOnsCount: number | TNullish;
};

export type TGetPromotersTicketSoldListRes = TApiResponse<
  TPromotersTicketSoldListData[]
>;

/**
|--------------------------------------------------
|Get Promoter ticket sold list end
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
|Get Promoter Status Start
|--------------------------------------------------
*/
export enum EPromoterStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
}
export type TPromoterStatus = `${EPromoterStatus}`;
export type TGetPromoterStatusArgs = {
  invitationCode: string;
};
export type TPromoterStatusData = TGetPromoterStatusArgs & {
  invitationStatus: TPromoterStatus;
  message: string;
};
export type TGetPromoterStatusRes = TApiResponse<TPromoterStatusData>;

/**
|--------------------------------------------------
|Get Promoter Status End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|Get Promoter Permissions Start
|--------------------------------------------------
*/

export type TGetPromoterPermissionsArgs = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  promoterId?: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TPromoterPermissionsData = {
  promoter: TPromoter | TNullish;
  permissions: TGuestListType[] | TNullish;
};
export type TGetPromoterPermissionsRes = TApiResponse<TPromoterPermissionsData>;

/**
|--------------------------------------------------
|Get Promoter Permissions End
|--------------------------------------------------
*/
