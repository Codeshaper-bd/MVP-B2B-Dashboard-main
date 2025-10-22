// bar-inventory.api.ts

import { apiSlice } from "..";
import {
  type TSoftDeleteBarInventoryItemArgs,
  type TSoftDeleteBarInventoryItemRes,
  type TGetBarInventoryItemArgs,
  type TGetBarInventoryItemRes,
  type TUpdateBarInventoryRes,
  type TUpdateBarInventoryArgs,
} from "./bar-inventory.types";

/**
 * Bar Menu Item API Endpoints using RTK Query.
 *
 * This module defines endpoints for creating, fetching (all and single),
 * updating, and deleting bar menu items. Each endpoint includes proper URL
 * paths, HTTP methods, and cache management.
 */
export const barInventoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch a single Bar Menu Item by slug
    getBarInventoryItem: builder.query<
      TGetBarInventoryItemRes,
      TGetBarInventoryItemArgs
    >({
      query: ({ barSlug, inventoryItemId }) => ({
        url: `/api/v1/bar-inventory/${barSlug}/items/${inventoryItemId}`, // Endpoint URL for a single bar inventory item
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        "getBarInventoryItem",
        {
          type: "getBarInventoryItem",
          id: `${arg.barSlug ?? "-1"}-${arg.inventoryItemId ?? "-1"}`,
        },
      ],
    }),

    // Update a Bar Menu Item
    updateBarInventoryItem: builder.mutation<
      TUpdateBarInventoryRes,
      TUpdateBarInventoryArgs
    >({
      query: ({ barSlug, itemSlug, body }) => ({
        url: `/api/v1/bar-inventory/bars/${barSlug}/items/${itemSlug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllInventoryItemIncludingBar",
        "getAllGroupTypeInventoryItem",
        "getBarInventoryItem",
        {
          type: "getBarInventoryItem",
          id: `${arg.barSlug ?? "-1"}-${arg.itemSlug ?? "-1"}`,
        },
      ],
    }),

    // Delete a Bar Menu Item
    softDeleteBarInventoryItem: builder.mutation<
      TSoftDeleteBarInventoryItemRes,
      TSoftDeleteBarInventoryItemArgs
    >({
      query: ({ body }) => ({
        url: "/api/v1/bar-inventory/soft-delete",
        method: "DELETE",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllInventoryItemIncludingBar",
        "getAllGroupTypeInventoryItem",
        "getBarInventoryItem",
      ],
    }),
  }),
});

export const {
  useGetBarInventoryItemQuery,
  useUpdateBarInventoryItemMutation,
  useSoftDeleteBarInventoryItemMutation,
} = barInventoryApi;
