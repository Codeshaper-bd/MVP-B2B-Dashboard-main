import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateBarMenuArgs,
  TCreateBarMenuRes,
  TDeleteABarMenuArgs,
  TDeleteABarMenuRes,
  TGetABarMenuArgs,
  TGetABarMenuRes,
  TGetAllBarMenuArgs,
  TGetAllBarMenuRes,
  TUpdateABarMenuArgs,
  TUpdateABarMenuRes,
} from "./bar-menu.types";

export const barMenuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBarMenu: builder.mutation<TCreateBarMenuRes, TCreateBarMenuArgs>({
      query: (data) => ({
        url: `/api/v1/bar-menus`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllBarMenu"],
    }),

    getAllBarMenu: builder.query<TGetAllBarMenuRes, TGetAllBarMenuArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/bar-menus${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllBarMenu"],
    }),

    getABarMenu: builder.query<TGetABarMenuRes, TGetABarMenuArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/products/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getABarMenu", slug: arg?.slug },
      ],
    }),

    updateABarMenu: builder.mutation<TUpdateABarMenuRes, TUpdateABarMenuArgs>({
      query: ({ slug, body }) => ({
        url: `/api/v1/bar-menus/${slug}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllBarMenu",
        { type: "getABarMenu", slug: arg?.slug },
      ],
    }),

    deleteBarMenu: builder.mutation<TDeleteABarMenuRes, TDeleteABarMenuArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/bar-menus/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        "getAllBarMenu",
        { type: "getABarMenu", slug: arg?.slug },
      ],
    }),
  }),
});

export const {
  useCreateBarMenuMutation,
  useGetAllBarMenuQuery,
  useDeleteBarMenuMutation,
  useUpdateABarMenuMutation,
} = barMenuApi;
