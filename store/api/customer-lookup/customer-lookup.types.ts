import type { TGender } from "../auth/auth.types";
import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
} from "../common-api-types";
import type { useLazyGetAllCustomerLookupQuery } from "./customer-lookup-api";
import type { TMedia } from "../media/media.types";

export enum ELastPurchase {
  "24h" = "24h",
  "7d" = "7d",
  "30d" = "30d",
}
export type TLastPurchase = `${ELastPurchase}`;

export enum EMonths {
  "January" = 1,
  "February" = 2,
  "March" = 3,
  "April" = 4,
  "May" = 5,
  "June" = 6,
  "July" = 7,
  "August" = 8,
  "September" = 9,
  "October" = 10,
  "November" = 11,
  "December" = 12,
}
export type TMonth = `${EMonths}`;

type TMonthNumbers = [
  `${EMonths.January}`,
  `${EMonths.February}`,
  `${EMonths.March}`,
  `${EMonths.April}`,
  `${EMonths.May}`,
  `${EMonths.June}`,
  `${EMonths.July}`,
  `${EMonths.August}`,
  `${EMonths.September}`,
  `${EMonths.October}`,
  `${EMonths.November}`,
  `${EMonths.December}`,
];

type TGenerateMonthSuggestions<
  T extends string[] = TMonthNumbers,
  Acc extends string = "",
> = T extends [infer First extends string, ...infer Rest extends string[]]
  ? Acc extends ""
    ? First | TGenerateMonthSuggestions<Rest, First>
    : `${Acc},${First}` | TGenerateMonthSuggestions<Rest, `${Acc},${First}`>
  : never;

export type TMonthSuggestions = TGenerateMonthSuggestions;

export type TCustomerLookup = {
  id: number;
  customerId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: TGender;
  birthday: string;
  address: string;
  lastVisit: string;
  totalOrders: number;
  totalSpent: number;
  media: TMedia[] | TNullish;
};

/**
|--------------------------------------------------
|  Invite/Create Customer Start
|--------------------------------------------------
*/
export type TStatusObj = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  description: string | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
};
export type TInvitedCustomer = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  email: string | number | TNullish;
  phone: string | TNullish;
  status: number | TNullish;
  userId: number | null | TNullish;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  Status?: TStatusObj;
};

export type TInviteCustomerArgs = {
  name: string;
  email?: string;
  phone: string;
};
export type TInviteCustomerRes = TApiResponse<TInviteCustomerArgs>;
/**
|--------------------------------------------------
|  Invite/Create Customer End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
|  Get All Invited Customer Start
|--------------------------------------------------
*/

export type TGetAllCustomerArgs = TPaginationArgs<TInvitedCustomer>;

export type TGetAllCustomerRes = TApiResponse<TInvitedCustomer[]>;
export type TLazyGetAllCustomerQuery = ReturnType<
  typeof useLazyGetAllCustomerLookupQuery
>[0];
/**
|--------------------------------------------------
|  Get All Invited Customer End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
| Get All CustomerLookups Start
|--------------------------------------------------
*/
export type TGetAllCustomerLookupArgs = TPaginationArgs<
  TCustomerLookup,
  {
    gender?: TGender;
    birthdayMonth?: TMonthSuggestions;
    lastPurchase?: TLastPurchase;
    startDate?: string;
    endDate?: string;
  }
>;

export type TGetAllCustomerLookupRes = TApiResponse<TCustomerLookup[]>;

/**
|--------------------------------------------------
| Get All CustomerLookups End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Customer Lookup Start
|--------------------------------------------------
*/
export type TGetACustomerLookupArgs = TIdOrSlugOrIdentifier<"id">;

export type TGetACustomerLookupRes = TApiResponse<TCustomerLookup>;
/**
|--------------------------------------------------
| Get A Customer Lookup End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All CustomerLookups End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get User Event Joined Start
|--------------------------------------------------
*/
export type TUserEventJoined = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  name: string | TNullish;
  date: string | TNullish;
  startTime: string | TNullish;
  price: number | TNullish;
  media: TMedia | TNullish;
};
export type TGetUserEventJoinedArgs = TPaginationArgs<TUserEventJoined> & {
  userId: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TUserEventJoinedData = {
  month: string | TNullish;
  events: TUserEventJoined[] | TNullish;
};
export type TGetUserEventJoinedRes = TApiResponse<TUserEventJoinedData[]>;
/**
|--------------------------------------------------
| Get User Event Joined End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get User Orders By Month Start
|--------------------------------------------------
*/

export type TUserOrder = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  type: string | TNullish;
  name: string | TNullish;
  price: number | TNullish;
  createdAt: string | TNullish;
  media: TMedia | TNullish;
};
export type TUserOrdersByMonth = {
  month: string | TNullish;
  items: TUserOrder[] | TNullish;
};
export type TGetUserOrdersByMonthArgs = TPaginationArgs<TUserOrdersByMonth> & {
  userId: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TGetUserOrdersByMonthRes = TApiResponse<TUserOrdersByMonth[]>;
/**
|--------------------------------------------------
| Get User Orders By Month End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Customers Statistics Start
|--------------------------------------------------
*/

export type TCustomersStatistics = {
  totalSpend: number | TNullish;
  barSpend: number | TNullish;
  ticketSpend: number | TNullish;
  numberOfTickets: number | TNullish;
  averageBarSpend: number | TNullish;
  averageTicketSpend: number | TNullish;
  totalVisit: number | TNullish;
};
export type TGetCustomersStatisticsArgs = {
  customerId: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TGetCustomersStatisticsRes = TApiResponse<TCustomersStatistics>;
/**
|--------------------------------------------------
| Get Customers Statistics End
|--------------------------------------------------
*/
