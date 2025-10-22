import { ref, update } from "firebase/database";
import { useEffect, useRef } from "react";

import { createDelay } from "@/lib/date-time/create-delay";
import { db } from "@/lib/firebase/firebase";
import type { TFirebaseNotification } from "@/store/api/notifications/notifications.types";
import { useToast } from "@/components/ui/use-toast";

const markAsRead = ({
  notificationId,
  userId,
}: {
  userId: number;
  notificationId: string;
}) => {
  const notificationRef = ref(db, `notifications/${userId}/${notificationId}`);
  update(notificationRef, { isRead: true });
};

type TUseNotificationToastProps = {
  notifications: TFirebaseNotification[];
  userId: number;
};

function useNotificationToast({
  notifications,
  userId,
}: TUseNotificationToastProps) {
  const { toast } = useToast();
  const shownIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    (async () => {
      for (let index = 0; index < (notifications?.length || 0); index++) {
        const notification = notifications?.[index];
        if (!notification || shownIds.current?.has(notification?.id)) {
          continue;
        }

        shownIds.current?.add(notification.id);
        await createDelay(400);
        toast({
          variant: "success",
          title: notification.title || "Notification",
          description: notification.body || "You have a new notifications.",
        });
        markAsRead({ userId, notificationId: notification?._id }); // 🔥 Mark as read after showing
      }
    })();
  }, [notifications, userId, toast]);
}

export default useNotificationToast;
