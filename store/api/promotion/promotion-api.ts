import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreatePromotionArgs,
  TCreatePromotionRes,
  TDeleteAPromotionArgs,
  TDeleteAPromotionRes,
  TGetAPromotionActiveEventsArgs,
  TGetAPromotionActiveEventsRes,
  TGetAPromotionArgs,
  TGetAPromotionRes,
  TGetAllPromotionsArgs,
  TGetAllPromotionsRes,
  TGetMonthlyPromotionRevenueArgs,
  TGetMonthlyPromotionRevenueRes,
  TGetTopPromotionArgs,
  TGetTopPromotionsRes,
  TGetTotalEngagementOfPromotionArgs,
  TGetTotalEngagementOfPromotionRes,
  TUpdateAPromotionArgs,
  TUpdateAPromotionRes,
} from "./promotion.types";

export const promotionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAPromotion: builder.mutation<
      TCreatePromotionRes,
      TCreatePromotionArgs
    >({
      query: (data) => ({
        url: "/api/v1/promotions",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [
        "getAllPromotion",
        // "getAllEvent", "getAnEvent"
      ],
    }),

    getAllPromotion: builder.query<TGetAllPromotionsRes, TGetAllPromotionsArgs>(
      {
        query: (args) => {
          const { queryString } = generateQueryString(args);
          return {
            url: `/api/v1/promotions${queryString}`,
            method: "GET",
          };
        },

        providesTags: ["getAllPromotion"],
      },
    ),

    getAPromotion: builder.query<TGetAPromotionRes, TGetAPromotionArgs>({
      query: ({ slug }) => ({
        url: `/api/v1/promotions/${slug ?? "-1"}`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        { type: "getAPromotion", id: arg?.slug ?? "-1" },
      ],
    }),

    updateAPromotion: builder.mutation<
      TUpdateAPromotionRes,
      TUpdateAPromotionArgs
    >({
      query: ({ slug, body }) => ({
        url: `/api/v1/promotions/${slug ?? "-1"}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllPromotion",
        { type: "getAPromotion", id: arg?.slug ?? "-1" },
        "getAPromotionActiveEvents",
        // "getAllEvent",
        // "getAnEvent",
      ],
    }),

    deleteAPromotion: builder.mutation<
      TDeleteAPromotionRes,
      TDeleteAPromotionArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/promotions/${slug ?? "-1"}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, arg) => [
        "getAllPromotion",
        { type: "getAPromotion", id: arg?.slug ?? "-1" },
        // "getAllEvent",
        // "getAnEvent",
      ],
    }),
    getTopPromotions: builder.query<TGetTopPromotionsRes, TGetTopPromotionArgs>(
      {
        query: (args) => {
          const { queryString } = generateQueryString(args);
          return {
            url: `/api/v1/promotions/top-promotions${queryString}`,
            method: "GET",
          };
        },

        providesTags: ["getTopPromotions"],
      },
    ),
    getTotalEngagementOfPromotion: builder.query<
      TGetTotalEngagementOfPromotionRes,
      TGetTotalEngagementOfPromotionArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promotions/total-engagement-of-promotion${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getTotalEngagementByPromotions"],
    }),
    getMonthlyPromotionRevenue: builder.query<
      TGetMonthlyPromotionRevenueRes,
      TGetMonthlyPromotionRevenueArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/promotions/revenue-generated-by-promotion${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getMonthlyPromotionRevenue"],
    }),
    getAPromotionActiveEvents: builder.query<
      TGetAPromotionActiveEventsRes,
      TGetAPromotionActiveEventsArgs
    >({
      query: ({ slug }) => ({
        url: `/api/v1/promotions/${slug}/active-events`,
        method: "GET",
      }),

      providesTags: ["getAPromotionActiveEvents"],
    }),
  }),
});

export const {
  useCreateAPromotionMutation,
  useGetAllPromotionQuery,
  useGetAPromotionQuery,
  useUpdateAPromotionMutation,
  useDeleteAPromotionMutation,
  useGetTopPromotionsQuery,
  useGetTotalEngagementOfPromotionQuery,
  useGetMonthlyPromotionRevenueQuery,
  useGetAPromotionActiveEventsQuery,
  useLazyGetAPromotionActiveEventsQuery,
} = promotionApi;
