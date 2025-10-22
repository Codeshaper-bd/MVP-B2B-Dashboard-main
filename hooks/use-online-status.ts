import {
  ref,
  onValue,
  onDisconnect,
  set,
  getDatabase,
} from "firebase/database";
import { useEffect } from "react";

import { firebaseApp } from "@/lib/firebase/firebase";

export const useUserOnlineStatus = (
  userId: number | string | null | undefined,
) => {
  useEffect(() => {
    if (!userId) {
      return;
    }

    const db = getDatabase(firebaseApp);
    const userStatusRef = ref(db, `/users/${userId}/status`);
    const connectedRef = ref(db, ".info/connected");

    let isConnected = false;

    const handleVisibilityChange = () => {
      if (!isConnected) {
        return;
      }
      if (document.visibilityState === "hidden") {
        set(userStatusRef, "away");
      } else {
        set(userStatusRef, "online");
      }
    };

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      const connected = snapshot.val();
      if (connected) {
        isConnected = true;
        set(userStatusRef, "online");
        onDisconnect(userStatusRef).set("offline");
      }
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      unsubscribe();
    };
  }, [userId]);
};
