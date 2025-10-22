import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetPastEventBarArgs,
  TGetPastEventBarRes,
  TGetPastEventChallengesArgs,
  TGetPastEventChallengesRes,
  TGetPastEventGuestListCheckInArgs,
  TGetPastEventGuestListCheckInRes,
  TGetPastEventGuestListOverviewArgs,
  TGetPastEventGuestListOverviewRes,
  TGetPastEventOrderArgs,
  TGetPastEventOrderRes,
  TGetPastEventPromotionArgs,
  TGetPastEventPromotionRes,
  TGetPastEventTransactionArgs,
  TGetPastEventTransactionRes,
  TGetRevenueOverviewArgs,
  TGetRevenueOverviewRes,
} from "./past-event.types";

export const pastEventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPastEventBar: builder.query<TGetPastEventBarRes, TGetPastEventBarArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/past-events/bar/${slug}`,
        method: "GET",
      }),

      providesTags: ["getPastEventBar"],
    }),
    getPastEventGuestListCheckIn: builder.query<
      TGetPastEventGuestListCheckInRes,
      TGetPastEventGuestListCheckInArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString({ ...args });
        return {
          url: `/api/v1/past-events/guest-list-check-in/${slug}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getPastEventGuestListCheckIn"],
    }),
    getPastEventGuestListOverview: builder.query<
      TGetPastEventGuestListOverviewRes,
      TGetPastEventGuestListOverviewArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/past-events/guest-list/overview/${slug}`,
        method: "GET",
      }),

      providesTags: ["getPastEventGuestListOverview"],
    }),
    // get orders
    getPastEventOrder: builder.query<
      TGetPastEventOrderRes,
      TGetPastEventOrderArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString({ ...args });
        return {
          url: `/api/v1/past-events/orders/${slug}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getPastEventOrders"],
    }),
    getPastEventChallenges: builder.query<
      TGetPastEventChallengesRes,
      TGetPastEventChallengesArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString({ ...args });
        return {
          url: `/api/v1/past-events/overview/challenge/${slug}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getPastEventChallenges"],
    }),
    getPastEventPromotions: builder.query<
      TGetPastEventPromotionRes,
      TGetPastEventPromotionArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString({ ...args });
        return {
          url: `/api/v1/past-events/overview/promotion/${slug}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getPastEventPromotions"],
    }),
    getPastEventRevenueOverview: builder.query<
      TGetRevenueOverviewRes,
      TGetRevenueOverviewArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/past-events/overview/revenue/${slug}`,
        method: "GET",
      }),

      providesTags: ["getPastEventRevenueOverview"],
    }),
    getPastEventTransactions: builder.query<
      TGetPastEventTransactionRes,
      TGetPastEventTransactionArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString({ ...args });
        return {
          url: `/api/v1/past-events/transactions/${slug}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getPastEventTransactions"],
    }),
  }),
});

export const {
  useGetPastEventBarQuery,
  useGetPastEventGuestListCheckInQuery,
  useGetPastEventGuestListOverviewQuery,
  useGetPastEventRevenueOverviewQuery,
  useGetPastEventOrderQuery,
  useGetPastEventChallengesQuery,
  useGetPastEventPromotionsQuery,
  useGetPastEventTransactionsQuery,
} = pastEventApi;
