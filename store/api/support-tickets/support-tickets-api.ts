import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateSupportTicketsArgs,
  TCreateSupportTicketsRes,
  TGetAllSupportTicketsArgs,
  TGetAllSupportTicketsRes,
  TGetASupportTicketsArgs,
  TGetASupportTicketsRes,
} from "./support-tickets.types";

export const supportTicketsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createASupportTickets: builder.mutation<
      TCreateSupportTicketsRes,
      TCreateSupportTicketsArgs
    >({
      query: (data) => ({
        url: "/api/v1/support-tickets",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllSupportTickets"],
    }),

    getAllSupportTickets: builder.query<
      TGetAllSupportTicketsRes,
      TGetAllSupportTicketsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/support-tickets${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllSupportTickets"],
    }),

    getASupportTickets: builder.query<
      TGetASupportTicketsRes,
      TGetASupportTicketsArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/support-tickets/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getASupportTicket", id: arg?.id ?? "-1" },
      ],
    }),
  }),
});

export const {
  useCreateASupportTicketsMutation,
  useGetAllSupportTicketsQuery,
  useGetASupportTicketsQuery,
} = supportTicketsApi;
