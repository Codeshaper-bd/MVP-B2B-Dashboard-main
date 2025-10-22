import type {
  TNullish,
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TPaginationArgs,
  TGender,
} from "@/store/api/common-api-types";

import type { TGuestListDiscount } from "../events/events.types";
import type { TMedia } from "../media/media.types";

export type TCommonPastEventArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
};

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get  Past Event Bar  Start
|--------------------------------------------------
*/
type TRevenueChange = {
  totalEventRevenue: number | TNullish;
  guestlistRevenue: number | TNullish;
  barRevenue: number | TNullish;
};
type TPastEventBarStats = {
  barName: string | TNullish;
  totalRevenue: number | TNullish;
  totalOrders: number | TNullish;
  barRevenue: number | TNullish;
  revenueChange: number | TNullish;
};
type TPastEventRevenue = {
  totalEventRevenue: number | TNullish;
  guestlistRevenue: number | TNullish;
  barRevenue: number | TNullish;
  barStats: TPastEventBarStats[];
  revenueChange: TRevenueChange;
};

export type TStaticsItem = {
  name: string | TNullish;
  sales: number[] | TNullish;
  time: string[] | TNullish;
};

type TGetPastEventBar = {
  revenue: TPastEventRevenue;
  statistic: TStaticsItem[];
};
export type TGetPastEventBarArgs = TCommonPastEventArgs;

export type TGetPastEventBarRes = TApiResponse<TGetPastEventBar>;
/**
|--------------------------------------------------
|   Get  Past Event Bar  End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get  Past Event Guest List Check In Start
|--------------------------------------------------
*/
export enum ECheckInStatus {
  ENTIRED = "entired",
  EXPECTING = "expecting",
}

export type TCheckInStatus = `${ECheckInStatus}`;

export enum EGuestListStatus {
  GuestList = "guestList",
  NonGuestList = "nonGuestList",
}
export type TGuestListStatus = `${EGuestListStatus}`;

export type TGetPastEventGuestListCheckIn = {
  name: string | TNullish;
  ticketType: string | TNullish;
  sex: TGender;
  entryTime: string | TNullish;
  ticketsPurchased: number | TNullish;
  status: TCheckInStatus;
  isGuestList: boolean | TNullish;
  amount: number | TNullish;
  addOnsCount: number | TNullish;
  discount: TGuestListDiscount | TNullish;
};

export type TGetPastEventGuestListCheckInArgs = TPaginationArgs<
  TGetPastEventGuestListCheckIn,
  {
    status?: TCheckInStatus;
    guestListFilter?: TGuestListStatus;
    sex?: TGender;
    numberOfTickets?: number;
    ticketTierId?: number;
    promoterId?: number;
  }
> &
  TCommonPastEventArgs;
export type TGetPastEventGuestListCheckInRes = TApiResponse<
  TGetPastEventGuestListCheckIn[]
>;

/**
|--------------------------------------------------
|   Get  Past Event Guest List Check In End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get  Past Event Guest List Overview Start
|--------------------------------------------------
*/

export type TGenderDistribution = {
  male: number | TNullish;
  female: number | TNullish;
  unisex: number | TNullish;
};

export type TEntries = {
  total: number | TNullish;
  genderDistribution: TGenderDistribution | TNullish;
};

export type TEventAttendees = {
  totalAttendees: number | TNullish;
  totalEntries: TEntries | TNullish;
  guestlistEntries: TEntries | TNullish;
  nonGuestlistEntries: TEntries | TNullish;
};

export type TGetPastEventGuestListOverviewArgs = TCommonPastEventArgs;
export type TGetPastEventGuestListOverviewRes = TApiResponse<TEventAttendees>;

/**
|--------------------------------------------------
|    Get  Past Event Guest List Overview End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get  Past Event Orders Start
|--------------------------------------------------
*/
export enum EOrderStatus {
  Cancelled = "Cancelled",
  Completed = "Completed",
  Pending = "Pending",
}
export type TOrderStatus = `${EOrderStatus}`;

export type TPastEventOrder = {
  orderId: number | TNullish;
  customerName: string | TNullish;
  barName: string | TNullish;
  barImage: TMedia | TNullish;
  bartenderName: string | TNullish;
  status: TOrderStatus | TNullish;
  total: string | TNullish;
  createdAt: string | TNullish;
};

export type TGetPastEventOrderArgs = TPaginationArgs<
  TPastEventOrder,
  {
    status?: TOrderStatus;
  }
> &
  TCommonPastEventArgs;
export type TGetPastEventOrderRes = TApiResponse<TPastEventOrder[]>;

/**
|--------------------------------------------------
|    Get  Past Event Orders End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get  Past Event Challenge Start
|--------------------------------------------------
*/

export enum EPastEventSortOptions {
  Uses = "uses",
  Revenue = "revenue",
}

export type TPastEventSortOptions = `${EPastEventSortOptions}`;

export type TChallengePromotion = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  uses: number | TNullish;
  revenue: string | TNullish;
};

export type TGetPastEventChallengesArgs = TPaginationArgs<
  TChallengePromotion,
  {
    sortBy?: TPastEventSortOptions;
  }
> &
  TCommonPastEventArgs;

export type TGetPastEventChallengesRes = TApiResponse<TChallengePromotion[]>;

/**
|--------------------------------------------------
|  Get  Past Event Challenge  End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get  Past Event Promotion  Start
|--------------------------------------------------
*/

export type TGetPastEventPromotionArgs = TPaginationArgs<
  TChallengePromotion,
  {
    sortBy?: TPastEventSortOptions;
  }
> &
  TCommonPastEventArgs;

export type TGetPastEventPromotionRes = TApiResponse<TChallengePromotion[]>;
/**
|--------------------------------------------------
|   Get  Past Event Promotion  End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get  Past Event Overview Revenue   Start
|--------------------------------------------------
*/

export type TChart = {
  category: string[] | TNullish;
  series: number[] | TNullish;
};
export type TRevenue = {
  name: string | TNullish;
  data: number[] | TNullish;
};
export type TRevenueOverTime = {
  category: string[] | TNullish;
  revenue: TRevenue[] | TNullish;
};
export type TRevenueSummary = {
  totalRevenue: number | TNullish;
  barRevenue: number | TNullish;
  guestlistRevenue: number | TNullish;
  revenueGraph: TChart | TNullish;
  barRevenueGraph: TChart | TNullish;
  ticketRevenueGraph: TChart | TNullish;
  revenueOverTime: TRevenueOverTime | TNullish;
};
export type TGetRevenueOverviewArgs = TCommonPastEventArgs;
export type TGetRevenueOverviewRes = TApiResponse<TRevenueSummary>;

/**
|--------------------------------------------------
|  Get  Past Event Overview Revenue   End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get  Past Event Transactions   Start
|--------------------------------------------------
*/

export type TPastEventTransaction = {
  transactionId: number | TNullish;
  clientName: string | TNullish;
  transactionTime: string | TNullish;
  receiptDate: string | TNullish;
  category: string | TNullish;
};

export type TGetPastEventTransactionArgs =
  TPaginationArgs<TPastEventTransaction> & TCommonPastEventArgs;
export type TGetPastEventTransactionRes = TApiResponse<TPastEventTransaction[]>;

/**
|--------------------------------------------------
|   Get  Past Event Transactions   End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
