import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
} from "../common-api-types";

/**
|--------------------------------------------------
| Create Loyalty Program Start
|--------------------------------------------------
*/

export enum ERewardType {
  DOLLAR = "DOLLAR",
  PROMOTION = "PROMOTION",
}

export type TRewardType = `${ERewardType}`;

export enum ERedemptionType {
  CONTINUOUS = "CONTINUOUS",
  THRESHOLD = "THRESHOLD",
}

export type TRedemptionType = `${ERedemptionType}`;

export enum EStreakType {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export type TStreakType = `${EStreakType}`;

export type TRedemptionThresholdArgs = {
  points: number;
  dollarValue: number;
};
export type TRedemptionThresholdRes = {
  id: number;
  programId: number;
  points: number;
  dollarValue: number;
};
export type TCreateLoyaltyProgramArgs = {
  enabled: boolean;
  pointsPerSpent: number;
  rewardType: TRewardType;
  rewardValue: number;
  redemptionType: TRedemptionType;
  emailNotificationEnabled: boolean;
  notificationPoint?: number;
  streakType: TStreakType;
  streakValue?: number;
  streakReward?: number;
  redemptionThresholds?: TRedemptionThresholdArgs[];
};

export type TLoyaltyProgram = Omit<
  TCreateLoyaltyProgramArgs,
  "redemptionThresholds"
> & {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  organizationId: number;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
  RedemptionThreshold?: TRedemptionThresholdRes[];
};

export type TCreateLoyaltyProgramRes = TApiResponse<TLoyaltyProgram>;

/**
|--------------------------------------------------
| Create Loyalty Program End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Loyalty Program Start
|--------------------------------------------------
*/
export type TGetLoyaltyProgramArgs = void;

export type TGetLoyaltyProgramRes = TApiResponse<TLoyaltyProgram>;
/**
|--------------------------------------------------
| Get Loyalty Program End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Add Customer Loyalty Program Points Start
|--------------------------------------------------
*/
export type TAddLoyaltyProgramPointsArgs = {
  userId: TIdOrSlugOrIdentifier<"id">["id"];
  points: number;
};
export type TCustomerLoyaltyProgramPoints = TAddLoyaltyProgramPointsArgs & {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  organizationId: TIdOrSlugOrIdentifier<"id">["id"];
  availablePoints: number;
  createdAt: string | TNullish;
  updatedAt: string | TNullish;
};
export type TAddLoyaltyProgramPointsRes = TApiResponse<TLoyaltyProgram>;
/**
|--------------------------------------------------
| Add Customer Loyalty Program Points End
|--------------------------------------------------
*/
