import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetSalesReportByAnEventAndBarArgs,
  TGetSalesReportByAnEventAndBarRes,
  TGetSalesReportByAnEventArgs,
  TGetSalesReportByAnEventRes,
  TGetSalesReportByItemListArgs,
  TGetSalesReportByItemListRes,
} from "./sales-report.types";

export const barMenuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReportItemList: builder.query<
      TGetSalesReportByItemListRes,
      TGetSalesReportByItemListArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/sales-report/by-item-list${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getSalesReportByItemList"],
    }),

    getSalesReportByAnEvent: builder.query<
      TGetSalesReportByAnEventRes,
      TGetSalesReportByAnEventArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/sales-report/event/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getSalesReportByAnEvent", slug: arg?.slug },
      ],
    }),
    getSalesReportOverview: builder.query<
      TGetSalesReportByAnEventAndBarRes,
      TGetSalesReportByAnEventAndBarArgs
    >({
      query: ({ barId, slug }) => ({
        url: `/api/v1/sales-report/overview`,
        method: "GET",
        params: {
          eventSlug: slug,
          barId,
        },
      }),
      providesTags: (result, error, arg) => [
        { type: "getSalesReportByAnEvent", slug: arg?.slug },
      ],
    }),
  }),
});

export const {
  useGetSalesReportByAnEventQuery,
  useGetSalesReportItemListQuery,
  useGetSalesReportOverviewQuery,
} = barMenuApi;
