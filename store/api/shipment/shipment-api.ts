import { generateQueryString } from "@/lib/query-management/generate-query-string";

import { apiSlice } from "..";
import type {
  TCreateShipmentArgs,
  TCreateShipmentRes,
  TGetShipmentsArgs,
  TGetShipmentsRes,
} from "./shipment.types";

export const shipmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createShipment: builder.mutation<TCreateShipmentRes, TCreateShipmentArgs>({
      query: (data) => ({
        url: `/api/v1/shipment/adjust`,
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getShipment", "getAllInventoryItem"],
    }),

    getShipmentHistory: builder.query<TGetShipmentsRes, TGetShipmentsArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/shipment/history${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getShipment"],
    }),
  }),
});

export const { useCreateShipmentMutation, useGetShipmentHistoryQuery } =
  shipmentApi;
