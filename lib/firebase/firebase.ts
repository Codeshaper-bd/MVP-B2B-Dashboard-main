import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getMessaging,
  onMessage,
  getToken,
  type Messaging,
  isSupported,
} from "firebase/messaging";

import { firebaseConfig } from "./config";

export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Messaging only on the client-side
let messaging: Messaging | null = null;

(async () => {
  if (typeof window === "undefined" || !window) {
    return;
  }

  try {
    const isMessagingSupported = await isSupported();
    if (!isMessagingSupported) {
      throw new Error("Firebase messaging is not supported in this browser.");
    }
    messaging = getMessaging(firebaseApp);
  } catch (error) {
    console.error("An error occurred while checking messaging support:", error);
  }
})();

// Initialize Realtime Database
export const db = getDatabase(firebaseApp);

// Export Firebase app, messaging utilities, and functions
export { messaging, getToken, onMessage };
