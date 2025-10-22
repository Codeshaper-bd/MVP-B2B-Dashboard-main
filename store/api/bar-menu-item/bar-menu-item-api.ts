// bar-menu-item.api.ts

import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateBarMenuItemArgs,
  TCreateBarMenuItemRes,
  TDeleteBarMenuItemArgs,
  TDeleteBarMenuItemRes,
  TGetABarMenuItemStatsArgs,
  TGetABarMenuItemStatsRes,
  TGetAllBarMenuItemArgs,
  TGetAllBarMenuItemByBarMenuSlugArgs,
  TGetAllBarMenuItemByBarMenuSlugRes,
  TGetAllBarMenuItemInfiniteArgs,
  TGetAllBarMenuItemRes,
  TGetBarMenuItemArgs,
  TGetBarMenuItemRes,
  TUpdateBarMenuItemArgs,
  TUpdateBarMenuItemRes,
} from "./bar-menu-item.types";

/**
 * Bar Menu Item API Endpoints using RTK Query.
 *
 * This module defines endpoints for creating, fetching (all and single),
 * updating, and deleting bar menu items. Each endpoint includes proper URL
 * paths, HTTP methods, and cache management.
 */
export const barMenuItemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new Bar Menu Item
    createBarMenuItem: builder.mutation<
      TCreateBarMenuItemRes,
      TCreateBarMenuItemArgs
    >({
      query: (data) => ({
        url: "/api/v1/bar-menu-items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "getAllBarMenuItem",
        "getAllBarMenuItemByBarMenuSlug",
        "getAllBarMenu",
        "getABarMenu",
      ],
    }),

    // Fetch all Bar Menu Items with filtering and pagination support
    getAllBarMenuItem: builder.query<
      TGetAllBarMenuItemRes,
      TGetAllBarMenuItemArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/bar-menu-items${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllBarMenuItem"],
    }),
    // Fetch all Bar Menu Items with infinite query and filtering and pagination support
    getAllBarMenuItems: builder.infiniteQuery<
      TGetAllBarMenuItemRes,
      TGetAllBarMenuItemArgs,
      TGetAllBarMenuItemInfiniteArgs
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          page: 1,
          pageSize: 10,
        },

        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPageParams,
        ) => {
          const nextPage = Number(lastPageParam?.page || 1) + 1;
          const remainingPages =
            Number(lastPage?.pagination?.totalPages || 1) - nextPage;

          if (remainingPages <= 0) {
            return undefined;
          }

          return {
            ...lastPageParam,
            page: nextPage,
          };
        },
      },

      query: ({ queryArg, pageParam }) => {
        const { queryString } = generateQueryString({
          ...(queryArg ?? {}),
          page: pageParam?.page || queryArg?.page,
          pageSize: queryArg?.pageSize || pageParam?.pageSize,
        });
        return `/api/v1/bar-menu-items${queryString}`;
      },
    }),

    // Fetch a single Bar Menu Item by slug
    getBarMenuItem: builder.query<TGetBarMenuItemRes, TGetBarMenuItemArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/bar-menu-items/${slug}`, // Endpoint URL for a single bar menu item
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getBarMenuItem", id: arg?.slug ?? "-1" },
      ],
    }),

    // Fetch all Bar Menu Items By Bar Menu Slug
    getAllBarMenuItemByBarMenuSlug: builder.query<
      TGetAllBarMenuItemByBarMenuSlugRes,
      TGetAllBarMenuItemByBarMenuSlugArgs
    >({
      query: ({ slug, ...restArgs }) => {
        const { queryString } = generateQueryString(restArgs);

        return {
          url: `/api/v1/bar-menu-items/bar-menu/${slug}${queryString}`, // Endpoint URL for a single bar menu item
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        { type: "getAllBarMenuItemByBarMenuSlug", id: arg?.slug ?? "-1" },
      ],
    }),

    // Update an existing Bar Menu Item
    updateBarMenuItem: builder.mutation<
      TUpdateBarMenuItemRes,
      TUpdateBarMenuItemArgs
    >({
      query: ({ slug, body }) => ({
        url: `/api/v1/bar-menu-items/${slug}`, // Endpoint URL for updating a bar menu item
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllBarMenuItem",
        { type: "getBarMenuItem", id: arg?.slug ?? "-1" },
        "getAllBarMenu",
        "getABarMenu",
      ],
    }),

    // Delete a Bar Menu Item
    deleteBarMenuItem: builder.mutation<
      TDeleteBarMenuItemRes,
      TDeleteBarMenuItemArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/bar-menu-items/${slug}`, // Endpoint URL for deleting a bar menu item
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllBarMenuItemByBarMenuSlug",
        "getAllBarMenuItem",
        { type: "getBarMenuItem", id: arg?.slug ?? "-1" },
        "getAllBarMenu",
        "getABarMenu",
      ],
    }),

    // Fetch a single Bar Menu Item by slug
    getABarMenuItemStats: builder.query<
      TGetABarMenuItemStatsRes,
      TGetABarMenuItemStatsArgs
    >({
      query: ({ slug, ...args }) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/bar-menu-items/stats/${slug}${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        { type: "getABarMenuItemStats", slug: arg?.slug ?? "-1" },
      ],
    }),
  }),
});

export const {
  useCreateBarMenuItemMutation,
  useGetAllBarMenuItemQuery,
  useGetAllBarMenuItemByBarMenuSlugQuery,
  useGetBarMenuItemQuery,
  useUpdateBarMenuItemMutation,
  useDeleteBarMenuItemMutation,
  useGetAllBarMenuItemsInfiniteQuery,
  useGetABarMenuItemStatsQuery,
} = barMenuItemApi;
