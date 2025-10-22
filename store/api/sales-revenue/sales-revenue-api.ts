import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetLatestRevenueArgs,
  TGetLatestRevenueRes,
  TGetRevenueOverviewGraphDataRes,
  TGetSalesRevenueChartArgs,
  TGetSalesRevenueChartRes,
  TGetBarRevenueGraphArgs,
  TGetBarRevenueGraphRes,
  TGetSalesRevenueOverviewGraphDataArgs,
  TGetTotalSalesRevenueArgs,
  TGetTotalSalesRevenueRes,
} from "./sales-revenue.types";

export const barMenuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalSalesRevenue: builder.query<
      TGetTotalSalesRevenueRes,
      TGetTotalSalesRevenueArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/sales-revenue${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllSalesRevenue"],
    }),
    getLatestRevenue: builder.query<
      TGetLatestRevenueRes,
      TGetLatestRevenueArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/sales-revenue/latest-event-revenue${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getLatestRevenue"],
    }),
    getSalesRevenueOverviewGraph: builder.query<
      TGetRevenueOverviewGraphDataRes,
      TGetSalesRevenueOverviewGraphDataArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/sales-revenue/revenue-overview-graph-data${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getSalesRevenueOverviewGraph"],
    }),
    getSalesRevenueChart: builder.query<
      TGetSalesRevenueChartRes,
      TGetSalesRevenueChartArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/sales-revenue/chart${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getSalesRevenueChart"],
    }),
    getSalesRevenueBarGraph: builder.query<
      TGetBarRevenueGraphRes,
      TGetBarRevenueGraphArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/sales-revenue/bar-revenue-graph${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getSalesRevenueBarGraph"],
    }),
  }),
});

export const {
  useGetTotalSalesRevenueQuery,
  useGetLatestRevenueQuery,
  useGetSalesRevenueOverviewGraphQuery,
  useGetSalesRevenueChartQuery,
  useGetSalesRevenueBarGraphQuery,
} = barMenuApi;
