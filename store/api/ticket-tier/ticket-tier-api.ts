import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateTicketTierArgs,
  TCreateTicketTierRes,
  TDeleteATicketTierArgs,
  TDeleteATicketTierRes,
  TGetATicketTierArgs,
  TGetATicketTierRes,
  TGetAllTicketTierArgs,
  TGetAllTicketTierRes,
  TGetTicketTiersDetailsArgs,
  TGetTicketTiersDetailsRes,
  TUpdateATicketTierArgs,
  TUpdateATicketTierRes,
} from "./ticket-tier.types";

export const ticketTierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createATicketTier: builder.mutation<
      TCreateTicketTierRes,
      TCreateTicketTierArgs
    >({
      query: (data) => ({
        url: "/api/v1/ticket-tiers",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [
          "getAllTicketTier",
          "getAllEvent",
          "getAnEvent",
          "getAnEventRevenue",
        ];
      },
    }),

    getAllTicketTier: builder.query<
      TGetAllTicketTierRes,
      TGetAllTicketTierArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/ticket-tiers${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllTicketTier"],
    }),

    getATicketTier: builder.query<TGetATicketTierRes, TGetATicketTierArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/ticket-tiers/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getATicketTier", id: arg?.slug ?? "-1" },
      ],
    }),

    updateATicketTier: builder.mutation<
      TUpdateATicketTierRes,
      TUpdateATicketTierArgs
    >({
      query: ({ slug, body }) => ({
        url: `/api/v1/ticket-tiers/${slug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }
        return [
          "getAllTicketTier",
          { type: "getATicketTier", id: arg?.slug ?? "-1" },
          "getAllEvent",
          "getAnEvent",
        ];
      },
    }),

    deleteATicketTier: builder.mutation<
      TDeleteATicketTierRes,
      TDeleteATicketTierArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/ticket-tiers/${slug}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }
        return [
          "getAllTicketTier",
          { type: "getATicketTier", id: arg?.slug ?? "-1" },
          "getAllEvent",
          "getAnEvent",
        ];
      },
    }),
    getTicketTiersDetails: builder.query<
      TGetTicketTiersDetailsRes,
      TGetTicketTiersDetailsArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/events/common/ticket-tiers/${slug}`,
        method: "GET",
      }),

      providesTags: ["getTicketTiersDetails"],
    }),
  }),
});

export const {
  useCreateATicketTierMutation,
  useGetAllTicketTierQuery,
  useGetATicketTierQuery,
  useUpdateATicketTierMutation,
  useDeleteATicketTierMutation,
  useGetTicketTiersDetailsQuery,
} = ticketTierApi;
