import type { TAddOn } from "../add-ons/add-ons.types";
import type { TChallenge } from "../challenges/challenges.types";
import type {
  TApiResponse,
  TGender,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateAnEventMutation,
  useDeleteAnEventMutation,
  useLazyGetAllEventQuery,
  useUpdateAnEventMutation,
  useUpdateAnEventRelationMutation,
} from "./events-api";
import type { TDiscount, TDiscountType } from "../discounts/discounts.types";
import type { TGroupDiscount } from "../group-discounts/group-discounts.types";
import type { TLinkTracking } from "../link-tracking/link-tracking.types";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";
import type { TPromotion } from "../promotion/promotion.types";
import type { TTicketTier } from "../ticket-tier/ticket-tier.types";
import type { TVenue } from "../venues/venues.types";

export enum EEventRecurringFor {
  ONE_TIME = "ONE_TIME",
  EVERY_DAY = "EVERY_DAY",
  EVERY_WEEK = "EVERY_WEEK",
  EVERY_MONTH = "EVERY_MONTH",
  EVERY_YEAR = "EVERY_YEAR",
}

export type TEventRecurringFor = `${EEventRecurringFor}`;

export enum EEventStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published",
  ARCHIVED = "Archived",
  SCHEDULED = "Scheduled",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  ENDED = "Ended",
}

export type TEventStatus = `${EEventStatus}`;

export enum EEventType {
  UPCOMING = "upcoming",
  PAST = "past",
  ENDED = "ended",
}
export type TEventType = `${EEventType}`;

export enum EDateFilter {
  NEXT7DAYS = "next7days",
  NEXT30DAYS = "next30days",
  LAST7DAYS = "last7days",
  LAST30DAYS = "last30days",
}

export type TDateFilter = `${EDateFilter}`;

export enum ECheckInStatus {
  Entered = "Entered",
  EXPECTING = "Expecting",
}

export type TCheckInStatus = `${ECheckInStatus}`;

export enum EGuestListStatus {
  GuestList = "guestList",
  NonGuestList = "nonGuestList",
}
export type TGuestListStatus = `${EGuestListStatus}`;

/**
|--------------------------------------------------
| Create Event Start
|--------------------------------------------------
*/

export type TRequiredGratuity = {
  isGratuity: true;
  gratuityValue: number;
};

export type TNotRequiredGratuity = {
  isGratuity: false | TNullish;
  gratuityValue?: undefined;
};

export type TGratuity = TRequiredGratuity | TNotRequiredGratuity;

export type TRequiredRecurring = {
  isRecurring: true;
  recurringFor: TEventRecurringFor;
};

export type TNotRequiredRecurring = {
  isRecurring: false | TNullish;
  recurringFor?: undefined;
};

export type TRecurring = TRequiredRecurring | TNotRequiredRecurring;

export type TScheduleEventStatus = {
  status?: `${EEventStatus.SCHEDULED}`;
  publishDate: string;
};
export type TOtherScheduleEventStatus = {
  status?: Exclude<TEventStatus, `${EEventStatus.SCHEDULED}`>;
};
export type TEventStatusConditionalFields =
  | TOtherScheduleEventStatus
  | TScheduleEventStatus;

export type TGuestListOn = {
  isFreeGuestList: true;
  guestListLimit: number;
  guestListLimitType: TDiscountType;
  perUserGuestListLimitQty: number;
};

export type TGuestListOff = {
  isFreeGuestList: false;
};

export type TGuestListConditionalType = TGuestListOn | TGuestListOff;

export type TCreateAnEventArgs = {
  // time related fields
  startTime: string;
  endTime: string;
  checkInEnd: string;
  hideGuestlist: boolean;
  isCrowdMeterEnabled: boolean;
  name: string;
  description?: string;
  venueId: number;
  media: TLinkAMediaToAModuleArgs[] | undefined;
  isFennecLive?: boolean;
  isFreeGuestList?: TGuestListConditionalType;
  guestListLimit?: TGuestListOn["guestListLimit"];
  guestListLimitType?: TGuestListOn["guestListLimitType"];
  perUserGuestListLimitQty?: TGuestListOn["perUserGuestListLimitQty"];
  isGroupDiscountEnabled?: boolean;
  isDiscountEnabled?: boolean;
  isAddOnEnabled?: boolean;
  status?: TEventStatus;
  isTaxEnabled?: boolean;
  taxId?: string;
  taxName?: string;
  taxRate?: number;
} & TEventStatusConditionalFields &
  TGratuity &
  TRecurring;

export type TApiResponseExtraFields = {
  id: number;
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type TCreateEventData = Omit<TCreateAnEventArgs, "media" | "venueId"> &
  TApiResponseExtraFields & {
    media: TMedia[] | TNullish;
    slug: string;
  } & {
    publishDate?: string;
    displayLongURL?: string;
    displayShortURL?: string;
    qr?: string;
    ticketsSoldCount?: number;
  };

export type TCreatedBy = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type TEvent = {
  details: TCreateEventData;
  venue: TVenue;
  ticketTiers: TTicketTier[];
  groupDiscount: TGroupDiscount;
  discounts: TDiscount[];
  linkTracking: TLinkTracking[];
  addOns: TAddOn[];
  challenges: TChallenge[];
  promotions: TPromotion[];
  createdBy: TCreatedBy;
};

export type TCreateAnEventRes = TApiResponse<TEvent>;

export type TCreateAnEventMutation = ReturnType<
  typeof useCreateAnEventMutation
>[0];

/**
|--------------------------------------------------
| Create Event End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Event Start
|--------------------------------------------------
*/

export type TGetAllEventArgs = TPaginationArgs<
  TEvent,
  {
    type?: TEventType;
    status?: string; // comma separated TEventStatus string;
    dateFilter?: TDateFilter;
    startDate?: string;
    endDate?: string;
  }
>;

export type TGetAllEventRes = TApiResponse<TEvent[]>;
export type TLazyGetAllEventQuery = ReturnType<
  typeof useLazyGetAllEventQuery
>[0];
/**
|--------------------------------------------------
| Get All Event End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get An Event Start
|--------------------------------------------------
*/
export type TGetAnEventArgs = TIdOrSlugOrIdentifier<"slug">;

export type TGetAnEventRes = TApiResponse<TEvent>;
/**
|--------------------------------------------------
| Get An Event End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update An Event Start
|--------------------------------------------------
*/
export type TUpdateAnEventArgs = TUpdateOptionalArgs<
  TCreateAnEventArgs,
  "slug"
>;

export type TUpdateAnEventRes = TApiResponse<TEvent>;

export type TUpdateAnEventMutation = ReturnType<
  typeof useUpdateAnEventMutation
>[0];
/**
|--------------------------------------------------
| Update An Event End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update An Event Relation Start
|--------------------------------------------------
*/
export type TRelationInput = {
  id: number;
};

export type TUpdateAnEventRelationArgs = TUpdateOptionalArgs<
  {
    addOns?: TRelationInput[];
    challenges?: TRelationInput[];
    promotions?: TRelationInput[];
  },
  "slug"
>;

export type TUpdateAnEventRelationRes = TApiResponse<TEvent>;

export type TUpdateAnEventRelationMutation = ReturnType<
  typeof useUpdateAnEventRelationMutation
>[0];
/**
|--------------------------------------------------
| Update An Event Relation End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Event Start
|--------------------------------------------------
*/
export type TDeleteAnEventArgs = TIdOrSlugOrIdentifier<"slug">;

export type TDeleteAnEventRes = TApiResponse<null>;

export type TDeleteAnEventMutation = ReturnType<
  typeof useDeleteAnEventMutation
>[0];
/**
|--------------------------------------------------
| Delete Event End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Event Hourly Revenue Start
|--------------------------------------------------
*/

export type TRevenueData = {
  name: string | TNullish;
  series: number[] | TNullish;
};
export type TEventHourlyRevenueData = {
  names: string[] | TNullish;
  category: string[] | TNullish;
  data: TRevenueData | TNullish;
};
export type TGetEventHourlyRevenueArgs = TIdOrSlugOrIdentifier<"slug"> & {
  name?: string;
};
export type TGetEventHourlyRevenueRes = TApiResponse<TEventHourlyRevenueData>;

/**
|--------------------------------------------------
|  Get Event Hourly Revenue End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Guest List Start
|--------------------------------------------------
*/
export type TGuestListDiscount = TDiscount & {
  display: string;
};
export type TGuestListItem = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  ticketType: string | TNullish;
  sex: TGender | TNullish;
  entryTime: string | TNullish;
  ticketsPurchased: number | TNullish;
  status: TCheckInStatus | TNullish;
  isGuestList: boolean | TNullish;
  promoterName: string | TNullish;
  amount: number | TNullish;
  subTotal: string | TNullish;
  discount: TGuestListDiscount | TNullish;
  addOnsCount: number | TNullish;
};

export type TGuestListArgs = TPaginationArgs & {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  status?: TCheckInStatus;
  guestListFilter?: TGuestListStatus;
  sex?: TGender;
  numberOfTickets?: number;
  ticketTierId?: number;
};

export type TGuestListRes = TApiResponse<TGuestListItem[]>;

/**
|--------------------------------------------------
|  Guest List End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Check In Summery Start
|--------------------------------------------------
*/

export type TCheckInSummery = {
  totalSold: number | TNullish;
  male: number | TNullish;
  female: number | TNullish;
  notSpecified: number | TNullish;
  others: number | TNullish;
};

export type TGetCheckInSummeryArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
};

export type TGetCheckInSummeryRes = TApiResponse<TCheckInSummery>;

/**
|--------------------------------------------------
| Get Check In Summery End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Cancel Event Start
|--------------------------------------------------
*/

export type TCancelEventArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
};

export type TCancelEventRes = TApiResponse<TEvent>;

/**
|--------------------------------------------------
| Cancel Event End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| GET Event Revenue Start
|--------------------------------------------------
*/

export type TGetAnEventRevenueArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  ticketTierId?: number;
};
export type TTicketTiers = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  price: number | TNullish;
};
export type TGetAnEventRevenue = {
  ticketTiers: TTicketTiers[];
  category: string[] | TNullish;
  series: number[] | TNullish;
};
export type TGetAnEventRevenueRes = TApiResponse<TGetAnEventRevenue>;

/**
|--------------------------------------------------
| GET Event Revenue End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| GET Events Payout Start
|--------------------------------------------------
*/
enum PayoutStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
export type TPayoutStatus = `${PayoutStatus}`;
export type TGetAnEventPayoutArgs = TPaginationArgs & {
  slug?: TIdOrSlugOrIdentifier<"slug">["slug"];
  startDate?: string;
  endDate?: string;
  payoutStatus?: TPayoutStatus;
  eventId?: TIdOrSlugOrIdentifier<"id">["id"];
  id?: TIdOrSlugOrIdentifier<"id">["id"];
  paidBy?: number;
  createdBy?: string;
};
export type TEventPayoutEventDetails = {
  id: number | TNullish;
  name: string | TNullish;
  startDate: string | TNullish;
  endTime: string | TNullish;
  media: TMedia | TNullish;
};
export type TGetAnEventPayout = {
  id: number | TNullish;
  eventId: number | TNullish;
  organizationId: number | TNullish;
  totalTicketsSold: number | TNullish;
  ticketRevenue: string | TNullish;
  totalAddOnsSold: number | TNullish;
  addOnRevenue: string | TNullish;
  totalItemSold: number | TNullish;
  barRevenue: string | TNullish;
  grossRevenue: string | TNullish;
  discounts: string | TNullish;
  refunds: string | TNullish;
  netRevenue: string | TNullish;
  fennecCommission: string | TNullish;
  serviceFee: string | TNullish;
  organizerPayout: string | TNullish;
  paymentTransactionFees: string | TNullish;
  payoutStatus: TPayoutStatus | TNullish;
  notes: string | TNullish;
  paidAt: string | TNullish;
  paidBy: string | TNullish;
  createdAt: string | TNullish;
  createdBy: string | TNullish;
  updatedAt: string | TNullish;
  eventDetails: TEventPayoutEventDetails | TNullish;
  totalTaxCollected: string | TNullish;
};

export type TGetAnEventPayoutRes = TApiResponse<TGetAnEventPayout[]>;

/**
|--------------------------------------------------
| GET Events Payout End
|--------------------------------------------------
*/
