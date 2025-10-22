import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateLinkTrackingArgs,
  TCreateLinkTrackingRes,
  TDeleteALinkTrackingArgs,
  TDeleteALinkTrackingRes,
  TGetALinkTrackingArgs,
  TGetALinkTrackingRes,
  TGetAllLinkTrackingArgs,
  TGetAllLinkTrackingRes,
  TUpdateALinkTrackingArgs,
  TUpdateALinkTrackingRes,
} from "./link-tracking.types";

export const linkTrackingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createALinkTracking: builder.mutation<
      TCreateLinkTrackingRes,
      TCreateLinkTrackingArgs
    >({
      query: (data) => ({
        url: "/api/v1/link-tracking",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error) => {
        if (result?.success) {
          return ["getAllLinkTracking", "getAllEvent", "getAnEvent"];
        }
        return [];
      },
    }),

    getAllLinkTracking: builder.query<
      TGetAllLinkTrackingRes,
      TGetAllLinkTrackingArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/link-tracking${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllLinkTracking"],
    }),

    getALinkTracking: builder.query<
      TGetALinkTrackingRes,
      TGetALinkTrackingArgs
    >({
      query: ({ identifier }) => ({
        url: `/api/v1/link-tracking/${identifier}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getALinkTracking", slug: arg?.identifier ?? "-1" },
      ],
    }),

    updateALinkTracking: builder.mutation<
      TUpdateALinkTrackingRes,
      TUpdateALinkTrackingArgs
    >({
      query: ({ identifier, body }) => ({
        url: `/api/v1/link-tracking/${identifier}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return ["getAllLinkTracking", "getAllEvent", "getAnEvent"];
        }
        return [];
      },
    }),

    deleteALinkTracking: builder.mutation<
      TDeleteALinkTrackingRes,
      TDeleteALinkTrackingArgs
    >({
      query: ({ identifier }) => ({
        url: `/api/v1/link-tracking/${identifier}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllLinkTracking",
        { type: "getALinkTracking", slug: arg?.identifier ?? "-1" },
        "getAllEvent",
        "getAnEvent",
      ],
    }),
  }),
});

export const {
  useCreateALinkTrackingMutation,
  useGetAllLinkTrackingQuery,
  useGetALinkTrackingQuery,
  useUpdateALinkTrackingMutation,
  useDeleteALinkTrackingMutation,
} = linkTrackingApi;
