import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateBarArgs,
  TGetABarArgs,
  TGetABarRes,
  TGetAllBarArgs,
  TGetAllBarEmployeeArgs,
  TGetAllBarEmployeeRes,
  TGetAllBarInventoryItemArgs,
  TGetAllBarInventoryItemRes,
  TGetAllBarRes,
  TGetBarRevenueGraphArgs,
  TGetBarRevenueGraphRes,
  TGetTopTenEventsArgs,
  TGetTopTenEventsRes,
  TGetTopTenItemsArgs,
  TGetTopTenItemsRes,
  TUpdateABarArgs,
} from "./bars.types";

export const barApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createABar: builder.mutation<TGetABarRes, TCreateBarArgs>({
      query: (data) => ({
        url: "/api/v1/bars",
        method: "POST",
        body: data,
      }),

      invalidatesTags: () => [
        "getAllBars",
        {
          type: "getAllBars",
        },
      ],
    }),

    getAllBars: builder.query<TGetAllBarRes, TGetAllBarArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/bars${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllBars"],
    }),

    getABar: builder.query<TGetABarRes, TGetABarArgs>({
      query: (args) => ({
        url: `/api/v1/bars/${args?.slug}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getABar", slug: arg?.slug ?? "-1" },
      ],
    }),

    getAllBarEmployee: builder.query<
      TGetAllBarEmployeeRes,
      TGetAllBarEmployeeArgs
    >({
      query: (args) => ({
        url: `/api/v1/bars/bar/employee/${args?.slug}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getABar", slug: arg?.slug ?? "-1" },
      ],
    }),

    getBarRevenueGraph: builder.query<
      TGetBarRevenueGraphRes,
      TGetBarRevenueGraphArgs
    >({
      query: ({ slug, ...queryParams }) => {
        const { queryString } = generateQueryString(queryParams);

        return {
          url: `/api/v1/bars/bar/revenue-graph/${slug}${queryString}`,
          method: "GET",
        };
      },

      providesTags: (result, error, arg) => [
        { type: "getABar", slug: arg?.slug ?? "-1" },
      ],
    }),

    getAllBarInventoryItem: builder.query<
      TGetAllBarInventoryItemRes,
      TGetAllBarInventoryItemArgs
    >({
      query: (args) => ({
        url: `/api/v1/bars/inventory-items/${args?.slug}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getABar", slug: arg?.slug ?? "-1" },
      ],
    }),

    getTopTenEvents: builder.query<TGetTopTenEventsRes, TGetTopTenEventsArgs>({
      query: (args) => ({
        url: `/api/v1/bars/top-ten-events/${args?.slug}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getABar", slug: arg?.slug ?? "-1" },
      ],
    }),

    getTopTenSellingItems: builder.query<
      TGetTopTenItemsRes,
      TGetTopTenItemsArgs
    >({
      query: (args) => ({
        url: `/api/v1/bars/top-ten-selling-items/${args?.slug}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getABar", slug: arg?.slug ?? "-1" },
      ],
    }),

    updateABar: builder.mutation<TGetABarRes, TUpdateABarArgs>({
      query: ({ slug, body }) => ({
        url: `/api/v1/bars/${slug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getABar",
        { type: "getABar", slug: arg?.slug ?? "-1" },
        "getAllBars", // Invalidate the bar list as well
      ],
    }),

    deleteBar: builder.mutation<
      { success: boolean; slug: string | undefined },
      string
    >({
      query: (slug) => ({
        url: `/api/v1/bars/${slug}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllBars",
        { type: "getABar", slug: arg ?? "-1" },
      ],
    }),
  }),
});

export const {
  useCreateABarMutation,
  useGetAllBarsQuery,
  useGetABarQuery,
  useUpdateABarMutation,
  useDeleteBarMutation,
  useGetBarRevenueGraphQuery,
  useGetAllBarEmployeeQuery,
  useGetAllBarInventoryItemQuery,
  useGetTopTenEventsQuery,
  useGetTopTenSellingItemsQuery,
} = barApi;
