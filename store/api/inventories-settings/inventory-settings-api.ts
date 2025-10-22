import { apiSlice } from "..";
import type {
  TCreateInventorySettingsArgs,
  TCreateInventorySettingsRes,
  TGetAInventorySettingsNotificationArgs,
  TGetAInventorySettingsNotificationRes,
} from "./inventory-settings.types";

export const inventoriesSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createANotificationSettings: builder.mutation<
      TCreateInventorySettingsRes,
      TCreateInventorySettingsArgs
    >({
      query: (data) => ({
        url: "/api/v1/inventory-settings/notifications-settings",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["getANotificationSettings"],
    }),

    getANotificationSettings: builder.query<
      TGetAInventorySettingsNotificationRes,
      TGetAInventorySettingsNotificationArgs
    >({
      query: () => ({
        url: `/api/v1/inventory-settings/notifications-settings`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "getANotificationSettings" },
      ],
    }),
  }),
});

export const {
  useCreateANotificationSettingsMutation,
  useGetANotificationSettingsQuery,
} = inventoriesSettingsApi;
