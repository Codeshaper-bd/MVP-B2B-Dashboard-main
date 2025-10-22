import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetFennecLiveB2BArgs,
  TGetFennecLiveB2BChallengesArgs,
  TGetFennecLiveB2BChallengesRes,
  TGetFennecLiveB2BGuestListArgs,
  TGetFennecLiveB2BGuestListRes,
  TGetFennecLiveB2BPromotionsArgs,
  TGetFennecLiveB2BPromotionsRes,
  TGetFennecLiveB2BRes,
  TGetFennecLiveBarRevenueOverTimeArgs,
  TGetFennecLiveBarRevenueOverTimeRes,
  TGetFennecLiveBarStatisticsArgs,
  TGetFennecLiveBarStatisticsRes,
  TGetFennecLiveGuestlistDetailsArgs,
  TGetFennecLiveGuestlistDetailsRes,
  TGetFennecLiveNonGuestlistArgs,
  TGetFennecLiveNonGuestlistDetailsArgs,
  TGetFennecLiveNonGuestlistDetailsRes,
  TGetFennecLiveNonGuestlistRes,
  TGetFennecLiveRevenueOverTimeArgs,
  TGetFennecLiveRevenueOverTimeRes,
  TGetFennecLiveRevenueOverviewArgs,
  TGetFennecLiveRevenueOverviewRes,
  TGetFennecLiveTotalGuestlistArgs,
  TGetFennecLiveTotalGuestlistRes,
  TUpdateAFennecLiveB2BChallengesArgs,
  TUpdateAFennecLiveB2BChallengesRes,
  TUpdateFennecLiveB2BPromotionsArgs,
  TUpdateFennecLiveB2BPromotionsRes,
} from "./fennec-live.types";

export const fennecLiveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /*
     * Get live event for today for  a specific organization
     */
    getFennecLiveB2B: builder.query<
      TGetFennecLiveB2BRes,
      TGetFennecLiveB2BArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveB2B"],
    }),
    /*
     * fennec live b2b challenges
     * Get Fennec Live B2B Challenges
     */
    getFennecLiveB2BChallenges: builder.query<
      TGetFennecLiveB2BChallengesRes,
      TGetFennecLiveB2BChallengesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/fennec-live/b2b/challenges${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getFennecLiveB2BChallenges"],
    }),
    /*
     * fennec live b2b challenges
     * update Fennec Live B2B Challenges
     */
    updateAFennecLiveB2BChallenges: builder.mutation<
      TUpdateAFennecLiveB2BChallengesRes,
      TUpdateAFennecLiveB2BChallengesArgs
    >({
      query: ({ body }) => ({
        url: `/api/v1/fennec-live/b2b/challenges`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "getFennecLiveB2BChallenges",
        { type: "getFennecLiveB2BChallenges" },
      ],
    }),
    /*
     * Get Fennec Live B2B Guest List
     */
    getFennecLiveB2BGuestListArgs: builder.query<
      TGetFennecLiveB2BGuestListRes,
      TGetFennecLiveB2BGuestListArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b/guestlist`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveB2BGuestList"],
    }),

    /*
     * fennec live b2b Promotions
     * Get Fennec Live B2B Promotions
     */
    getFennecLiveB2BPromotions: builder.query<
      TGetFennecLiveB2BPromotionsRes,
      TGetFennecLiveB2BPromotionsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/fennec-live/b2b/promotions${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getFennecLiveB2BPromotions"],
    }),
    /*
     * fennec live b2b Promotions
     * update Fennec Live B2B Promotions
     */
    updateAFennecLiveB2BPromotions: builder.mutation<
      TUpdateFennecLiveB2BPromotionsRes,
      TUpdateFennecLiveB2BPromotionsArgs
    >({
      query: ({ body }) => ({
        url: `/api/v1/fennec-live/b2b/promotions`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "getFennecLiveB2BPromotions",
        { type: "getFennecLiveB2BPromotions" },
      ],
    }),

    /*
     * Get Fennec Live Bar Statistics
     */
    getFennecLiveBarStatistics: builder.query<
      TGetFennecLiveBarStatisticsRes,
      TGetFennecLiveBarStatisticsArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b/webapp/bar-statistics`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveBarStatistics"],
    }),

    /*
     * Get Fennec Live Revenue Overview
     */
    getFennecLiveRevenueOverview: builder.query<
      TGetFennecLiveRevenueOverviewRes,
      TGetFennecLiveRevenueOverviewArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b/revenue-overview`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveRevenueOverview"],
    }),
    /*
     * Get Fennec Live Revenue Over Time
     */
    getFennecLiveRevenueOverTime: builder.query<
      TGetFennecLiveRevenueOverTimeRes,
      TGetFennecLiveRevenueOverTimeArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b/revenue-over-time`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveRevenueOverTime"],
    }),
    /*
     * Get Fennec Live Revenue Over Time
     */
    getFennecLiveBarRevenueOverTime: builder.query<
      TGetFennecLiveBarRevenueOverTimeRes,
      TGetFennecLiveBarRevenueOverTimeArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b/bar-revenue-over-time`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveBarRevenueOverTime"],
    }),
    /*
     * get check in stat total guestlist
     */
    getFennecLiveTotalGuestlist: builder.query<
      TGetFennecLiveTotalGuestlistRes,
      TGetFennecLiveTotalGuestlistArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b/checkin/total-guestlist`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveTotalGuestlist"],
    }),
    /*
     * get check in stat non guestlist
     */
    getFennecLiveNonGuestlist: builder.query<
      TGetFennecLiveNonGuestlistRes,
      TGetFennecLiveNonGuestlistArgs
    >({
      query: () => ({
        url: `/api/v1/fennec-live/b2b/checkin/non-guestlist`,
        method: "GET",
      }),

      providesTags: ["getFennecLiveNonGuestlist"],
    }),
    /*
     * get  guestlist details
     */
    getFennecLiveGuestlistDetails: builder.query<
      TGetFennecLiveGuestlistDetailsRes,
      TGetFennecLiveGuestlistDetailsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/fennec-live/b2b/guestlist-details${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getFennecLiveGuestlistDetails"],
    }),
    /*
     * get non guestlist details
     */
    getFennecLiveNonGuestlistDetails: builder.query<
      TGetFennecLiveNonGuestlistDetailsRes,
      TGetFennecLiveNonGuestlistDetailsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/fennec-live/b2b/non-guestlist-details${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getFennecLiveNonGuestlistDetails"],
    }),
  }),
});

export const {
  useGetFennecLiveB2BQuery,
  useGetFennecLiveB2BChallengesQuery,
  useUpdateAFennecLiveB2BChallengesMutation,
  useGetFennecLiveB2BGuestListArgsQuery,
  useGetFennecLiveB2BPromotionsQuery,
  useUpdateAFennecLiveB2BPromotionsMutation,
  useGetFennecLiveBarStatisticsQuery,
  useGetFennecLiveRevenueOverviewQuery,
  useGetFennecLiveRevenueOverTimeQuery,
  useGetFennecLiveBarRevenueOverTimeQuery,
  useGetFennecLiveTotalGuestlistQuery,
  useGetFennecLiveNonGuestlistQuery,
  useGetFennecLiveGuestlistDetailsQuery,
  useGetFennecLiveNonGuestlistDetailsQuery,
} = fennecLiveApi;
