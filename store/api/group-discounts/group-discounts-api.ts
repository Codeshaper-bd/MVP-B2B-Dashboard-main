import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateGroupDiscountArgs,
  TCreateGroupDiscountRes,
  TDeleteAGroupDiscountArgs,
  TDeleteAGroupDiscountRes,
  TGetAGroupDiscountArgs,
  TGetAGroupDiscountRes,
  TGetAllGroupDiscountArgs,
  TGetAllGroupDiscountRes,
  TUpdateAGroupDiscountArgs,
  TUpdateAGroupDiscountRes,
} from "./group-discounts.types";

export const groupDiscountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAGroupDiscount: builder.mutation<
      TCreateGroupDiscountRes,
      TCreateGroupDiscountArgs
    >({
      query: (data) => ({
        url: "/api/v1/group-discounts",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllGroupDiscount", "getAllEvent", "getAnEvent"],
    }),

    getAllGroupDiscount: builder.query<
      TGetAllGroupDiscountRes,
      TGetAllGroupDiscountArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/group-discounts${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllGroupDiscount"],
    }),

    getAGroupDiscount: builder.query<
      TGetAGroupDiscountRes,
      TGetAGroupDiscountArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/group-discounts/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAGroupDiscount", id: arg?.id ?? -1 },
      ],
    }),

    updateAGroupDiscount: builder.mutation<
      TUpdateAGroupDiscountRes,
      TUpdateAGroupDiscountArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/group-discounts/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllGroupDiscount",
        { type: "getAGroupDiscount", id: arg?.id ?? -1 },
        "getAllEvent",
        "getAnEvent",
      ],
    }),

    deleteAGroupDiscount: builder.mutation<
      TDeleteAGroupDiscountRes,
      TDeleteAGroupDiscountArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/group-discounts/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllGroupDiscount",
        { type: "getAGroupDiscount", id: arg?.id ?? -1 },
        "getAllEvent",
        "getAnEvent",
      ],
    }),
  }),
});

export const {
  useCreateAGroupDiscountMutation,
  useGetAllGroupDiscountQuery,
  useGetAGroupDiscountQuery,
  useUpdateAGroupDiscountMutation,
  useDeleteAGroupDiscountMutation,
} = groupDiscountApi;
