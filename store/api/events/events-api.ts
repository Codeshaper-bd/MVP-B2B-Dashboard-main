import { getFileUrl } from "@/lib/media/file-to-url";
import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCancelEventArgs,
  TCancelEventRes,
  TCreateAnEventArgs,
  TCreateAnEventRes,
  TDeleteAnEventArgs,
  TDeleteAnEventRes,
  TGetAllEventArgs,
  TGetAllEventRes,
  TGetAnEventArgs,
  TGetAnEventPayoutArgs,
  TGetAnEventPayoutRes,
  TGetAnEventRes,
  TGetAnEventRevenueArgs,
  TGetAnEventRevenueRes,
  TGetCheckInSummeryArgs,
  TGetCheckInSummeryRes,
  TGetEventHourlyRevenueArgs,
  TGetEventHourlyRevenueRes,
  TGuestListArgs,
  TGuestListRes,
  TUpdateAnEventArgs,
  TUpdateAnEventRelationArgs,
  TUpdateAnEventRelationRes,
  TUpdateAnEventRes,
} from "./events.types";

export const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAnEvent: builder.mutation<TCreateAnEventRes, TCreateAnEventArgs>({
      query: (data) => ({
        url: "/api/v1/events",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllEvent"],
    }),

    getAllEvent: builder.query<TGetAllEventRes, TGetAllEventArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/events${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllEvent"],
    }),

    getAnEvent: builder.query<TGetAnEventRes, TGetAnEventArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/events/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAnEvent", id: arg?.slug ?? "-1" },
      ],
    }),

    updateAnEvent: builder.mutation<TUpdateAnEventRes, TUpdateAnEventArgs>({
      query: ({ slug, body }) => ({
        url: `/api/v1/events/${slug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllEvent",
        "getFennecLiveB2B",
        "getAllTicketTier",
        { type: "getAnEvent", id: arg?.slug ?? "-1" },
      ],
    }),
    cancelEvent: builder.mutation<TCancelEventRes, TCancelEventArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/events/${slug}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllEvent",
        { type: "getAnEvent", id: arg?.slug ?? "-1" },
      ],
    }),

    updateAnEventRelation: builder.mutation<
      TUpdateAnEventRelationRes,
      TUpdateAnEventRelationArgs
    >({
      query: ({ slug, body }) => ({
        url: `/api/v1/events/${slug}/relations`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllEvent",
        { type: "getAnEvent", id: arg?.slug ?? "-1" },
      ],
    }),

    deleteAnEvent: builder.mutation<TDeleteAnEventRes, TDeleteAnEventArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/events/${slug}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllEvent",
        { type: "getAnEvent", id: arg?.slug ?? "-1" },
      ],
    }),
    getAnEventHourlyRevenue: builder.query<
      TGetEventHourlyRevenueRes,
      TGetEventHourlyRevenueArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/events/event-hourly-revenue/${slug}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getEventHourlyRevenue"],
    }),
    getGuestList: builder.query<TGuestListRes, TGuestListArgs>({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/events/common/guest-list-check-in/${slug}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getGuestList"],
    }),
    getCheckInSummery: builder.query<
      TGetCheckInSummeryRes,
      TGetCheckInSummeryArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/events/common/checkin-summary/${slug}`,
        method: "GET",
      }),
      providesTags: ["getCheckInSummery"],
    }),
    getAnEventRevenue: builder.query<
      TGetAnEventRevenueRes,
      TGetAnEventRevenueArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/events/common/revenue-graph/${slug}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAnEventRevenue"],
    }),
    downloadGuestListFile: builder.query<string, string>({
      query: (eventSlug) => ({
        url: `/api/v1/events/${eventSlug}/guest-list`,
        method: "GET",
        responseHandler: async (response) => {
          const blob = await response.blob();
          const { url } = getFileUrl({ file: blob });
          return url;
        },
      }),
    }),
    getAnEventPayout: builder.query<
      TGetAnEventPayoutRes,
      TGetAnEventPayoutArgs
    >({
      query: ({ ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/events/payouts${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAnEventPayout"],
    }),
  }),
});

export const {
  useCreateAnEventMutation,
  useGetAllEventQuery,
  useLazyGetAllEventQuery,
  useGetAnEventQuery,
  useUpdateAnEventMutation,
  useUpdateAnEventRelationMutation,
  useDeleteAnEventMutation,
  useGetAnEventHourlyRevenueQuery,
  useGetGuestListQuery,
  useGetCheckInSummeryQuery,
  useCancelEventMutation,
  useGetAnEventRevenueQuery,
  useLazyDownloadGuestListFileQuery,
  useGetAnEventPayoutQuery,
} = eventsApi;
