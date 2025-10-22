import { apiSlice } from "..";
import type {
  TGetAuthenticatedUserProfileArgs,
  TGetAuthenticatedUserProfileRes,
  TUpdateAuthenticatedUserProfileArgs,
  TUpdateAuthenticatedUserProfileRes,
  TVerifyUserPasswordArgs,
  TVerifyUserPasswordRes,
} from "./profile.types";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyUserPassword: builder.mutation<
      TVerifyUserPasswordRes,
      TVerifyUserPasswordArgs
    >({
      query: (data) => ({
        url: "/api/v1/profile/verify-password",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getAuthenticatedUserProfile"],
    }),

    getAuthenticatedUserProfile: builder.query<
      TGetAuthenticatedUserProfileRes,
      TGetAuthenticatedUserProfileArgs
    >({
      query: () => ({
        url: `/api/v1/profile/user`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => ["getAuthenticatedUserProfile"],
    }),

    updateAuthenticatedUserProfile: builder.mutation<
      TUpdateAuthenticatedUserProfileRes,
      TUpdateAuthenticatedUserProfileArgs
    >({
      query: ({ body }) => ({
        url: `/api/v1/profile/profile`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => ["getAuthenticatedUserProfile"],
    }),
  }),
});

export const {
  useVerifyUserPasswordMutation,
  useGetAuthenticatedUserProfileQuery,
  useUpdateAuthenticatedUserProfileMutation,
} = profileApi;
