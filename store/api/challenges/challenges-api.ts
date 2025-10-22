import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateChallengeArgs,
  TCreateChallengeRes,
  TDeleteAChallengeArgs,
  TDeleteAChallengeRes,
  TGetAChallengeActiveEventsArgs,
  TGetAChallengeActiveEventsRes,
  TGetAChallengeArgs,
  TGetAChallengeRes,
  TGetAllChallengeArgs,
  TGetAllChallengeRes,
  TGetRevenueByChallengesArgs,
  TGetRevenueByChallengesRes,
  TGetTopChallengesArgs,
  TGetTopChallengesRes,
  TGetTotalEngagementOfChallengeArgs,
  TGetTotalEngagementOfChallengeRes,
  TUpdateAChallengeArgs,
  TUpdateAChallengeRes,
} from "./challenges.types";

export const challengesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAChallenge: builder.mutation<
      TCreateChallengeRes,
      TCreateChallengeArgs
    >({
      query: (data) => ({
        url: "/api/v1/challenges",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAllChallenge", "getAllEvent", "getAnEvent"],
    }),

    getAllChallenge: builder.query<TGetAllChallengeRes, TGetAllChallengeArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/challenges${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllChallenge"],
    }),

    getAChallenge: builder.query<TGetAChallengeRes, TGetAChallengeArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/challenges/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getAChallenge", id: arg?.slug ?? "-1" },
      ],
    }),

    updateAChallenge: builder.mutation<
      TUpdateAChallengeRes,
      TUpdateAChallengeArgs
    >({
      query: ({ slug, body }) => ({
        url: `/api/v1/challenges/${slug}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllChallenge",
        { type: "getAChallenge", id: arg?.slug ?? "-1" },
        "getAllEvent",
        "getAnEvent",
        "getAChallengeActiveEvents",
      ],
    }),

    deleteAChallenge: builder.mutation<
      TDeleteAChallengeRes,
      TDeleteAChallengeArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/challenges/${slug}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllChallenge",
        { type: "getAChallenge", id: arg?.slug ?? "-1" },
        "getAllEvent",
        "getAnEvent",
      ],
    }),
    //  Challenges Overview Api endpoints
    getRevenueByChallenges: builder.query<
      TGetRevenueByChallengesRes,
      TGetRevenueByChallengesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/challenges/revenue-generated-by-challenge${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getRevenueByChallenges"],
    }),
    getTopChallenges: builder.query<
      TGetTopChallengesRes,
      TGetTopChallengesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/challenges/top-challenges${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getTopChallenges"],
    }),
    getTotalEngagementOfChallenge: builder.query<
      TGetTotalEngagementOfChallengeRes,
      TGetTotalEngagementOfChallengeArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/challenges/total-engagement-of-challenge${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getTotalEngagementByChallenges"],
    }),
    getAChallengeActiveEvents: builder.query<
      TGetAChallengeActiveEventsRes,
      TGetAChallengeActiveEventsArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/challenges/${slug}/active-events`,
        method: "GET",
      }),

      providesTags: ["getAChallengeActiveEvents"],
    }),
  }),
});

export const {
  useCreateAChallengeMutation,
  useGetAllChallengeQuery,
  useGetAChallengeQuery,
  useUpdateAChallengeMutation,
  useDeleteAChallengeMutation,
  useGetRevenueByChallengesQuery,
  useGetTopChallengesQuery,
  useGetTotalEngagementOfChallengeQuery,
  useGetAChallengeActiveEventsQuery,
  useLazyGetAChallengeActiveEventsQuery,
} = challengesApi;
