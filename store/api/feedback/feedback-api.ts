import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateAFeedbackReplyArgs,
  TCreateAFeedbackReplyRes,
  TCreateFeedbackArgs,
  TCreateFeedbackRes,
  TDeleteAFeedbackArgs,
  TDeleteAFeedbackReplyArgs,
  TDeleteAFeedbackReplyRes,
  TDeleteAFeedbackRes,
  TGetAFeedbackArgs,
  TGetAFeedbackRes,
  TGetAllFeedbackArgs,
  TGetAllFeedbackRes,
  TGetFeedbackOverviewArgs,
  TGetFeedbackOverviewRes,
  TUpdateAFeedbackArgs,
  TUpdateAFeedbackReplyArgs,
  TUpdateAFeedbackReplyRes,
  TUpdateAFeedbackRes,
} from "./feedback.types";

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAFeedback: builder.mutation<TCreateFeedbackRes, TCreateFeedbackArgs>({
      query: (data) => ({
        url: "/api/v1/feedback",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllFeedback"],
    }),
    createAFeedbackReply: builder.mutation<
      TCreateAFeedbackReplyRes,
      TCreateAFeedbackReplyArgs
    >({
      query: (data) => ({
        url: "/api/v1/feedback/reply",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllFeedback"],
    }),

    getAllFeedback: builder.query<TGetAllFeedbackRes, TGetAllFeedbackArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/feedback${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllFeedback"],
    }),

    getAFeedback: builder.query<TGetAFeedbackRes, TGetAFeedbackArgs>({
      query: ({ id }) => ({
        url: `/api/v1/feedback/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAFeedback", id: arg?.id ?? -1 },
      ],
    }),
    getFeedBackOverview: builder.query<
      TGetFeedbackOverviewRes,
      TGetFeedbackOverviewArgs
    >({
      query: () => ({
        url: `/api/v1/feedback/overview`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "getAFeedback" }],
    }),

    updateAFeedback: builder.mutation<
      TUpdateAFeedbackRes,
      TUpdateAFeedbackArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/feedback/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllFeedback",
        { type: "getAFeedback", id: arg?.id ?? -1 },
      ],
    }),
    updateAFeedbackReply: builder.mutation<
      TUpdateAFeedbackReplyRes,
      TUpdateAFeedbackReplyArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/feedback/update/reply/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllFeedback",
        { type: "getAFeedback", id: arg?.id ?? -1 },
      ],
    }),

    deleteAFeedback: builder.mutation<
      TDeleteAFeedbackRes,
      TDeleteAFeedbackArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/discounts/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllFeedback",
        { type: "getAFeedback", id: arg?.id ?? -1 },
      ],
    }),
    deleteAFeedbackReply: builder.mutation<
      TDeleteAFeedbackReplyRes,
      TDeleteAFeedbackReplyArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/feedback/reply/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllFeedback",
        { type: "getAFeedback", id: arg?.id ?? -1 },
      ],
    }),
  }),
});

export const {
  useCreateAFeedbackMutation,
  useCreateAFeedbackReplyMutation,
  useGetAllFeedbackQuery,
  useGetAFeedbackQuery,
  useGetFeedBackOverviewQuery,
  useUpdateAFeedbackMutation,
  useUpdateAFeedbackReplyMutation,
  useDeleteAFeedbackMutation,
  useDeleteAFeedbackReplyMutation,
} = feedbackApi;
