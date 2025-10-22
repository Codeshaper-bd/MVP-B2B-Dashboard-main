import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "../index";
import type {
  TGetInventoryTransferHistoryArgs,
  TGetInventoryTransferHistoryRes,
} from "./inventory-transfer.types";

export const inventoryTransferApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryTransferHistory: builder.query<
      TGetInventoryTransferHistoryRes,
      TGetInventoryTransferHistoryArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/inventory-transfers/web/history${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getInventoryTransferHistory"],
    }),
  }),
});

export const { useGetInventoryTransferHistoryQuery } = inventoryTransferApi;
