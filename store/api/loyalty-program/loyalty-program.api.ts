import { apiSlice } from "..";
import type {
  TAddLoyaltyProgramPointsArgs,
  TAddLoyaltyProgramPointsRes,
  TCreateLoyaltyProgramArgs,
  TCreateLoyaltyProgramRes,
  TGetLoyaltyProgramArgs,
  TGetLoyaltyProgramRes,
} from "./loyalty-program.types";

export const loyaltyProgramApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createALoyaltyProgram: builder.mutation<
      TCreateLoyaltyProgramRes,
      TCreateLoyaltyProgramArgs
    >({
      query: (data) => ({
        url: "/api/v1/loyalty-program/store",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getALoyaltyProgram"],
    }),

    getALoyaltyProgram: builder.query<
      TGetLoyaltyProgramRes,
      TGetLoyaltyProgramArgs
    >({
      query: () => ({
        url: `/api/v1/loyalty-program`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "getALoyaltyProgram" }],
    }),
    createLoyaltyProgramPoints: builder.mutation<
      TAddLoyaltyProgramPointsRes,
      TAddLoyaltyProgramPointsArgs
    >({
      query: (data) => ({
        url: "/api/v1/loyalty-program/add-points",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["createLoyaltyProgramPoints"],
    }),
  }),
});

export const {
  useCreateALoyaltyProgramMutation,
  useGetALoyaltyProgramQuery,
  useCreateLoyaltyProgramPointsMutation,
} = loyaltyProgramApi;
