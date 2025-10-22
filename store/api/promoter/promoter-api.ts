/**
 * Promoter Portal API
 */

import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetAllAssignedEventsArgs,
  TGetAllAssignedEventsRes,
  TGetAllEventsInOrganizationArgs,
  TGetAllEventsInOrganizationRes,
  TGetAllPromotersInOrganizationArgs,
  TGetAllPromotersInOrganizationRes,
  TGetAPromoterEventDetailsArgs,
  TGetAPromoterEventDetailsRes,
  TGetPromoterPermissionsArgs,
  TGetPromoterPermissionsRes,
  TGetPromoterStatusArgs,
  TGetPromoterStatusRes,
  TGetPromotersTicketSoldListArgs,
  TGetPromotersTicketSoldListRes,
  TGetPromoterTicketSoldArgs,
  TGetPromoterTicketSoldRes,
  TGetPromoterTicketSoldRevenueArgs,
  TGetPromoterTicketSoldRevenueRes,
  TGetPromoterTicketTierArgs,
  TGetPromoterTicketTierRes,
} from "./promoter.types";

export const PromoterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromotersInOrganization: builder.query<
      TGetAllPromotersInOrganizationRes,
      TGetAllPromotersInOrganizationArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/promoter-organizations${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllPromotersInOrganization"],
    }),
    getAllEventsInOrganization: builder.query<
      TGetAllEventsInOrganizationRes,
      TGetAllEventsInOrganizationArgs
    >({
      query: ({ organizationSlug, ...restArgs }) => {
        const { queryString } = generateQueryString(restArgs);
        return {
          url: `/api/v1/promoters/organization/${organizationSlug}/events${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllEventsInOrganization"],
    }),

    getAllAssignedEvents: builder.query<
      TGetAllAssignedEventsRes,
      TGetAllAssignedEventsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/events-assigned${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllAssignedEvents"],
    }),

    getPromoterTicketTiers: builder.query<
      TGetPromoterTicketTierRes,
      TGetPromoterTicketTierArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/promoters/event/${slug}/ticket-tiers`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => ["getPromoterTicketTiers"],
    }),

    getAPromoterEventDetails: builder.query<
      TGetAPromoterEventDetailsRes,
      TGetAPromoterEventDetailsArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/promoters/event-details/${slug}`,
        method: "GET",
      }),
      providesTags: ["getAPromoterEventDetails"],
    }),

    getPromotersTicketSold: builder.query<
      TGetPromoterTicketSoldRes,
      TGetPromoterTicketSoldArgs
    >({
      query: ({ eventId, ticketTierId }) => {
        const queryString = ticketTierId ? `?ticketTierId=${ticketTierId}` : "";
        return {
          url: `/api/v1/promoters/tickets-sold/event/${eventId}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getPromoterTicketSold"],
    }),

    getPromotersTicketSoldRevenue: builder.query<
      TGetPromoterTicketSoldRevenueRes,
      TGetPromoterTicketSoldRevenueArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/promoter-revenue-graph/${slug}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getPromoterTicketSoldRevenue"],
    }),

    getPromotersTicketSoldList: builder.query<
      TGetPromotersTicketSoldListRes,
      TGetPromotersTicketSoldListArgs
    >({
      query: ({ eventId, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/tickets-sold/list/event/${eventId}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getPromotersTicketSoldList"],
    }),

    getPromoterStatus: builder.query<
      TGetPromoterStatusRes,
      TGetPromoterStatusArgs
    >({
      query: ({ invitationCode }) => ({
        url: `/api/v1/promoters/status/${invitationCode}`,
        method: "GET",
      }),
    }),

    getPromoterPermissions: builder.query<
      TGetPromoterPermissionsRes,
      TGetPromoterPermissionsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promoters/organization-permissions${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllPromotersInOrganizationQuery,
  useGetAllEventsInOrganizationQuery,
  useGetAllAssignedEventsQuery,
  useGetPromoterTicketTiersQuery,
  useGetAPromoterEventDetailsQuery,
  useGetPromotersTicketSoldQuery,
  useGetPromotersTicketSoldRevenueQuery,
  useGetPromotersTicketSoldListQuery,
  useGetPromoterStatusQuery,
  useGetPromoterPermissionsQuery,
} = PromoterApi;
