import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateRoleArgs,
  TCreateRoleRes,
  TDeleteARoleArgs,
  TDeleteARoleRes,
  TGetAllRolesArgs,
  TGetAllRolesRes,
  TGetARoleArgs,
  TGetARoleRes,
  TUpdateARoleArgs,
  TUpdateARoleRes,
} from "./roles.types";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation<TCreateRoleRes, TCreateRoleArgs>({
      query: (data) => ({
        url: `/api/v1/roles`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllRoles"],
    }),

    getAllRoles: builder.query<TGetAllRolesRes, TGetAllRolesArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/roles${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getAllRoles"],
    }),

    getARole: builder.query<TGetARoleRes, TGetARoleArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/roles${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        { type: "getARole", id: arg?.id ?? -1 },
      ],
    }),

    updateARole: builder.mutation<TUpdateARoleRes, TUpdateARoleArgs>({
      query: (args) => {
        const { id, body } = args;
        return {
          url: `/api/v1/product-categories/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        "getAllRoles",
        { type: "getARole", id: arg?.id ?? -1 },
      ],
    }),

    deleteARole: builder.mutation<TDeleteARoleRes, TDeleteARoleArgs>({
      query: (args) => {
        const { id } = args;
        return {
          url: `/api/v1/roles/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [
        "getAllRoles",
        { type: "getARole", id: arg?.id ?? -1 },
      ],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useGetARoleQuery,
  useUpdateARoleMutation,
  useDeleteARoleMutation,
} = rolesApi;
