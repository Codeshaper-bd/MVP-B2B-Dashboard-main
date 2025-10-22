import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetACustomerLookupArgs,
  TGetACustomerLookupRes,
  TGetAllCustomerArgs,
  TGetAllCustomerLookupArgs,
  TGetAllCustomerLookupRes,
  TGetAllCustomerRes,
  TGetCustomersStatisticsArgs,
  TGetCustomersStatisticsRes,
  TGetUserEventJoinedArgs,
  TGetUserEventJoinedRes,
  TGetUserOrdersByMonthArgs,
  TGetUserOrdersByMonthRes,
  TInviteCustomerArgs,
  TInviteCustomerRes,
} from "./customer-lookup.types";

export const customerLookupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createACustomer: builder.mutation<TInviteCustomerRes, TInviteCustomerArgs>({
      query: (data) => ({
        url: "/api/v1/customer-lookup",
        method: "POST",
        body: data,
      }),

      invalidatesTags: () => [
        "getAllInvitedCustomers",
        {
          type: "getAllInvitedCustomers",
        },
      ],
    }),
    getAllInvitedCustomers: builder.query<
      TGetAllCustomerRes,
      TGetAllCustomerArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/customer-lookup/invited-customers${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllInvitedCustomers"],
    }),
    getAllCustomerLookup: builder.query<
      TGetAllCustomerLookupRes,
      TGetAllCustomerLookupArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/customer-lookup${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllCustomerLookup"],
    }),

    getACustomerLookup: builder.query<
      TGetACustomerLookupRes,
      TGetACustomerLookupArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/customer-lookup/${id}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getACustomerLookup", id: arg?.id ?? "-1" },
      ],
    }),
    getUserEventJoined: builder.query<
      TGetUserEventJoinedRes,
      TGetUserEventJoinedArgs
    >({
      query: ({ userId, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/customer-lookup/event-joined/${userId}/grouped${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getUserEventJoined"],
    }),
    getUserOrdersByMonth: builder.query<
      TGetUserOrdersByMonthRes,
      TGetUserOrdersByMonthArgs
    >({
      query: ({ userId, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/customer-lookup/user-orders-by-month/${userId}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getUserOrdersByMonth"],
    }),
    getCustomersStatistics: builder.query<
      TGetCustomersStatisticsRes,
      TGetCustomersStatisticsArgs
    >({
      query: ({ customerId }) => ({
        url: `/api/v1/customer-lookup/statistics/${customerId}`,
        method: "GET",
      }),

      providesTags: ["getCustomersStatistics"],
    }),
  }),
});

export const {
  useCreateACustomerMutation,
  useGetAllCustomerLookupQuery,
  useLazyGetAllCustomerLookupQuery,
  useGetACustomerLookupQuery,
  useGetAllInvitedCustomersQuery,
  useGetUserEventJoinedQuery,
  useGetUserOrdersByMonthQuery,
  useGetCustomersStatisticsQuery,
} = customerLookupApi;
