import { getFileUrl } from "@/lib/media/file-to-url";
import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TGetAllTransactionsArgs,
  TGetAllTransactionsRes,
  TGetATransactionsArgs,
  TGetATransactionsRes,
} from "./transactions.types";

export const TransactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<
      TGetAllTransactionsRes,
      TGetAllTransactionsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/transactions/organization/all${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAllTransactions"],
    }),
    getATransaction: builder.query<TGetATransactionsRes, TGetATransactionsArgs>(
      {
        query: ({ transactionId }) => ({
          url: `/api/v1/transactions/by-admin/${transactionId}`,
          method: "GET",
        }),

        providesTags: ["getATransaction"],
      },
    ),

    downloadInvoiceById: builder.query<string, string>({
      query: (transactionId) => ({
        url: `/api/v1/transactions/download-invoice-by-id/${transactionId}`,
        method: "GET",
        responseHandler: async (response) => {
          const blob = await response.blob();
          const { url } = getFileUrl({ file: blob });
          return url;
        },
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useLazyDownloadInvoiceByIdQuery,
  useGetATransactionQuery,
} = TransactionsApi;
