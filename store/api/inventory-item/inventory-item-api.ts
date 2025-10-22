// inventory-item.api.ts

import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateInventoryItemArgs,
  TCreateInventoryItemRes,
  TDeleteAnInventoryItemArgs,
  TDeleteAnInventoryItemRes,
  TGetAllGroupTypeInventoryItemArgs,
  TGetAllGroupTypeInventoryItemRes,
  TGetAllInventoryItemArgs,
  TGetAllInventoryItemIncludingBarArgs,
  TGetAllInventoryItemIncludingBarRes,
  TGetAllInventoryItemRes,
  TGetAllLcboCodeArgs,
  TGetAllLcboCodeRes,
  TGetAnInventoryItemArgs,
  TGetAnInventoryItemRes,
  TUpdateAnInventoryItemArgs,
  TUpdateAnInventoryItemRes,
  TUpdateBarInventoryItemStockArgs,
  TUpdateBarInventoryItemStockRes,
} from "./inventory-item.types";

/**
 * Inventory Item API Endpoints using RTK Query.
 *
 * This module defines endpoints for creating, fetching (all and single),
 * updating, and deleting inventory items. Each endpoint includes proper URL
 * paths, HTTP methods, and cache management.
 */
export const inventoryItemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new Inventory Item
    createInventoryItem: builder.mutation<
      TCreateInventoryItemRes,
      TCreateInventoryItemArgs
    >({
      query: (data) => ({
        url: "/api/v1/inventory-items", // Endpoint URL for creating an inventory item
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllInventoryItem", "getAllGroupTypeInventoryItem"],
    }),

    // Fetch all Inventory Items with filtering and pagination support
    getAllInventoryItem: builder.query<
      TGetAllInventoryItemRes,
      TGetAllInventoryItemArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/inventory-items${queryString}`, // Endpoint URL with query parameters
          method: "GET",
        };
      },
      providesTags: ["getAllInventoryItem"],
    }),

    // Fetch all Inventory Items with filtering and pagination support
    getAllInventoryItemIncludingBar: builder.query<
      TGetAllInventoryItemIncludingBarRes,
      TGetAllInventoryItemIncludingBarArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/inventory-items/including-bar${queryString}`, // Endpoint URL with query parameters
          method: "GET",
        };
      },
      providesTags: ["getAllInventoryItemIncludingBar"],
    }),

    // Fetch all Inventory Items with filtering and pagination support
    getAllGroupTypeInventoryItem: builder.query<
      TGetAllGroupTypeInventoryItemRes,
      TGetAllGroupTypeInventoryItemArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/inventory-items${queryString}`, // Endpoint URL with query parameters
          method: "GET",
        };
      },
      providesTags: ["getAllGroupTypeInventoryItem"],
    }),

    // Fetch all Inventory Items with filtering and pagination support
    getAllLcboCode: builder.query<TGetAllLcboCodeRes, TGetAllLcboCodeArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/inventory-items/lcbo-code${queryString}`, // Endpoint URL with query parameters
          method: "GET",
        };
      },
      keepUnusedDataFor: 86400, // Cache for 1 day (86400 seconds)
      providesTags: ["getAllGroupTypeInventoryItem"],
    }),

    // Fetch a single Inventory Item by slug
    getAnInventoryItem: builder.query<
      TGetAnInventoryItemRes,
      TGetAnInventoryItemArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/inventory-items/${slug}`, // Endpoint URL for a single inventory item
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAnInventoryItem", id: arg?.slug ?? "-1" },
      ],
    }),

    // Update an existing Inventory Item
    updateAnInventoryItem: builder.mutation<
      TUpdateAnInventoryItemRes,
      TUpdateAnInventoryItemArgs
    >({
      query: ({ slug, body }) => ({
        url: `/api/v1/inventory-items/${slug}`, // Endpoint URL for updating an inventory item
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllInventoryItem",
        "getAllGroupTypeInventoryItem",
        { type: "getAnInventoryItem", id: arg?.slug ?? "-1" },
      ],
    }),
    // Update an  Inventory Item
    updateBarInventoryItemStock: builder.mutation<
      TUpdateBarInventoryItemStockRes,
      TUpdateBarInventoryItemStockArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/inventory-items/${id}/bar/adjust-stock`, // Endpoint URL for updating a bar inventory item stock
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllInventoryItem",
        "getAllGroupTypeInventoryItem",
        "getAllInventoryItemIncludingBar",
        { type: "getAnInventoryItem", id: arg?.id ?? "-1" },
      ],
    }),

    // Delete an Inventory Item
    deleteAnInventoryItem: builder.mutation<
      TDeleteAnInventoryItemRes,
      TDeleteAnInventoryItemArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/inventory-items/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllInventoryItem",
        "getAllGroupTypeInventoryItem",
        "getAllInventoryItemIncludingBar",
        { type: "getAnInventoryItem", id: arg?.slug ?? "-1" },
      ],
    }),
  }),
});

export const {
  useCreateInventoryItemMutation,
  useGetAllInventoryItemQuery,
  useGetAllInventoryItemIncludingBarQuery,
  useGetAllGroupTypeInventoryItemQuery,
  useGetAnInventoryItemQuery,
  useUpdateAnInventoryItemMutation,
  useUpdateBarInventoryItemStockMutation,
  useDeleteAnInventoryItemMutation,
  useGetAllLcboCodeQuery,
} = inventoryItemApi;
