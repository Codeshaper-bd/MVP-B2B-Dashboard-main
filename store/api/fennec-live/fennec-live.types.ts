import type {
  TIdOrSlugOrIdentifier,
  TNullish,
  TApiResponse,
  TPaginationArgs,
  TGender,
} from "@/store/api/common-api-types";

import type { TEvent } from "../events/events.types";
import type { TTicketTier } from "../ticket-tier/ticket-tier.types";

/**
 |--------------------------------------------------
 | Get Fennec Live B2B Start
 |--------------------------------------------------
 */

export type TGetFennecLiveB2BData = Pick<TEvent, "details" | "venue">;

export type TGetFennecLiveB2BArgs = void;

export type TGetFennecLiveB2BRes = TApiResponse<TGetFennecLiveB2BData>;

/**
|--------------------------------------------------
| Get Fennec Live B2B End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Fennec Live B2B Challenges Start
|--------------------------------------------------
*/

export type TGetFennecLiveB2BChallenges = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  uses: number | TNullish;
  revenue: string | TNullish;
  isActive: boolean;
};

export enum TGetFennecLiveB2BChallengesSortOptions {
  Uses = "uses",
  Revenue = "revenue",
}

export type TGetFennecLiveB2BChallengesSortBy =
  `${TGetFennecLiveB2BChallengesSortOptions}`;

export type TGetFennecLiveB2BChallengesArgs = Pick<
  Exclude<TPaginationArgs, void | undefined>,
  "sortBy"
>;

export type TGetFennecLiveB2BChallengesRes = TApiResponse<
  TGetFennecLiveB2BChallenges[]
>;
/**
|--------------------------------------------------
| Get Fennec Live B2B Challenges End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Update Fennec Live B2B Challenges Start
|--------------------------------------------------
*/

export type TUpdateAFennecLiveB2BChallengesArgs = {
  body: {
    id: TIdOrSlugOrIdentifier<"id">["id"];
    isActive: boolean;
  };
};

export type TUpdateAFennecLiveB2BChallengesRes =
  TApiResponse<TGetFennecLiveB2BChallenges>;

/**
|--------------------------------------------------
|  Update Fennec Live B2B Challenges End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live B2B Guest List Start
|--------------------------------------------------
*/

export type TGenderBreakdown = {
  total: number | TNullish;
  male: number | TNullish;
  female: number | TNullish;
  unisex: number | TNullish;
};

export type TEventAttendees = {
  expecting: number | TNullish;
  checkedIn: TGenderBreakdown;
  totalNotCheckedIn: number | TNullish;
};

export type TTicketSoldAttendees = Omit<
  TEventAttendees,
  "totalNotCheckedIn" | "totalNotCheckedIn"
> & { total: number | TNullish; notCheckedIn: number | TNullish };
export type TTicketSold = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  userId: number | TNullish;
  userName: string | TNullish;
  userGender: string | TNullish;
  soldQty: number | TNullish;
  ticketTier: TTicketTier;
  attendees: Omit<TEventAttendees, "totalNotCheckedIn" | "totalNotCheckedIn">;
};
export type TGetFennecLiveB2BGuestListData = {
  event: TEvent;
  attendees: TEventAttendees;
  ticketsSold: TTicketSold;
};

export type TGetFennecLiveB2BGuestListArgs = void;
export type TGetFennecLiveB2BGuestListRes =
  TApiResponse<TGetFennecLiveB2BGuestListData>;

/**
|--------------------------------------------------
|  Get Fennec Live B2B Guest List End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Fennec Live B2B Promotions Start
|--------------------------------------------------
*/

export type TGetFennecLiveB2BPromotions = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  uses: number | TNullish;
  revenue: string | TNullish;
  isActive: boolean;
};
export type TGetFennecLiveB2BPromotionsArgs = Pick<
  Exclude<TPaginationArgs, void | undefined>,
  "sortBy"
>;
export type TGetFennecLiveB2BPromotionsRes = TApiResponse<
  TGetFennecLiveB2BPromotions[]
>;
/**
|--------------------------------------------------
| Get Fennec Live B2B Challenges End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Update Fennec Live B2B Promotions Start
|--------------------------------------------------
*/

export type TUpdateFennecLiveB2BPromotionsArgs = {
  body: {
    id: TIdOrSlugOrIdentifier<"id">["id"];
    isActive: boolean;
  };
};

export type TUpdateFennecLiveB2BPromotionsRes =
  TApiResponse<TGetFennecLiveB2BPromotions>;

/**
|--------------------------------------------------
|  Update Fennec Live B2B Promotions End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live Bar Statistics Start
|--------------------------------------------------
*/

export type TFennecLiveBarStat = {
  barName: string | TNullish;
  totalRevenue: string | TNullish;
  totalOrders: number | TNullish;
  barRevenue?: string | TNullish;
};

export type TGetFennecLiveRevenueOverTime = {
  name: string | TNullish;
  sales: number[];
  time: string[];
};
export type TGetFennecLiveBarStatistics = {
  barStats: TFennecLiveBarStat[];
  revenueOverTime: TGetFennecLiveRevenueOverTime[];
};
export type TGetFennecLiveBarStatisticsArgs = void;
export type TGetFennecLiveBarStatisticsRes =
  TApiResponse<TGetFennecLiveBarStatistics>;

/**
|--------------------------------------------------
|  Get Fennec Live Bar Statistics End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live Revenue Overview Start
|--------------------------------------------------
*/

export type TGetFennecLiveRevenueOverview = {
  totalEventRevenue: string | TNullish;
  guestlistRevenue: string | TNullish;
  barRevenue: string | TNullish;
  barStats: TFennecLiveBarStat[];
  revenueChange?: number | TNullish;
};
export type TGetFennecLiveRevenueOverviewArgs = void;
export type TGetFennecLiveRevenueOverviewRes =
  TApiResponse<TGetFennecLiveRevenueOverview>;

/**
|--------------------------------------------------
|  Get Fennec Live Revenue Overview End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live Revenue Over Time Start
|--------------------------------------------------
*/
export type TFennecLiveRevenueItem = {
  time: string | TNullish;
  total: number | TNullish;
  bar: number | TNullish;
  guestlist: number | TNullish;
};

export type TGetFennecLiveRevenueOverviewTime = {
  revenueOverTime: TFennecLiveRevenueItem[];
};
export type TGetFennecLiveRevenueOverTimeArgs = void;
export type TGetFennecLiveRevenueOverTimeRes =
  TApiResponse<TGetFennecLiveRevenueOverviewTime>;

/**
|--------------------------------------------------
|  Get Fennec Live Revenue Over Time End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live Bar Revenue Over Time Start
|--------------------------------------------------
*/
export type TBarRevenueOverTimeItem = {
  name: string | TNullish;
  sales: number[] | TNullish;
  time: string[] | TNullish;
};

export type TGetFennecLiveBarRevenueOverTimeArgs = void;
export type TGetFennecLiveBarRevenueOverTimeRes = TApiResponse<
  TBarRevenueOverTimeItem[]
>;

/**
|--------------------------------------------------
|  Get Fennec Live Bar Revenue Over Time  End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live Total Guestlist Start
|--------------------------------------------------
*/
export type TTicketTierStat = {
  ticketTierId: number | TNullish;
  name: string | TNullish;
  checkedIn: number | TNullish;
};
export type TFennecLiveTotalGuestlist = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  totalAttendees: number | TNullish;
  totalEntered: number | TNullish;
  genderBreakdown: Omit<TGenderBreakdown, "total"> | TNullish;
  genderRatio: string | TNullish;
  ticketTierStats: TTicketTierStat[];
  regular: number | TNullish;
  group: number | TNullish;
};

export type TGetFennecLiveTotalGuestlistArgs = void;
export type TGetFennecLiveTotalGuestlistRes =
  TApiResponse<TFennecLiveTotalGuestlist>;

/**
|--------------------------------------------------
| Get Fennec Live Total Guestlist End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live Non Guestlist Start
|--------------------------------------------------
*/

export type TGetFennecLiveNonGuestlist = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  total: number | TNullish;
  male: number | TNullish;
  female: number | TNullish;
  unisex: number | TNullish;
};
export type TGetFennecLiveNonGuestlistArgs = void;
export type TGetFennecLiveNonGuestlistRes =
  TApiResponse<TGetFennecLiveNonGuestlist>;

/**
|--------------------------------------------------
| Get Fennec Live Total Guestlist End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live  Guestlist Details Start
|--------------------------------------------------
*/

export type TGetFennecLiveGuestlistDetails = {
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  total: number | TNullish;
  male: number | TNullish;
  female: number | TNullish;
  unisex: number | TNullish;
};

export enum ECheckInStatus {
  ENTIRED = "entired",
  EXPECTING = "expecting",
}

export type TCheckInStatus = `${ECheckInStatus}`;

export type TAttendees = {
  total: number | TNullish;
  checkedIn: TGenderBreakdown;
  notCheckedIn: number | TNullish;
};

export type TGetFennecLiveGuestlistItem = {
  no: number | TNullish;
  name: string | TNullish;
  ticketType: string | TNullish;
  sex: TGender;
  entryTime: string | TNullish;
  ticketsPurchased: number | TNullish;
  attendees: TAttendees;
  status: TCheckInStatus;
};

export type TGetFennecLiveGuestlistDetailsArgs = TPaginationArgs<
  TGetFennecLiveGuestlistItem,
  {
    status?: TCheckInStatus;
    sex?: TGender;
  }
>;
export type TGetFennecLiveGuestlistDetailsRes = TApiResponse<
  TGetFennecLiveGuestlistItem[]
>;

/**
|--------------------------------------------------
| Get Fennec Live  Guestlist Details End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get Fennec Live Non Guestlist Details Start
|--------------------------------------------------
*/

export type TGetFennecLiveNonGuestlistItem = {
  no: number | TNullish;
  name: string | TNullish;
  sex: TGender;
  time: string | TNullish;
  totalEntered: number | TNullish;
};

export type TGetFennecLiveNonGuestlistDetailsArgs = TPaginationArgs<
  TGetFennecLiveNonGuestlistItem,
  {
    sex?: TGender;
  }
>;
export type TGetFennecLiveNonGuestlistDetailsRes = TApiResponse<
  TGetFennecLiveNonGuestlistItem[]
>;

/**
|--------------------------------------------------
| Get Fennec Live Non Guestlist Details End
|--------------------------------------------------
*/
