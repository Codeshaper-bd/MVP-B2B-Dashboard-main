import Cookies from "js-cookie";

import { updateFcmToken } from "@/lib/firebase/utils";
import { hasValidAccess } from "@/lib/user/checkAuth";
import { login, logout } from "@/store/features/auth";
import type { TApiTokenInfo } from "@/store/features/auth/types";

import { apiSlice } from "..";
import type {
  TAdminSignUpArgs,
  TAdminSignUpRes,
  TPromoterRegisterArgs,
  TPromoterRegisterRes,
  TRequestPasswordResetArgs,
  TRequestPasswordResetRes,
  TResetPasswordArgs,
  TResetPasswordRes,
  TSigninArgs,
  TSigninRes,
  TSignoutArgs,
  TSignoutRes,
  TVerifyPasswordResetOtpArgs,
  TVerifyPasswordResetOtpRes,
  TVerifyPhoneNumberArgs,
  TVerifyPhoneNumberRes,
} from "./auth.types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminSignUp: builder.mutation<TAdminSignUpRes, TAdminSignUpArgs>({
      query: (data) => ({
        url: "/api/v1/auth/signup/admin",
        method: "POST",
        body: data,
      }),
    }),

    verifyPhoneNumber: builder.mutation<
      TVerifyPhoneNumberRes,
      TVerifyPhoneNumberArgs
    >({
      query: (data) => ({
        url: "/api/v1/auth/verify-phone-number",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(registerArgs, { dispatch, queryFulfilled }) {
        try {
          const loginRes = await queryFulfilled;
          const loginData = loginRes?.data?.data;
          const tokenInfo: TApiTokenInfo = {
            accessToken: loginData?.accessToken,
            refreshToken: loginData?.refreshToken,
            accessExpiresAt: loginData?.accessExpiresAt,
            refreshExpiresAt: loginData?.refreshExpiresAt,
          };

          if (!tokenInfo || !hasValidAccess(loginData?.user)) {
            return;
          }
          Cookies.set("authTokens", JSON.stringify(tokenInfo));
          Cookies.set("userInfo", JSON.stringify(loginData?.user));
          dispatch(login(loginData));
          await updateFcmToken({
            serverFcmToken: loginData?.user?.fcmToken,
            dispatch,
          });
        } catch (error) {
          console.error("verifyPhoneNumber error: ", error);
        }
      },
    }),

    signin: builder.mutation<TSigninRes, TSigninArgs>({
      query: (data) => ({
        url: "/api/v1/auth/signin",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(registerArgs, { dispatch, queryFulfilled }) {
        try {
          const loginRes = await queryFulfilled;
          const loginData = loginRes?.data?.data;
          const tokenInfo: TApiTokenInfo = {
            accessToken: loginData?.accessToken,
            refreshToken: loginData?.refreshToken,
            accessExpiresAt: loginData?.accessExpiresAt,
            refreshExpiresAt: loginData?.refreshExpiresAt,
          };

          if (!tokenInfo) {
            return;
          }

          if (!hasValidAccess(loginData?.user)) {
            return;
          }
          Cookies.set("authTokens", JSON.stringify(tokenInfo));
          Cookies.set("userInfo", JSON.stringify(loginData?.user));
          dispatch(login(loginData));
          await updateFcmToken({
            serverFcmToken: loginData?.user?.fcmToken,
            dispatch,
          });
        } catch (error) {
          console.error("login error", error);
        }
      },
    }),

    userSignout: builder.mutation<TSignoutRes, TSignoutArgs>({
      query: (data) => ({
        url: "/api/v1/auth/signout",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        const { dispatch, queryFulfilled } = api;

        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(apiSlice?.util?.resetApiState());
        } catch (error) {
          console.error("Failed to signout", error);
        }
      },
    }),

    requestPasswordReset: builder.mutation<
      TRequestPasswordResetRes,
      TRequestPasswordResetArgs
    >({
      query: (data) => ({
        url: "/api/v1/auth/request-password-reset",
        method: "POST",
        body: data,
      }),
    }),

    verifyPasswordResetOtp: builder.mutation<
      TVerifyPasswordResetOtpRes,
      TVerifyPasswordResetOtpArgs
    >({
      query: (data) => ({
        url: "/api/v1/auth/verify-password-reset-otp",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<TResetPasswordRes, TResetPasswordArgs>({
      query: (data) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    // promoter register
    promoterRegister: builder.mutation<
      TPromoterRegisterRes,
      TPromoterRegisterArgs | FormData
    >({
      query: (data) => ({
        url: "/api/v1/auth/create/promoter",
        method: "POST",
        body: data,
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...(data instanceof FormData && {
          prepareHeaders: (headers: Headers) => {
            headers.delete("Content-Type");
            return headers;
          },
        }),
      }),
    }),
  }),
});

export const {
  useAdminSignUpMutation,
  useVerifyPhoneNumberMutation,
  useSigninMutation,
  useUserSignoutMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetOtpMutation,
  useResetPasswordMutation,
  usePromoterRegisterMutation,
} = authApi;
