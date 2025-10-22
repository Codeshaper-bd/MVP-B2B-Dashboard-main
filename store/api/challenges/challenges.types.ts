import type { IApexAreaChartSeries } from "@/lib/charts/types";

import type { TBarMenuItem } from "../bar-menu-item/bar-menu-item.types";
import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TTimeRange,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useCreateAChallengeMutation,
  useDeleteAChallengeMutation,
  useUpdateAChallengeMutation,
} from "./challenges-api";
import type { TEventStatus } from "../events/events.types";
import type { TMedia } from "../media/media.types";
import type { TVenue } from "../venues/venues.types";
export enum EStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  EXPIRED = "Expired",
}

export type TStatus = `${EStatus}`;

/**
|--------------------------------------------------
| Create Challenge Start
|--------------------------------------------------
*/

export enum EChallengeType {
  SPENT = "SPENT",
  INVITE_FRIENDS = "INVITE_FRIENDS",
  CHECK_IN_BEFORE = "CHECK_IN_BEFORE",
  PURCHASE = "PURCHASE",
}

export type TChallengeType = `${EChallengeType}`;

export type TCreateChallengeCommonArgs = {
  name: string;
  startDate: string;
  endDate: string;
  pointsEarned: number;
  description: string;
  maxRedemptionPerNight?: number;
};

export type TTCreateChallengeExtraCommonArgs = {
  slug?: string;
  attempts?: number;
  isCompleted?: boolean;
  status?: TStatus;
};

export type TSpendType = {
  type: `${EChallengeType.SPENT}`;
  targetAmount: number;
};

export type TInviteFriendsType = {
  type: `${EChallengeType.INVITE_FRIENDS}`;
  targetQuantity: number;
};

export type TCheckInBeforeType = {
  type: `${EChallengeType.CHECK_IN_BEFORE}`;
  expireTime: string;
};

export type TPurchaseType = {
  type: `${EChallengeType.PURCHASE}`;
  targetQuantity: number;
  productId: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TCreateChallengeArgs = TCreateChallengeCommonArgs &
  TTCreateChallengeExtraCommonArgs &
  (TSpendType | TInviteFriendsType | TCheckInBeforeType | TPurchaseType);

export type TPurchaseTypeApiData = Omit<TPurchaseType, "productId"> & {
  product: TBarMenuItem;
};

export type TChallenge = TCreateChallengeCommonArgs &
  (
    | TSpendType
    | TInviteFriendsType
    | TCheckInBeforeType
    | TPurchaseTypeApiData
  ) & {
    id: number;
    // extra common fields
    slug: string;
    attempts?: number;
    isCompleted: boolean;
    status: TStatus;

    // timestamps
    createdAt: string;
    updatedAt: string;
  };

export type TCreateChallengeRes = TApiResponse<TChallenge>;

export type TCreateAChallengeMutation = ReturnType<
  typeof useCreateAChallengeMutation
>[0];

/**
|--------------------------------------------------
| Create Challenge End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get All Challenges Start
|--------------------------------------------------
*/
export type TGetAllChallengeArgs = TPaginationArgs<
  TChallenge,
  {
    status?: TStatus;
    barMenuItemSlug?: TIdOrSlugOrIdentifier<"slug">["slug"];
    startDate?: string;
    endDate?: string;
  }
>;

export type TGetAllChallengeRes = TApiResponse<TChallenge[]>;

/**
|--------------------------------------------------
| Get All Challenges End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Challenge Start
|--------------------------------------------------
*/
export type TGetAChallengeArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
};

export type TGetAChallenge = TChallenge & {
  product: TBarMenuItem;
};
export type TGetAChallengeRes = TApiResponse<TGetAChallenge>;
/**
|--------------------------------------------------
| Get A Challenge End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update A Challenge Start
|--------------------------------------------------
*/
export type TUpdateAChallengeArgs = TUpdateOptionalArgs<
  TCreateChallengeArgs,
  "slug"
>;

export type TUpdateAChallengeRes = TApiResponse<TChallenge>;

export type TUpdateAChallengeMutation = ReturnType<
  typeof useUpdateAChallengeMutation
>[0];
/**
|--------------------------------------------------
| Update A Challenge End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Delete Challenge Start
|--------------------------------------------------
*/
export type TDeleteAChallengeArgs = TIdOrSlugOrIdentifier<"slug">;

export type TDeleteAChallengeRes = TApiResponse<null>;

export type TDeleteAChallengeMutation = ReturnType<
  typeof useDeleteAChallengeMutation
>[0];
/**
|--------------------------------------------------
| Delete Challenge End
|--------------------------------------------------
*/

/* **************************************************************************************************
==== 
 -- Challenges Overview Api Types
====
****************************************************************************************** */

/**
|--------------------------------------------------
| Revenue Generated By Challenges Start
|--------------------------------------------------
*/

export type TRevenueSeries = {
  name: string | TNullish;
  data: number[] | TNullish;
};

export type TRevenueByChallenges = {
  categories: string[];
  series: IApexAreaChartSeries[];
};

export type TGetRevenueByChallengesArgs = {
  filterType?: TTimeRange;
  startDate?: string;
  endDate?: string;
};
export type TGetRevenueByChallengesRes = TApiResponse<TRevenueByChallenges>;

/**
|--------------------------------------------------
| Revenue Generated By Challenges End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Top Challenges Start
|--------------------------------------------------
*/

export type TTopChallenges = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string;
  points: number;
  completed: number;
  pointsGivenOut: number;
};
export type TGetTopChallengesArgs = TPaginationArgs<{
  type?: TChallengeType;
  startDate?: string;
  endDate?: string;
}>;
export type TGetTopChallengesRes = TApiResponse<TTopChallenges[]>;
/**
|--------------------------------------------------
|  Get Top Challenges End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Total Engagement of Challenge Start
|--------------------------------------------------
*/

export type TTotalEngagementOfChallenge = {
  totalPoints: number | TNullish;
  redemptionPercent: number | TNullish;
  increase: boolean;
  percentage: number | TNullish;
};

export type TGetTotalEngagementOfChallengeArgs = {
  type?: TChallengeType;
  startDate?: string;
  endDate?: string;
};
export type TGetTotalEngagementOfChallengeRes =
  TApiResponse<TTotalEngagementOfChallenge>;

/**
|--------------------------------------------------
|  Get Total Engagement of Challenge End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get A Challenge Active Events Start
|--------------------------------------------------
*/

export type TGetAChallengeActiveEventsArgs = {
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
};
export type TActiveEvent = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  slug: TIdOrSlugOrIdentifier<"slug">["slug"];
  description: string | TNullish;
  startTime: string | TNullish;
  endTime: string | TNullish;
  status: TEventStatus;
  venue: Pick<TVenue, "id" | "name" | "address"> | TNullish;
  media: TMedia[] | TNullish;
};
export type TGetAChallengeActiveEventsRes = TApiResponse<TActiveEvent[]>;

/**
|--------------------------------------------------
| Get A Challenge Active Events End
|--------------------------------------------------
*/
