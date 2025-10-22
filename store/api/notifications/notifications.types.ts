import type {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type { useGetNotificationsQuery } from "./notifications-api";
import type { TMedia } from "../media/media.types";

export enum ENotificationType {
  STOCK = "STOCK",
  TODO = "TODO",
  EVENT = "EVENT",
  REFUND = "REFUND",
  FRIEND = "FRIEND",
}
export type TNotificationType = `${ENotificationType}`;

type TBaseNotification = {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
};

type TTodoNotification = TBaseNotification & {
  type: "TODO";
  metadata: {
    title: string;
    dueDate: string;
  };
};

type TEventNotification = TBaseNotification & {
  type: "EVENT";
  metadata: {
    name: string;
    dueDate: string;
  };
};

type TStockNotification = TBaseNotification & {
  type: "STOCK";
  metadata: {
    name: string;
    currentStock: number;
    message: string;
  };
};

type TRefundNotification = TBaseNotification & {
  type: "REFUND";
  metadata: {
    status: string;
    customerName: string;
    requestType: string;
    media: TMedia;
  };
};

export type TNotification =
  | TTodoNotification
  | TEventNotification
  | TStockNotification
  | TRefundNotification;

export type TFirebaseNotification = TNotification & { _id: string };

/**
|--------------------------------------------------
| Get All Notifications Start
|--------------------------------------------------
*/
export type TGetAllNotificationsArgs = TPaginationArgs<
  Record<string, unknown>,
  {
    isRead?: boolean;
    type?: TNotificationType;
  }
>;

export type TGetAllNotificationsInitialArgs = Exclude<
  TGetAllNotificationsArgs,
  void | undefined
>;

export type TGetAllNotificationsRes = TApiResponse<TNotification[]>;

export type TUseGetNotificationsQueryReturnType = ReturnType<
  typeof useGetNotificationsQuery
>;

/**
|--------------------------------------------------
| Get All Notifications End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Mark All Notifications as Read - Start
|--------------------------------------------------
*/
export type TMarkAllNotificationAsReadArgs = void;

export type TMarkAllNotificationAsReadRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Mark All Notifications as Read - End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
|  Mark A Notification as Read - Start
|--------------------------------------------------
*/

export type TMarkANotificationAsReadArgs = {
  notificationId: TIdOrSlugOrIdentifier<"id">["id"];
};

export type TMarkANotificationAsReadRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Mark A Notification as Read - End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update Fcm Token Start
|--------------------------------------------------
*/
export type TFcmToken = string | TNullish;
export type TUpdateUserFcmTokenArgs = Omit<
  TUpdateOptionalArgs<{
    fcmToken: TFcmToken;
  }>,
  "id"
>;

export type TUpdateUserFcmTokenRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Update Fcm Token End
|--------------------------------------------------
*/
