import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateEmployeeArgs,
  TCreateEmployeeRes,
  TDeleteAEmployeeArgs,
  TDeleteAEmployeeRes,
  TGetAEmployeeArgs,
  TGetAEmployeeRes,
  TGetAllEmployeesArgs,
  TGetAllEmployeesRes,
  TGetAnEmployeePerformanceArgs,
  TGetAnEmployeePerformanceRes,
  TUpdateAEmployeeArgs,
  TUpdateAEmployeeRes,
} from "./employees.types";

export const employeesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAEmployee: builder.mutation<TCreateEmployeeRes, TCreateEmployeeArgs>({
      query: (data) => ({
        url: "/api/v1/employees",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllEmployee"],
    }),

    getAllEmployee: builder.query<TGetAllEmployeesRes, TGetAllEmployeesArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/employees${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllEmployee"],
    }),

    getAEmployee: builder.query<TGetAEmployeeRes, TGetAEmployeeArgs>({
      query: ({ id }) => ({
        url: `/api/v1/employees/${Number(id ?? -1)}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAEmployee", id: Number(arg?.id ?? -1) },
      ],
    }),

    updateAEmployee: builder.mutation<
      TUpdateAEmployeeRes,
      TUpdateAEmployeeArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/employees/${Number(id ?? -1)}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllEmployee",
        { type: "getAEmployee", id: Number(arg?.id ?? -1) },
      ],
    }),

    deleteAEmployee: builder.mutation<
      TDeleteAEmployeeRes,
      TDeleteAEmployeeArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/employees/${Number(id ?? -1)}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllEmployee",
        { type: "getAEmployee", id: Number(arg?.id ?? -1) },
      ],
    }),

    getAnEmployeePerformance: builder.query<
      TGetAnEmployeePerformanceRes,
      TGetAnEmployeePerformanceArgs
    >({
      query: ({ employeeId, ...args }) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/api/v1/employees/performance/${employeeId}${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAnEmployeePerformance"],
    }),
  }),
});

export const {
  useCreateAEmployeeMutation,
  useGetAllEmployeeQuery,
  useLazyGetAllEmployeeQuery,
  useGetAEmployeeQuery,
  useUpdateAEmployeeMutation,
  useDeleteAEmployeeMutation,
  useGetAnEmployeePerformanceQuery,
} = employeesApi;
