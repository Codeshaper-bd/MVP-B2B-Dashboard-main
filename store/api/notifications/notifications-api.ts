import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { updateFcmToken } from "@/store/features/auth";

import { apiSlice } from "..";
import type {
  TGetAllNotificationsArgs,
  TGetAllNotificationsInitialArgs,
  TGetAllNotificationsRes,
  TMarkAllNotificationAsReadArgs,
  TMarkAllNotificationAsReadRes,
  TMarkANotificationAsReadArgs,
  TMarkANotificationAsReadRes,
  TUpdateUserFcmTokenArgs,
  TUpdateUserFcmTokenRes,
} from "./notifications.types";
import { updateNotificationsCache } from "./utils/update-notification-cache";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      TGetAllNotificationsRes,
      TGetAllNotificationsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/notifications${queryString}`,
          method: "GET",
        };
      },
    }),

    getMoreNotifications: builder.query<
      TGetAllNotificationsRes,
      TGetAllNotificationsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/notifications${queryString}`,
          method: "GET",
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: getMoreNotificationsRes } = await queryFulfilled;
          const draftDataMutation = notificationsApi.util.updateQueryData(
            "getNotifications",
            { ...args, page: 1 },
            (draft) => {
              const { data, pagination } =
                updateNotificationsCache({
                  newApiResponseData: getMoreNotificationsRes?.data,
                  newApiPaginationData: getMoreNotificationsRes?.pagination,
                  dataUpdateMode: "merge-end",
                  paginationUpdateMode: "update-page",
                  draft,
                }) || {};
              if (draft?.data) {
                draft.data = data;
              }
              if (draft?.pagination) {
                draft.pagination = pagination;
              }
            },
          );
          dispatch(draftDataMutation);
        } catch (err) {
          console.error("getMoreNotifications error: ", err);
        }
      },
    }),

    getIntervalNotifications: builder.query<
      TGetAllNotificationsRes,
      TGetAllNotificationsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/api/v1/notifications${queryString}`,
          method: "GET",
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: getIntervalNotificationsRes } = await queryFulfilled;

          const draftDataMutation = notificationsApi.util.updateQueryData(
            "getNotifications",
            { ...args, page: 1 },
            (draft) => {
              const { data, pagination } =
                updateNotificationsCache({
                  newApiResponseData: getIntervalNotificationsRes?.data,
                  newApiPaginationData: getIntervalNotificationsRes?.pagination,
                  dataUpdateMode: "unique-merge-start",
                  paginationUpdateMode: "don't-update-page",
                  draft,
                }) || {};

              if (draft?.data) {
                draft.data = data;
              }
              if (draft?.pagination) {
                draft.pagination = pagination;
              }
            },
          );
          dispatch(draftDataMutation);
        } catch (err) {
          console.error("getMoreNotifications error: ", err);
        }
      },
    }),

    getAllNotifications: builder.infiniteQuery<
      TGetAllNotificationsRes,
      TGetAllNotificationsArgs,
      TGetAllNotificationsInitialArgs
    >({
      infiniteQueryOptions: {
        initialPageParam: {
          page: 1,
          pageSize: 10,
          isRead: false,
          type: undefined,
        },

        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPageParams,
        ) => {
          const nextPage = Number(lastPageParam?.page || 1) + 1;
          const remainingPages =
            Number(lastPage?.pagination?.totalPages || 1) - nextPage;

          if (remainingPages <= 0) {
            return undefined;
          }

          return {
            ...lastPageParam,
            page: nextPage,
          };
        },
      },

      query: ({ queryArg, pageParam }) => {
        const { queryString } = generateQueryString({
          ...(queryArg ?? {}),
          page: queryArg?.page || pageParam?.page,
          pageSize: queryArg?.pageSize || pageParam?.pageSize,
          isRead: queryArg?.isRead || pageParam?.isRead,
          type: queryArg?.type || pageParam?.type,
        });
        return `/api/v1/notifications${queryString}`;
      },
    }),

    updateMarkAllNotification: builder.mutation<
      TMarkAllNotificationAsReadRes,
      TMarkAllNotificationAsReadArgs
    >({
      query: () => ({
        url: `/api/v1/notifications/mark-all-read`,
        method: "PATCH",
      }),

      invalidatesTags: ["getAllNotifications"],
    }),

    updateMarkANotification: builder.mutation<
      TMarkANotificationAsReadRes,
      TMarkANotificationAsReadArgs
    >({
      query: () => ({
        url: `/api/v1/notifications/mark-read`,
        method: "PATCH",
      }),

      invalidatesTags: ["getAllNotifications"],
    }),

    updateFcmToken: builder.mutation<
      TUpdateUserFcmTokenRes,
      TUpdateUserFcmTokenArgs
    >({
      query: ({ body }) => ({
        url: `/api/v1/notifications/fcm-update`,
        method: "PATCH",
        body,
      }),

      async onQueryStarted({ body }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateFcmToken(body?.fcmToken));
        } catch (error) {
          console.error("updateFcmToken error: ", error);
        }
      },

      invalidatesTags: (result, error, arg) => ["getAuthenticatedUserProfile"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetMoreNotificationsQuery,
  useGetIntervalNotificationsQuery,
  useUpdateMarkAllNotificationMutation,
  useUpdateMarkANotificationMutation,
  useUpdateFcmTokenMutation,
  useGetAllNotificationsInfiniteQuery,
} = notificationsApi;
