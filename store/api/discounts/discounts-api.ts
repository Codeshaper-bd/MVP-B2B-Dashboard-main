import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateDiscountArgs,
  TCreateDiscountRes,
  TDeleteADiscountArgs,
  TDeleteADiscountRes,
  TGetADiscountArgs,
  TGetADiscountRes,
  TGetAllDiscountArgs,
  TGetAllDiscountRes,
  TUpdateADiscountArgs,
  TUpdateADiscountRes,
} from "./discounts.types";

export const discountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createADiscount: builder.mutation<TCreateDiscountRes, TCreateDiscountArgs>({
      query: (data) => ({
        url: "/api/v1/discounts",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error) => {
        if (result?.success) {
          return ["getAllDiscount", "getAllEvent", "getAnEvent"];
        }
        return [];
      },
    }),

    getAllDiscount: builder.query<TGetAllDiscountRes, TGetAllDiscountArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/discounts${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllDiscount"],
    }),

    getADiscount: builder.query<TGetADiscountRes, TGetADiscountArgs>({
      query: ({ id }) => ({
        url: `/api/v1/discounts/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getADiscount", id: arg?.id ?? -1 },
      ],
    }),

    updateADiscount: builder.mutation<
      TUpdateADiscountRes,
      TUpdateADiscountArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/discounts/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return [
            "getAllDiscount",
            { type: "getADiscount", id: arg?.id ?? -1 },
            // "getAllEvent",
            // "getAnEvent",
          ];
        }
        return [];
      },
    }),

    deleteADiscount: builder.mutation<
      TDeleteADiscountRes,
      TDeleteADiscountArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/discounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return [
            "getAllDiscount",
            { type: "getADiscount", id: arg?.id ?? -1 },
            // "getAllEvent",
            "getAnEvent",
          ];
        }
        return [];
      },
      // invalidatesTags: (result, error, arg) => [
      //   "getAllDiscount",
      //   { type: "getADiscount", id: arg?.id ?? -1 },
      //   "getAllEvent",
      //   "getAnEvent",
      // ],
    }),
  }),
});

export const {
  useCreateADiscountMutation,
  useGetAllDiscountQuery,
  useGetADiscountQuery,
  useUpdateADiscountMutation,
  useDeleteADiscountMutation,
} = discountApi;
