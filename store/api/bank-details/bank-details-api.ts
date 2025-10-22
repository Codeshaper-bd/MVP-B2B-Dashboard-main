import { apiSlice } from "..";
import type {
  TCreateBankDetailsArgs,
  TCreateBankDetailsRes,
  TGetABankDetailsArgs,
  TGetABankDetailsRes,
  TGetAllBankDetailsArgs,
  TGetAllBankDetailsRes,
  TUpdateBankDetailsArgs,
  TUpdateBankDetailsRes,
} from "./bank-details.types";

export const bankDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBankDetails: builder.mutation<
      TCreateBankDetailsRes,
      TCreateBankDetailsArgs
    >({
      query: (data) => ({
        url: "/api/v1/profile/bank-details",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => {
        if (result?.success) {
          return ["getAllBankDetails", "getABankDetails"];
        }
        return [];
      },
    }),

    getAllBankDetails: builder.query<
      TGetAllBankDetailsRes,
      TGetAllBankDetailsArgs
    >({
      query: () => ({
        url: "/api/v1/profile/bank-details",
        method: "GET",
      }),

      providesTags: ["getAllBankDetails"],
    }),

    getABankDetails: builder.query<TGetABankDetailsRes, TGetABankDetailsArgs>({
      query: ({ id }) => ({
        url: `/api/v1/profile/bank-details/${id}`,
        method: "GET",
      }),

      providesTags: ["getABankDetails"],
    }),

    updateBankDetails: builder.mutation<
      TUpdateBankDetailsRes,
      TUpdateBankDetailsArgs
    >({
      query: ({ id, body }) => ({
        url: `/api/v1/profile/bank-details/update/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => {
        if (result?.success) {
          return ["getAllBankDetails", "getABankDetails"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateBankDetailsMutation,
  useGetAllBankDetailsQuery,
  useGetABankDetailsQuery,
  useUpdateBankDetailsMutation,
} = bankDetailsApi;
