import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TAttachMediaArgs,
  TAttachMediaRes,
  TDeleteMediaArgs,
  TDeleteMediaRes,
  TGetAllMediaArgs,
  TGetAllMediaRes,
  TGetAMediaArgs,
  TGetAMediaRes,
  TUploadAMediaArgs,
  TUploadAMediaRes,
} from "./media.types";

export const mediaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadAMedia: builder.mutation<TUploadAMediaRes, TUploadAMediaArgs>({
      query: ({ file, tags }) => {
        const formData = new FormData();
        if (file) {
          formData.append("file", file);
        }
        if (tags?.length) {
          formData.append("tags", tags?.join(","));
        }

        return {
          url: "/api/v1/media/upload",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["getAllMedia"],
    }),

    getAllMedia: builder.query<TGetAllMediaRes, TGetAllMediaArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `api/v1/media${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllMedia"],
    }),

    getAMedia: builder.query<TGetAMediaRes, TGetAMediaArgs>({
      query: (args) => ({
        url: `api/v1/media${args?.id}`,
        method: "GET",
      }),
      providesTags: ["getAllMedia"],
    }),

    attachMedia: builder.mutation<TAttachMediaRes, TAttachMediaArgs>({
      query: (args) => ({
        url: "/api/v1/media/attach",
        method: "POST",
      }),
      invalidatesTags: ["getAllMedia"],
    }),

    deleteAMedia: builder.mutation<TDeleteMediaRes, TDeleteMediaArgs>({
      query: ({ id }) => ({
        url: `api/v1/media/${Number(id ?? -1)}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => ["getAllMedia"],
    }),
  }),
});

export const {
  useUploadAMediaMutation,
  useGetAllMediaQuery,
  useGetAMediaQuery,
  useDeleteAMediaMutation,
  useAttachMediaMutation,
} = mediaApi;
