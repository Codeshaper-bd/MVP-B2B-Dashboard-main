import type {
  TIdOrSlugOrIdentifier,
  TNullish,
  TApiResponse,
  TPaginationArgs,
} from "@/store/api/common-api-types";

/**
 |--------------------------------------------------
 | Sales Report Item List Start
 |--------------------------------------------------
 */

export type TSalesReportByItemList = {
  id: number | TNullish;
  rank: number | TNullish;
  name: string | TNullish;
  barPrice: number | TNullish;
  retailCost: number | TNullish;
  unitsSold: number | TNullish;
  lostRevenue: number | TNullish;
  wastage: number | TNullish;
  totalRevenue: number | TNullish;
};

export type TGetSalesReportByItemListArgs =
  TPaginationArgs<TSalesReportByItemList>;

export type TGetSalesReportByItemListRes = TApiResponse<
  TSalesReportByItemList[]
>;

/**
|--------------------------------------------------
| Sales Report Item List  End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Sales Report By An Event Start
|--------------------------------------------------
*/

export type TSalesReportStats = {
  totalRevenue: number | TNullish;
  averageCustomerSpend: number | TNullish;
  totalCustomers: number | TNullish;
  lostRevenue: number | TNullish;
  wastageRevenue: number | TNullish;
};

export type TGetSalesReportByAnEventArgs = TIdOrSlugOrIdentifier<"slug">;
export type TGetSalesReportByAnEventRes = TApiResponse<TSalesReportStats>;

/**
|--------------------------------------------------
| Get Sales Report By An Event End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Sales Report By An Event & Bar Start
|--------------------------------------------------
*/

export type TGraphData = {
  name: string;
  series: number[];
  categories: string[];
};

export type TSalesReportOverview = {
  currentSales: number;
  percentageChange: number;
  getterThenLastWeek: boolean;
  graphData: TGraphData;
};

export type TGetSalesReportByAnEventAndBarArgs =
  TIdOrSlugOrIdentifier<"slug"> & {
    barId: TIdOrSlugOrIdentifier<"id">["id"];
  };
export type TGetSalesReportByAnEventAndBarRes =
  TApiResponse<TSalesReportOverview>;
/**
|--------------------------------------------------
| Get Sales Report By An Event & Bar End
|--------------------------------------------------
*/
