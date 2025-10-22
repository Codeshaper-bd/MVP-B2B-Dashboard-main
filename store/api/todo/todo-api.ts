import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type { TPaginationArgs } from "../common-api-types";
import type {
  TCreateTodoArgs,
  TCreateTodoRes,
  TGetAllTodoArgs,
  TGetAllTodoRes,
  TGetAllTodoTagsArgs,
  TGetAllTodoTagsRes,
  TGetATodoArgs,
  TGetATodoRes,
  TUpdateATodoArgs,
  TUpdateATodoRes,
} from "./todo.types";

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<TCreateTodoRes, TCreateTodoArgs>({
      query: (data) => ({
        url: "/api/v1/todos",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [
        "getOverviewTodo",
        "getNotCompletedTodos",
        "getCompletedTodos",
        "getAllTodoTags",
      ],
    }),

    getOverviewTodo: builder.query<TGetAllTodoRes, void>({
      query: () => {
        const paginationArgs: TPaginationArgs = {
          page: 1,
          pageSize: 3,
          status: "NOT_COMPLETED",
        };
        const { queryString } = generateQueryString(paginationArgs);
        return {
          url: `/api/v1/todos${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getOverviewTodo"],
    }),

    getCompletedTodos: builder.query<TGetAllTodoRes, TGetAllTodoArgs>({
      query: (args) => {
        const processedArgs: TGetAllTodoArgs = {
          ...args,
          // page: 1,
          // pageSize: 10,
          status: "COMPLETED",
        };
        const { queryString } = generateQueryString(processedArgs);
        return {
          url: `/api/v1/todos${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getCompletedTodos"],
    }),

    getMoreCompletedTodos: builder.query<TGetAllTodoRes, TGetAllTodoArgs>({
      query: (args) => {
        const processedArgs: TGetAllTodoArgs = {
          ...args,
          pageSize: 10,
          status: "COMPLETED",
        };
        const { queryString } = generateQueryString(processedArgs);
        return {
          url: `/api/v1/todos${queryString}`,
          method: "GET",
        };
      },
    }),

    getNotCompletedTodos: builder.query<TGetAllTodoRes, TGetAllTodoArgs>({
      query: (args) => {
        const processedArgs: TGetAllTodoArgs = {
          ...args,
          status: "NOT_COMPLETED",
          // page: 1,
          // pageSize: 10,
        };
        const { queryString } = generateQueryString(processedArgs);
        return {
          url: `/api/v1/todos${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getNotCompletedTodos"],
    }),

    getMoreNotCompletedTodos: builder.query<TGetAllTodoRes, TGetAllTodoArgs>({
      query: (args) => {
        const processedArgs: TGetAllTodoArgs = {
          ...args,
          pageSize: 10,
          status: "NOT_COMPLETED",
        };

        const { queryString } = generateQueryString(processedArgs);
        return {
          url: `/api/v1/todos${queryString}`,
          method: "GET",
        };
      },
    }),

    getATodo: builder.query<TGetATodoRes, TGetATodoArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/todos/${slug ?? "-1"}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getATodo", id: arg?.slug ?? "-1" },
      ],
    }),

    getAllTodoTags: builder.query<TGetAllTodoTagsRes, TGetAllTodoTagsArgs>({
      query: () => ({
        url: `/api/v1/todos/tags`,
        method: "GET",
      }),

      providesTags: ["getAllTodoTags"],
    }),

    updateTodo: builder.mutation<TUpdateATodoRes, TUpdateATodoArgs>({
      query: ({ slug, body }) => ({
        url: `/api/v1/todos/${slug ?? "-1"}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: [
        "getCompletedTodos",
        "getNotCompletedTodos",
        "getOverviewTodo",
      ],
    }),

    deleteTodo: builder.mutation<{ success: boolean; slug: string }, string>({
      query: (slug) => ({
        url: `/api/v1/todos/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "getCompletedTodos",
        "getNotCompletedTodos",
        "getOverviewTodo",
      ],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useGetAllTodoTagsQuery,
  useGetNotCompletedTodosQuery,
  useGetMoreNotCompletedTodosQuery,
  useGetCompletedTodosQuery,
  useGetMoreCompletedTodosQuery,
  useGetOverviewTodoQuery,
  useGetATodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
