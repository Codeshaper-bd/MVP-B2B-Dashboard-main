import { apiSlice } from "..";
import type {
  TGetAStripePaymentStatusArgs,
  TGetAStripePaymentStatusRes,
} from "./stripe.types";

export const stripeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAStripePaymentStatus: builder.query<
      TGetAStripePaymentStatusRes,
      TGetAStripePaymentStatusArgs
    >({
      query: ({ id }) => ({
        url: `/api/v1/stripe/payment-intents/${id}/status`,
        method: "GET",
      }),

      providesTags: ["getAStripePaymentStatus"],
    }),
  }),
});

export const { useGetAStripePaymentStatusQuery } = stripeApi;
