import { ref, onValue, type Unsubscribe } from "firebase/database";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebase/firebase";
import {
  type TNotification,
  type TFirebaseNotification,
} from "@/store/api/notifications/notifications.types";

export function useNotifications(userId: number) {
  const [notifications, setNotifications] = useState<TFirebaseNotification[]>(
    [],
  );

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    if (userId) {
      const notificationsRef = ref(db, `notifications/${userId}`);

      unsubscribe = onValue(notificationsRef, (snapshot) => {
        const data = (snapshot.val() ?? {}) as Record<string, TNotification>;

        const notificationList: TFirebaseNotification[] = [];
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const notification = { _id: key, ...(data?.[key] ?? {}) };
            if (!notification?.isRead) {
              notificationList.push(notification);
            }
          }
        }

        setNotifications(notificationList);
      });
    }

    // Clean up the listener when component unmounts
    return () => {
      unsubscribe?.();
    };
  }, [userId]);

  return { notifications };
}
