import { type FirebaseOptions } from "firebase/app";

import { clientEnv } from "@/config/client-config";

export const firebaseConfig: FirebaseOptions = {
  apiKey: clientEnv.firebase.FIREBASE_API_KEY,
  authDomain: clientEnv.firebase.FIREBASE_AUTH_DOMAIN,
  databaseURL: clientEnv.firebase.FIREBASE_DATABASE_URL,
  projectId: clientEnv.firebase.FIREBASE_PROJECT_ID,
  storageBucket: clientEnv.firebase.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: clientEnv.firebase.FIREBASE_MESSAGING_SENDER_ID,
  appId: clientEnv.firebase.FIREBASE_APP_ID,
  measurementId: clientEnv.firebase.FIREBASE_MEASUREMENT_ID,
};
