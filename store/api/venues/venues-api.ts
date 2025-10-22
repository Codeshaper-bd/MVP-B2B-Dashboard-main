import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateVenueArgs,
  TCreateVenueRes,
  TDeleteAVenueArgs,
  TDeleteAVenueRes,
  TGetAVenueArgs,
  TGetAVenueRes,
  TGetAllVenueArgs,
  TGetAllVenueRes,
  TUpdateAVenueArgs,
  TUpdateAVenueRes,
} from "./venues.types";

export const venuesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAVenue: builder.mutation<TCreateVenueRes, TCreateVenueArgs>({
      query: (data) => ({
        url: "/api/v1/venues",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllVenue"],
    }),

    getAllVenue: builder.query<TGetAllVenueRes, TGetAllVenueArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/venues${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllVenue"],
    }),

    getAVenue: builder.query<TGetAVenueRes, TGetAVenueArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/venues/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAVenue", id: arg?.slug ?? "-1" },
      ],
    }),

    updateAVenue: builder.mutation<TUpdateAVenueRes, TUpdateAVenueArgs>({
      query: ({ slug, body }) => ({
        url: `/api/v1/venues/${slug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllVenue",
        { type: "getAVenue", id: arg?.slug ?? "-1" },
      ],
    }),

    deleteAVenue: builder.mutation<TDeleteAVenueRes, TDeleteAVenueArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/venues/${slug}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllVenue",
        { type: "getAVenue", id: arg?.slug ?? "-1" },
      ],
    }),
  }),
});

export const {
  useCreateAVenueMutation,
  useGetAllVenueQuery,
  useGetAVenueQuery,
  useUpdateAVenueMutation,
  useDeleteAVenueMutation,
} = venuesApi;
