import { getFileUrl } from "@/lib/media/file-to-url";

import { apiSlice } from "..";
import type {
  TGetAuthenticatedUserOrganizationDetailsArgs,
  TGetAuthenticatedUserOrganizationDetailsRes,
  TGetOrganizationQrCodeArgs,
  TGetOrganizationQrCodeRes,
  TUpdateOrganizationDetailsArgs,
  TUpdateOrganizationRes,
} from "./organization.types";

export const organizationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthenticatedUserOrganizationDetails: builder.query<
      TGetAuthenticatedUserOrganizationDetailsRes,
      TGetAuthenticatedUserOrganizationDetailsArgs
    >({
      query: () => ({
        url: `/api/v1/organization/user`,
        method: "GET",
      }),

      providesTags: (result, error, arg) => [
        "getAuthenticatedUserOrganizationDetails",
      ],
    }),

    updateOrganization: builder.mutation<
      TUpdateOrganizationRes,
      TUpdateOrganizationDetailsArgs
    >({
      query: ({ body }) => ({
        url: `/api/v1/organization`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result, error, arg) => [
        "getAuthenticatedUserOrganizationDetails",
      ],
    }),
    getOrganizationQrCode: builder.query<
      TGetOrganizationQrCodeRes,
      TGetOrganizationQrCodeArgs
    >({
      query: () => ({
        url: `/api/v1/organization/qr`,
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
  useUpdateOrganizationMutation,
  useGetAuthenticatedUserOrganizationDetailsQuery,
  useGetOrganizationQrCodeQuery,
} = organizationApi;
