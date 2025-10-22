import type {
  TApiResponse,
  TGender,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useLazyGetAllPromotersQuery,
  useLazyGetAllUnassignedPromotersQuery,
} from "./promoters-api";
import type { TEvent, TEventStatus } from "../events/events.types";
import type { TMedia } from "../media/media.types";
import type {
  TPromotersTicketSoldListData,
  TTicketType,
} from "../promoter/promoter.types";

export enum EGuestListType {
  DefaultGuestList = "DEFAULT_GUESTLIST",
  PrivateGuestList = "PRIVATE_GUESTLIST",
  TableManagement = "TABLE_MANAGEMENT",
}
export type TGuestListType = `${EGuestListType}`;
export enum EPublicTicketRateType {
  FixedAmount = "FIXED_AMOUNT",
  Percentage = "PERCENTAGE",
}
export type TPublicTicketRateType = `${EPublicTicketRateType}`;
/**
|--------------------------------------------------
| create or invite a promoter start
|--------------------------------------------------
*/

export type TPromoterData = {
  message?: string | TNullish;
  link?: string | TNullish;
  promoterOrganizationId?: TIdOrSlugOrIdentifier<"id">["id"] | TNullish;
};
export type TCreatePromoterArgs = {
  promoter: string;
  assignedEvent?: number[] | TNullish;
  permissions?: TGuestListType[] | TNullish;
  publicRatePerTicketSold?: number;
  publicTicketRateType?: TPublicTicketRateType;
  ratePerPrivateGuestListEntry?: number;
};

export type TCreatePromoterRes = TApiResponse<TPromoterData>;

/**
|--------------------------------------------------
|  create or invite a promoter End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| get all promoters start
|--------------------------------------------------
*/

export type TPromoterEvents = {
  details:
    | TEvent["details"]
    | (TNullish & {
        isRecurring?: boolean | TNullish;
        recurringFor?: string | TNullish;
      });
  venue: TEvent["venue"] | TNullish;
  promoterLink: string | TNullish;
};
export type TPromoter = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  userId: TIdOrSlugOrIdentifier<"id">["id"] | TNullish;
  fullName: string | TNullish;
  firstName?: string | TNullish;
  lastName?: string | TNullish;
  email: string | TNullish;
  phone: string;
  dob: string | TNullish;
  gender: TGender | TNullish;
  address: string | TNullish;
  media: TMedia | TNullish;
  permissions: TGuestListType[] | TNullish;
  latestEvent: TPromoterEvents | TNullish;
  publicRatePerTicketSold: number | TNullish;
  publicTicketRateType: TPublicTicketRateType | TNullish;
  ratePerPrivateGuestListEntry: number | TNullish;
  totalAssignedEvent: number | TNullish;
};

export type TGetAllPromotersArgs = TPaginationArgs;
export type TGetAllPromotersRes = TApiResponse<TPromoter[]>;

export type TLazyGetAllPromotersQuery = ReturnType<
  typeof useLazyGetAllPromotersQuery
>[0];

/**
|--------------------------------------------------
| get all promoters End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| get an promoters events start
|--------------------------------------------------
*/

export type TGetAnPromotersArgs = TPaginationArgs<TPromoterEvents> & {
  promoterId: TIdOrSlugOrIdentifier<"id">["id"];
  eventStatus?: TEventStatus;
};

export type TGetAnPromotersRes = TApiResponse<TPromoterEvents[]>;

/**
|--------------------------------------------------
| get an promoters events end
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| get all available promoters start
|--------------------------------------------------
*/
export type TGetAllAvailablePromotersArgs = TPaginationArgs;

export type TGetAllAvailablePromotersRes = TApiResponse<TPromoter[]>;

/**
|--------------------------------------------------
| get all available promoters end
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| get all unassigned promoters event start
|--------------------------------------------------
*/

export type TGetAllUnassignedPromotersArgs = TPaginationArgs & {
  promoterId?: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TGetAllUnassignedPromotersRes = TApiResponse<TPromoterEvents[]>;

/**
|--------------------------------------------------
| get all unassigned promoters event end
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Remove promoter from event start
|--------------------------------------------------
*/
export type TRemovePromoterFromEventArgs = {
  promoterId: TIdOrSlugOrIdentifier<"id">["id"];
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TRemovePromoterFromEventRes = TApiResponse<TPromoterEvents[]>;
export type TLazyGetAllUnassignedPromoters = ReturnType<
  typeof useLazyGetAllUnassignedPromotersQuery
>[0];
/**
|--------------------------------------------------
|Remove promoter from event end
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|Get Promoter revenue start
|--------------------------------------------------
*/
export enum EPromoterTimeRange {
  TwelveHours = "12h",
  TwentyFourHours = "24h",
  SevenDays = "7d",
  ThirtyDays = "30d",
  ThreeMonths = "3m",
  All = "all",
}
export type TPromoterTimeRange = `${EPromoterTimeRange}`;
export enum EPromoterType {
  guestlist = "guestlist",
  revenue = "revenue",
}
export type TPromoterType = `${EPromoterType}`;
export type TGetPromoterRevenueArgs = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  timeRange?: TPromoterTimeRange;
  type?: TPromoterType;
};

export type TPromoterChart = {
  category: string[];
  series: number[];
};
export type TPromoterRevenueData = {
  promoter: Pick<TPromoter, "fullName" | "phone" | "media"> | TNullish;
  revenue: TPromoterChart | TNullish;
  totalGuestlist?: number | TNullish;
};

export type TGetPromoterRevenueRes = TApiResponse<TPromoterRevenueData>;

/* ******************************************************************************************************************************************************************************************** */
/**
|--------------------------------------------------
| Delete promoter start
|--------------------------------------------------
*/

export type TDeletePromoterArgs = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TDeletePromoterRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete promoter end
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Assign promoter to event start
|--------------------------------------------------
*/

export type TAssignPromoterToEventArgs = {
  userId: TIdOrSlugOrIdentifier<"id">["id"];
  eventIds: TIdOrSlugOrIdentifier<"id">["id"][];
};

export type TAssignPromoterToEventRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Assign promoter to event end
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Check Promoter Status Start
|--------------------------------------------------
*/

export type TCheckPromoterStatusArgs = {
  phone: string;
};
export enum ECheckInvitationStatus {
  EXIST_IN_ORGANIZATION = "existInOrganization",
  INVITED = "invited",
  EXIST = "exist",
  NEW = "new",
}
export type TCheckInvitationStatus = `${ECheckInvitationStatus}`;

export type TCheckPromoterData = {
  status: TCheckInvitationStatus;
  message: string;
  promoter?: TPromoter;
};
export type TCheckPromoterStatusRes = TApiResponse<TCheckPromoterData>;

/**
|--------------------------------------------------
| Get Check Promoter Status End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Promoter Details Start
|--------------------------------------------------
*/

export type TGetAPromoterDetailsArgs = {
  userId: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TGetAPromoterDetailAssignedEvent = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  startTime: string | TNullish;
  endTime: string | TNullish;
  isRecurring: boolean | TNullish;
  recurringFor: string | TNullish;
  status: TEventStatus;
};
export type TGetAPromoterDetail = TPromoter & {
  assignedEvents: TGetAPromoterDetailAssignedEvent[];
};
export type TGetAPromoterDetailsRes = TApiResponse<TGetAPromoterDetail>;

/**
|--------------------------------------------------
| Get Promoter Details End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Promoter Details Start
|--------------------------------------------------
*/

export type TUpdateAPromoterAssignmentsArgs = TUpdateOptionalArgs<
  TCreatePromoterArgs,
  "id"
>;

export type TUpdateAPromoterAssignmentsRes = TApiResponse<TPromoter>;

/**
|--------------------------------------------------
| Get Promoter Details End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|Get Promoter ticket sold start
|--------------------------------------------------
*/
export type TGetPromoterTicketSoldArgs = {
  promoterId: TIdOrSlugOrIdentifier<"id">["id"];
  eventId?: TIdOrSlugOrIdentifier<"id">["id"];
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TPromoterTicketSoldData = {
  promoterName: string;
  totalSoldQty: number;
  totalSoldAmount: number;
  attendees: {
    male: number;
    female: number;
    otherOrUnspecified: number;
  };
};

export type TGetPromoterTicketSoldRes = TApiResponse<TPromoterTicketSoldData>;
/**
|--------------------------------------------------
|Get Promoter ticket sold end
|--------------------------------------------------
*/
/**
|--------------------------------------------------
|Get Promoter ticket sold revenue start
|--------------------------------------------------
*/
export type TGetPromoterTicketSoldRevenueArgs = {
  promoterId: TIdOrSlugOrIdentifier<"id">["id"];
  eventSlug?: string;
  value?: TIdOrSlugOrIdentifier<"id">["id"];
  unit?: string;
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TPromoterTicketSoldRevenueData = {
  category: string[] | TNullish;
  series: number[] | TNullish;
};

export type TGetPromoterTicketSoldRevenueRes =
  TApiResponse<TPromoterTicketSoldRevenueData>;

/**
|--------------------------------------------------
|Get Promoters Tracking Link start
|--------------------------------------------------
*/

export type TGetPromotersTrackingLinkArgs = {
  eventId?: TIdOrSlugOrIdentifier<"id">["id"];
  promoterId?: TIdOrSlugOrIdentifier<"id">["id"];
};
export type TPromotersTrackingLinkData = {
  url: string | TNullish;
  qrCode: string | TNullish;
};

export type TGetPromotersTrackingLinkRes =
  TApiResponse<TPromotersTrackingLinkData>;

/**
|--------------------------------------------------
|Get Promoters Tracking Link end
|--------------------------------------------------
*/
/**
|--------------------------------------------------
|Get Promoter ticket sold list start
|--------------------------------------------------
*/
export type TGetPromotersAdminTicketSoldListArgs = TPaginationArgs & {
  promoterId: TIdOrSlugOrIdentifier<"id">["id"];
  eventId: TIdOrSlugOrIdentifier<"id">["id"];
  type?: TTicketType;
  ticketTierId?: TIdOrSlugOrIdentifier<"id">["id"];
  hasDiscount?: "yes" | "no" | undefined;
  hasAddons?: "yes" | "no" | undefined;
  revenueAmount?: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

export type TGetPromotersAdminTicketSoldListRes = TApiResponse<
  TPromotersTicketSoldListData[]
>;

/**
|--------------------------------------------------
|Get Promoter ticket sold list end
|--------------------------------------------------
*/
