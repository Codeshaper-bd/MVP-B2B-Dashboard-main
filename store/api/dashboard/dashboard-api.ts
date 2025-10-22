import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetDashboardRevenueAndPointsArgs,
  TGetDashboardRevenueAndPointsRes,
  TGetDashboardUpcomingEventsArgs,
  TGetDashboardUpcomingEventsRes,
} from "./dashboard.types";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardUpcomingEvents: builder.query<
      TGetDashboardUpcomingEventsRes,
      TGetDashboardUpcomingEventsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/dashboard/upcoming-events${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getDashboardUpcomingEvents"],
    }),

    getDashboardRevenueAndPoints: builder.query<
      TGetDashboardRevenueAndPointsRes,
      TGetDashboardRevenueAndPointsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/dashboard/revenue-and-points${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getDashboardRevenueAndPoints"],
    }),
  }),
});

export const {
  useGetDashboardUpcomingEventsQuery,
  useGetDashboardRevenueAndPointsQuery,
} = dashboardApi;
