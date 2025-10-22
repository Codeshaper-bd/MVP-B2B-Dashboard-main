// import { generateQueryString } from "@/lib/generate-query-string";
// import { apiSlice } from "..";
// import {
//   TCreateTagForATodoArgs,
//   TCreateTagForATodoRes,
//   TCreateTodoTagArgs,
//   TCreateTodoTagRes,
//   TDeleteATodoTagArgs,
//   TDeleteATodoTagRes,
//   TDeleteTagForATodoArgs,
//   TDeleteTagForATodoRes,
//   TGetAllTodoArgs,
//   TGetAllTodoRes,
// } from "./todo-tags.types";

// export const todoApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createTodoTag: builder.mutation<TCreateTodoTagRes, TCreateTodoTagArgs>({
//       query: ({ body }) => ({
//         url: `v1/api/todo/tags`,
//         method: "POST",
//         body,
//       }),

//       invalidatesTags: ["getAllTodoTags"],
//     }),

//     createTagForATodo: builder.mutation<
//       TCreateTagForATodoRes,
//       TCreateTagForATodoArgs
//     >({
//       query: ({ body }) => ({
//         url: `v1/api/todo/{id}/tags`,
//         method: "POST",
//         body,
//       }),

//       invalidatesTags: ["getAllTodoTags"],
//     }),

//     getAllTodoTags: builder.query<TGetAllTodoRes, TGetAllTodoArgs>({
//       query: (args) => {
//         const { queryString } = generateQueryString(args);
//         return {
//           url: `v1/api/todo/tags${queryString}`,
//           method: "GET",
//           body: args,
//         };
//       },
//       providesTags: ["getAllTodoTags"],
//     }),

//     // getATodo: builder.query<TGetATodoRes, TGetATodoArgs>({
//     //   query: ({ id }) => {
//     //     return {
//     //       url: `v1/api/todo/${Number(id ?? -1)}`,
//     //       method: "GET",
//     //     };
//     //   },
//     //   providesTags: (result, error, arg) => [
//     //     { type: "getATodo", id: Number(arg?.id ?? -1) },
//     //   ],
//     // }),

//     // updateTodo: builder.mutation<TUpdateATodoRes, TUpdateATodoArgs>({
//     //   query: ({ id, body }) => ({
//     //     url: `v1/api/todo/${Number(id ?? -1)}`,
//     //     method: "PUT",
//     //     body,
//     //   }),
//     //   invalidatesTags: (result, error, arg) => [
//     //     "getAllTodo",
//     //     { type: "getATodo", id: Number(arg?.id ?? -1) },
//     //   ],
//     // }),

//     deleteTodoTag: builder.mutation<TDeleteATodoTagRes, TDeleteATodoTagArgs>({
//       query: ({ id }) => ({
//         url: `v1/api/todo/tags/${Number(id ?? -1)}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, arg) => ["getAllTodoTags"],
//     }),

//     deleteTagForATodo: builder.mutation<
//       TDeleteTagForATodoRes,
//       TDeleteTagForATodoArgs
//     >({
//       query: ({ todoId, tagId }) => ({
//         url: `v1/api/todo/${Number(todoId ?? -1)}/tags/{tag_id}${Number(tagId ?? -1)}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, arg) => ["getAllTodoTags"],
//     }),
//   }),
// });

// export const {
//   // for all tags
//   useCreateTodoTagMutation,
//   useGetAllTodoTagsQuery,
//   useDeleteTodoTagMutation,
//   // todo specific
//   useCreateTagForATodoMutation,
//   useDeleteTagForATodoMutation,
// } = todoApi;
