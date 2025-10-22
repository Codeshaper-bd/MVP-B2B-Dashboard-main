import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateInventoryCategoryArgs,
  TCreateInventoryCategoryRes,
  TDeleteAnInventoryCategoryArgs,
  TDeleteAnInventoryCategoryRes,
  TGetAllInventoryCategoryArgs,
  TGetAllInventoryCategoryRes,
  TGetAnInventoryCategoryArgs,
  TGetAnInventoryCategoryRes,
  TUpdateAnInventoryCategoryArgs,
  TUpdateAnInventoryCategoryRes,
} from "./inventory-category.types";

export const inventoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createInventoryCategory: builder.mutation<
      TCreateInventoryCategoryRes,
      TCreateInventoryCategoryArgs
    >({
      query: (data) => ({
        url: "/api/v1/inventory-categories",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllInventoryCategory"],
    }),

    getAllInventoryCategory: builder.query<
      TGetAllInventoryCategoryRes,
      TGetAllInventoryCategoryArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/inventory-categories${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllInventoryCategory"],
    }),

    getAnInventoryCategory: builder.query<
      TGetAnInventoryCategoryRes,
      TGetAnInventoryCategoryArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/inventory-categories/${slug}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getAnInventoryCategory", id: arg?.slug ?? "-1" },
      ],
    }),

    updateAnInventoryCategory: builder.mutation<
      TUpdateAnInventoryCategoryRes,
      TUpdateAnInventoryCategoryArgs
    >({
      query: ({ slug, body }) => ({
        url: `/api/v1/inventory-categories/${slug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllInventoryCategory",
        { type: "getAnInventoryCategory", id: arg?.slug ?? "-1" },
      ],
    }),

    // Delete an Inventory Category
    deleteAnInventoryCategory: builder.mutation<
      TDeleteAnInventoryCategoryRes,
      TDeleteAnInventoryCategoryArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/inventory-items/${slug}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllInventoryCategory",
        { type: "getAnInventoryCategory", id: arg?.slug ?? "-1" },
      ],
    }),
  }),
});

export const {
  useCreateInventoryCategoryMutation,
  useGetAllInventoryCategoryQuery,
  useGetAnInventoryCategoryQuery,
  useUpdateAnInventoryCategoryMutation,
  useDeleteAnInventoryCategoryMutation,
} = inventoriesApi;
