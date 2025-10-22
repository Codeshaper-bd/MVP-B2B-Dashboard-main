import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetAnEventOrdersArgs,
  TGetAnEventOrdersRes,
  TOrderHistoryEventDetailsArgs,
  TOrderHistoryEventDetailsRes,
} from "./order-history.types";

export const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnEventOrders: builder.query<
      TGetAnEventOrdersRes,
      TGetAnEventOrdersArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/order-history/${args?.slug}/orders${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAnEventOrders"],
    }),
    getAnEventOrderDetails: builder.query<
      TOrderHistoryEventDetailsRes,
      TOrderHistoryEventDetailsArgs
    >({
      query: ({ orderId, slug }) => ({
        url: `/api/v1/order-history/${slug}/orders/${orderId}`,
        method: "GET",
      }),

      providesTags: ["getAnEventOrderDetails"],
    }),
  }),
});

export const { useGetAnEventOrdersQuery, useGetAnEventOrderDetailsQuery } =
  eventsApi;
