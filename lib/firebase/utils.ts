import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

import type { TRootState } from "@/store";
import type { TNullish } from "@/store/api/common-api-types";
import { notificationsApi } from "@/store/api/notifications/notifications-api";

import { getToken, messaging } from "./firebase";

const getFCMToken = async (): Promise<string | null> => {
  try {
    if (!messaging || typeof window === "undefined" || !window) {
      throw new Error("❌ Firebase messaging object not available.");
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      throw new Error("❌ Notification permission not granted.");
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
    );
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!currentToken) {
      throw new Error("❌ Failed to get currentToken.");
    }

    return currentToken;
  } catch (error) {
    console.error("🔥 Error getting FCM token:", error);
    return null;
  }
};

type TUpdateFcmToken = (props: {
  serverFcmToken: string | TNullish;
  dispatch: ThunkDispatch<TRootState, void, UnknownAction>;
}) => Promise<void>;

export const updateFcmToken: TUpdateFcmToken = async ({
  serverFcmToken,
  dispatch,
}) => {
  try {
    if (serverFcmToken) {
      return;
    }

    const fcmToken = await getFCMToken();
    if (!fcmToken) {
      throw new Error(
        "❌ FCM token is nullish. It is not possible to update FCM token.",
      );
    }

    const updateFcmTokenThunkAction =
      notificationsApi?.endpoints?.updateFcmToken?.initiate({
        body: { fcmToken },
      });
    const updateFcmTokenRes = await dispatch(
      updateFcmTokenThunkAction,
    ).unwrap();

    if (!updateFcmTokenRes?.success) {
      throw new Error(
        updateFcmTokenRes?.message || "Failed to update FCM token.",
      );
    }
  } catch (error) {
    console.error("🔥 Error updating FCM token:", error);
  }
};
