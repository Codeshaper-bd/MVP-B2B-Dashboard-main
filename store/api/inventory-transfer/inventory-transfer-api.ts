import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "../index";
import type {
  TCreateInventoryTransferArgs,
  TCreateInventoryTransferRes,
  TGetAnInventoryTransferHistoryArgs,
  TGetAnInventoryTransferHistoryRes,
} from "./inventory-transfer.types";

export const inventoryTransferApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInventoryTransfer: builder.mutation<
      TCreateInventoryTransferRes,
      TCreateInventoryTransferArgs
    >({
      query: (data) => ({
        url: "/api/v1/inventory-transfers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "getAllInventoryItem",
        "getAllGroupTypeInventoryItem",
        "getAllInventoryItemIncludingBar",
      ],
    }),
    getAnInventoryTransferHistory: builder.query<
      TGetAnInventoryTransferHistoryRes,
      TGetAnInventoryTransferHistoryArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/inventory-transfers/history${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAnInventoryTransferHistory"],
    }),
  }),
});

export const {
  useCreateInventoryTransferMutation,
  useGetAnInventoryTransferHistoryQuery,
} = inventoryTransferApi;
