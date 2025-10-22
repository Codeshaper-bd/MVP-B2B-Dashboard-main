import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TAssignPromoterToEventArgs,
  TAssignPromoterToEventRes,
  TCheckPromoterStatusArgs,
  TCheckPromoterStatusRes,
  TCreatePromoterArgs,
  TCreatePromoterRes,
  TDeletePromoterArgs,
  TDeletePromoterRes,
  TGetAllAvailablePromotersArgs,
  TGetAllAvailablePromotersRes,
  TGetAllPromotersArgs,
  TGetAllPromotersRes,
  TGetAllUnassignedPromotersArgs,
  TGetAllUnassignedPromotersRes,
  TGetAnPromotersArgs,
  TGetAnPromotersRes,
  TGetAPromoterDetailsArgs,
  TGetAPromoterDetailsRes,
  TGetPromoterRevenueArgs,
  TGetPromoterRevenueRes,
  TGetPromotersAdminTicketSoldListArgs,
  TGetPromotersAdminTicketSoldListRes,
  TGetPromotersTrackingLinkArgs,
  TGetPromotersTrackingLinkRes,
  TGetPromoterTicketSoldArgs,
  TGetPromoterTicketSoldRes,
  TGetPromoterTicketSoldRevenueArgs,
  TGetPromoterTicketSoldRevenueRes,
  TRemovePromoterFromEventArgs,
  TRemovePromoterFromEventRes,
  TUpdateAPromoterAssignmentsArgs,
  TUpdateAPromoterAssignmentsRes,
} from "./promoters.types";

export const promotersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPromoter: builder.mutation<TCreatePromoterRes, TCreatePromoterArgs>({
      query: (data) => ({
        url: `/api/v1/promoters/add-or-invite`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error) => {
        if (result?.success) {
          return [
            "getAllPromoters",
            "getAllUnassignedPromoters",
            "getAnPromoterEvents",
          ];
        }
        return [];
      },
    }),
    getAllPromoters: builder.query<TGetAllPromotersRes, TGetAllPromotersArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllPromoters"],
    }),
    getAnPromoterEvents: builder.query<TGetAnPromotersRes, TGetAnPromotersArgs>(
      {
        query: ({ promoterId, ...args }) => {
          const { queryString } = generateQueryString(args);
          return {
            url: `/api/v1/promoters/${promoterId}/events${queryString}`,
            method: "GET",
          };
        },
        providesTags: ["getAnPromoterEvents"],
      },
    ),
    getAllAvailablePromoters: builder.query<
      TGetAllAvailablePromotersRes,
      TGetAllAvailablePromotersArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/available-promoters${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllAvailablePromoters"],
    }),
    getAllUnassignedPromoters: builder.query<
      TGetAllUnassignedPromotersRes,
      TGetAllUnassignedPromotersArgs
    >({
      query: ({ ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/unassigned-upcoming-events${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllUnassignedPromoters"],
    }),
    getPromoterRevenue: builder.query<
      TGetPromoterRevenueRes,
      TGetPromoterRevenueArgs
    >({
      query: ({ id, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/revenue/${id}${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        { type: "getPromoterRevenue", id: arg?.id ?? "-1" },
      ],
    }),

    // unassign event from promoter
    deletePromoterFromEvent: builder.mutation<
      TRemovePromoterFromEventRes,
      TRemovePromoterFromEventArgs
    >({
      query: ({ eventId, promoterId }) => ({
        url: `/api/v1/promoters/${promoterId}/events/${eventId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return [
            "getAllUnassignedPromoters",
            "getAnPromoterEvents",
            "getAllPromoters",
            "getAPromoterDetails",
            { type: "getAPromoterDetails", id: arg?.promoterId ?? "-1" },
            {
              type: "getAllUnassignedPromoters",
              eventId: arg?.eventId ?? "-1",
            },
            {
              type: "getAnPromoterEvents",
              promoterId: arg?.promoterId ?? "-1",
            },
          ];
        }
        return [];
      },
    }),
    deletePromoter: builder.mutation<TDeletePromoterRes, TDeletePromoterArgs>({
      query: ({ id }) => ({
        url: `/api/v1/promoters/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return [
            "getAllPromoters",
            "getAllUnassignedPromoters",
            "getAnPromoterEvents",
            "getAPromoterDetails",
          ];
        }
        return [];
      },
    }),
    assignPromoterToEvent: builder.mutation<
      TAssignPromoterToEventRes,
      TAssignPromoterToEventArgs
    >({
      query: (data) => ({
        url: `/api/v1/promoters/assign-events`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return [
            "getAnPromoterEvents",
            "getAllUnassignedPromoters",
            "getAllPromoters",
            "getAPromoterDetails",
            { type: "getAPromoterDetails", id: arg?.userId ?? "-1" },
          ];
        }
        return [];
      },
    }),
    checkPromoterStatus: builder.query<
      TCheckPromoterStatusRes,
      TCheckPromoterStatusArgs
    >({
      query: ({ phone }) => ({
        url: `/api/v1/promoters/check-status/${phone}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [],
    }),
    getAPromoterDetails: builder.query<
      TGetAPromoterDetailsRes,
      TGetAPromoterDetailsArgs
    >({
      query: ({ userId }) => ({
        url: `/api/v1/promoters/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAPromoterDetails", id: arg?.userId ?? "-1" },
      ],
    }),
    updateAPromoterAssignments: builder.mutation<
      TUpdateAPromoterAssignmentsRes,
      TUpdateAPromoterAssignmentsArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/promoters/update-assignment/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return [
            "getAnPromoterEvents",
            "getAllUnassignedPromoters",
            "getAllPromoters",
            "getAPromoterDetails",
            { type: "getAPromoterDetails", id: arg?.id ?? "-1" },
          ];
        }
        return [];
      },
    }),

    getAPromoterTicketSold: builder.query<
      TGetPromoterTicketSoldRes,
      TGetPromoterTicketSoldArgs
    >({
      query: ({ eventId, promoterId, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/tickets-sold/promoter/${promoterId}/event/${eventId}${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        {
          type: "getAPromoterTicketSold",
          userId: arg?.promoterId ?? "-1",
          eventId: arg?.eventId ?? "-1",
        },
      ],
    }),
    getAPromoterTicketSoldRevenue: builder.query<
      TGetPromoterTicketSoldRevenueRes,
      TGetPromoterTicketSoldRevenueArgs
    >({
      query: ({ promoterId, eventSlug, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/tickets-sold/promoter/${promoterId}/event/${eventSlug}/revenue${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        {
          type: "getAPromoterTicketSoldRevenue",
          userId: arg?.promoterId ?? "-1",
          eventId: arg?.eventSlug ?? "",
        },
      ],
    }),
    getPromotersTrackingLink: builder.query<
      TGetPromotersTrackingLinkRes,
      TGetPromotersTrackingLinkArgs
    >({
      query: ({ ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `api/v1/promoters/shareable-promoter-link${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => ["getPromotersTrackingLink"],
    }),
    getPromotersAdminTicketSoldList: builder.query<
      TGetPromotersAdminTicketSoldListRes,
      TGetPromotersAdminTicketSoldListArgs
    >({
      query: ({ promoterId, eventId, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `api/v1/promoters/tickets-sold/list/promoter/${promoterId}/event/${eventId}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getPromotersTicketSoldList"],
    }),
  }),
});

export const {
  useCreatePromoterMutation,
  useGetAllPromotersQuery,
  useLazyGetAllPromotersQuery,
  useGetAnPromoterEventsQuery,
  useGetAllAvailablePromotersQuery,
  useLazyGetAllAvailablePromotersQuery,
  useGetAllUnassignedPromotersQuery,
  useLazyGetAllUnassignedPromotersQuery,
  useDeletePromoterFromEventMutation,
  useGetPromoterRevenueQuery,
  useDeletePromoterMutation,
  useAssignPromoterToEventMutation,
  useCheckPromoterStatusQuery,
  useLazyCheckPromoterStatusQuery,
  useGetAPromoterDetailsQuery,
  useUpdateAPromoterAssignmentsMutation,
  useGetAPromoterTicketSoldQuery,
  useGetAPromoterTicketSoldRevenueQuery,
  useGetPromotersTrackingLinkQuery,
  useGetPromotersAdminTicketSoldListQuery,
} = promotersApi;
