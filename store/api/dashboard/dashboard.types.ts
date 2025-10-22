import type {
  TIdOrSlugOrIdentifier,
  TNullish,
  TApiResponse,
  TPaginationArgs,
} from "@/store/api/common-api-types";

import type { TMedia } from "../media/media.types";

export enum ETimeRange {
  TwelveHours = "12h",
  TwentyFourHours = "24h",
  SevenDays = "7d",
  ThirtyDays = "30d",
  SixMonths = "6m",
  OneYear = "1y",
  All = "all",
}
export type TTimeRange = `${ETimeRange}`;
/**
 |--------------------------------------------------
 | Get Dashboard Upcoming Events Start
 |--------------------------------------------------
 */

export type TEventSummary = {
  id: TIdOrSlugOrIdentifier<"id">["id"];
  name: string | TNullish;
  description: string | TNullish;
  startTime: string | TNullish;
  endTime: string | TNullish;
  address: string | TNullish;
  price: number | TNullish;
  media: TMedia | TNullish;
  slug: string | TNullish;
};
export type TGetDashboardUpcomingEventsArgs = TPaginationArgs<{
  startDate?: string;
  endDate?: string;
  specificDate?: string;
}>;
export type TGetDashboardUpcomingEventsRes = TApiResponse<TEventSummary[]>;

/**
|--------------------------------------------------
| Get Dashboard Upcoming Events End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get  Revenue and  Points Start
|--------------------------------------------------
*/
export type TRevenueOverTime = {
  name: string | TNullish;
  category: string[] | TNullish;
  series: number[] | TNullish;
};
export type TGetDashboardRevenueAndPoints = {
  salesRevenue: string | TNullish;
  pointsGiven: number | TNullish;
  revenueChangePercent: number | TNullish;
  isRevenueIncreased: boolean;
  revenueOverTime: TRevenueOverTime | TNullish;
};
export type TGetDashboardRevenueAndPointsArgs = {
  range: TTimeRange;
};
export type TGetDashboardRevenueAndPointsRes =
  TApiResponse<TGetDashboardRevenueAndPoints>;

/**
|--------------------------------------------------
| Get  Revenue and End Points End
|--------------------------------------------------
*/
