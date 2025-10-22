import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Need to use the React-specific entry point to import `createApi`

import { type TMimeType } from "@/lib/media/url-to-file/using-fetch-api/url-to-file";

import type {
  TFetchFileApiArgs,
  TFetchFileApiRes,
} from "./fetch-file-api.types";

type TFetchBaseQueryReturnType = ReturnType<typeof fetchBaseQuery>;

const baseQuery: TFetchBaseQueryReturnType = fetchBaseQuery({
  baseUrl: "",
});

export const fileApiSlice = createApi({
  reducerPath: "fileApiSlice",
  baseQuery,
  endpoints: (builder) => ({
    fetchFile: builder.query<TFetchFileApiRes, TFetchFileApiArgs>({
      // Pass the complete URL as the URL parameter
      query: (args) => {
        const { url } = args || {};
        return {
          url: url || "",
          async responseHandler(response) {
            return await response?.blob();
          },
        };
      },

      // Transform the blob response into a File
      transformResponse: (responseData: Blob, _, arg) => {
        if (!(responseData instanceof Blob)) {
          return null;
        }

        return new File(
          [responseData],
          arg?.originalName || new Date().toISOString(),
          {
            type: (arg?.type || "image/jpg") as TMimeType,
            lastModified: new Date(
              arg?.updatedAt || arg?.deletedAt || arg?.createdAt || new Date(),
            ).getTime(),
          },
        );
      },

      keepUnusedDataFor: 7200, // 2 hours
      providesTags: ["fetchFile"],
    }),
  }),

  tagTypes: ["fetchFile"],
});

export const { useFetchFileQuery, useLazyFetchFileQuery } = fileApiSlice;

export type TFileApiSlice = typeof fileApiSlice;
