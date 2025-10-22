import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateAddOnArgs,
  TCreateAddOnRes,
  TDeleteAnAddOnArgs,
  TDeleteAnAddOnRes,
  TGetAddonPurchasedArgs,
  TGetAddonPurchasedRes,
  TGetAllAddOnArgs,
  TGetAllAddOnRes,
  TGetAnAddOnArgs,
  TGetAnAddOnRes,
  TUpdateAnAddOnArgs,
  TUpdateAnAddOnRes,
} from "./add-ons.types";

export const AddOnsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAnAddOn: builder.mutation<TCreateAddOnRes, TCreateAddOnArgs>({
      query: (data) => ({
        url: "/api/v1/add-ons",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error) => {
        if (result?.success) {
          return ["getAllAddOn", "getAllEvent", "getAnEvent"];
        }
        return [];
      },
    }),

    getAllAddOn: builder.query<TGetAllAddOnRes, TGetAllAddOnArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/add-ons${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllAddOn"],
    }),

    getAnAddOn: builder.query<TGetAnAddOnRes, TGetAnAddOnArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/add-ons/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAnAddOn", slug: arg?.slug ?? "-1" },
      ],
    }),

    updateAnAddOn: builder.mutation<TUpdateAnAddOnRes, TUpdateAnAddOnArgs>({
      query: ({ slug, body }) => ({
        url: `/api/v1/add-ons/${slug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return [
            "getAllAddOn",
            { type: "getAnAddOn", slug: arg?.slug ?? "-1" },
            "getAllEvent",
            "getAnEvent",
          ];
        }
        return [];
      },
    }),

    deleteAnAddOn: builder.mutation<TDeleteAnAddOnRes, TDeleteAnAddOnArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/add-ons/${slug}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllAddOn",
        { type: "getAnAddOn", slug: arg?.slug ?? "-1" },
        "getAllEvent",
        "getAnEvent",
      ],
    }),
    getAddonPurchased: builder.query<
      TGetAddonPurchasedRes,
      TGetAddonPurchasedArgs
    >({
      query: ({ ticketSoldId }) => ({
        url: `/api/v1/add-ons/${ticketSoldId}/add-ons`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAnAddOnMutation,
  useGetAllAddOnQuery,
  useGetAnAddOnQuery,
  useUpdateAnAddOnMutation,
  useDeleteAnAddOnMutation,
  useGetAddonPurchasedQuery,
} = AddOnsApi;
