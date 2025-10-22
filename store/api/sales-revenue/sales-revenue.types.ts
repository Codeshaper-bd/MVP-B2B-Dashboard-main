import type {
  TNullish,
  TApiResponse,
  TPaginationArgs,
  TTimeRange,
} from "@/store/api/common-api-types";

import type { TMedia } from "../media/media.types";

// chart categories

export type TChart = {
  categories: string[] | TNullish;
  series: number[] | TNullish;
};

export type TSalesRevenueCommonArgs = {
  startDate?: string;
  endDate?: string;
  eventIds?: string;
};
export type TSalesRevenueSortBy = {
  name?: string;
  date?: string;
  createdAt?: string;
};
export type TSalesRevenueItem = {
  value: number | TNullish;
  percentage: number | TNullish;
  increased: boolean | TNullish;
};
export type TSalesRevenueChart = {
  category: string[];
  series: number[];
};
export type TSalesRevenue = {
  totalRevenue: TSalesRevenueItem;
  barRevenue: TSalesRevenueItem;
  ticketRevenue: TSalesRevenueItem;
  revenueGraph?: TSalesRevenueChart | TNullish;
  barRevenueGraph?: TSalesRevenueChart | TNullish;
  ticketRevenueGraph?: TSalesRevenueChart | TNullish;
};
export type TEventRevenue = {
  id: number | TNullish;
  name: string | TNullish;
  startTime: string | TNullish;
  endTime: string | TNullish;
  revenue: number | TNullish;
  media?: TMedia | TNullish;
};
/**
 |--------------------------------------------------
 | Get Total Sales Revenue Start
 |--------------------------------------------------
 */

export type TGetTotalSalesRevenueArgs = TSalesRevenueCommonArgs;

export type TGetTotalSalesRevenueRes = TApiResponse<TSalesRevenue>;

/**
|--------------------------------------------------
| Get Total Sales Revenue  End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get  Latest Revenue   Start
|--------------------------------------------------
*/

export type TGetLatestRevenueArgs = TPaginationArgs<
  {
    sortBy: TSalesRevenueSortBy;
  } & TSalesRevenueCommonArgs
>;
export type TGetLatestRevenueRes = TApiResponse<TEventRevenue[]>;

/**
|--------------------------------------------------
|  Get  Latest Revenue   End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get   Revenue Overview Graph Data Start
|--------------------------------------------------
*/
export type TCompletedRevenueOverview = {
  totalRevenue: number | TNullish;
  barRevenue: number | TNullish;
  ticketRevenue: number | TNullish;
};
export type TGetSalesRevenueOverviewGraphData = TCompletedRevenueOverview;
export type TGetSalesRevenueOverviewGraphDataArgs = TSalesRevenueCommonArgs;
export type TGetRevenueOverviewGraphDataRes =
  TApiResponse<TGetSalesRevenueOverviewGraphData>;

/**
|--------------------------------------------------
|  Get   Revenue Overview Graph Data End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Get  Sales Revenue Chart Start
|--------------------------------------------------
*/
export enum ESalesRevenueType {
  TicketRevenue = "TicketRevenue",
  BarRevenue = "BarRevenue",
}
export type TSalesRevenueType = `${ESalesRevenueType}`;
export type TGetSalesRevenueChart = TChart;
export type TGetSalesRevenueChartArgs = {
  range?: TTimeRange;
  startTime?: string;
  endTime?: string;
  type?: TSalesRevenueType;
};
export type TGetSalesRevenueChartRes = TApiResponse<TGetSalesRevenueChart>;

/**
|--------------------------------------------------
|  Get  Sales Revenue Chart End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
|  Get  Sales Revenue bar start
|--------------------------------------------------
*/

export type TGetBarRevenueGraphArgs = {
  filterType?: TTimeRange;
  startDate?: string;
  endDate?: string;
  eventId?: string | number;
};

export type TGetBarRevenueGraphRes = TApiResponse<TChart>;
