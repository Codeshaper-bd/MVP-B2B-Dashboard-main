import { apiSlice } from "..";
import type {
  TSendAnOtpArgs,
  TSendAnOtpRes,
  TVerifyAnOtpArgs,
  TVerifyAnOtpRes,
} from "./otp.types";

export const otpApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendAnOtp: builder.mutation<TSendAnOtpRes, TSendAnOtpArgs>({
      query: ({ body }) => ({
        url: `/api/v1/otp/send`,
        method: "POST",
        body,
      }),
    }),

    verifyAnOtp: builder.mutation<TVerifyAnOtpRes, TVerifyAnOtpArgs>({
      query: ({ body }) => ({
        url: `/api/v1/otp/verify`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendAnOtpMutation, useVerifyAnOtpMutation } = otpApi;
