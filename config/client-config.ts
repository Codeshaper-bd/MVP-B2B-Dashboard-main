export const locales = ["en", "ar"] as const;

export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;

export const clientEnv = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  GOOGLE_MAP_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  firebase: {
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
} as const;

export const contentPerPageOptions = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  8: 8,
  9: 9,
  10: 10,
  12: 12,
  16: 16,
  initialPage: 1,
} as const;

export const placeholderImages = {
  500: "/assets/placeholders/placeholder-500.png",
  300: "/assets/placeholders/placeholder-300.png",
  100: "/assets/placeholders/placeholder-100.png",
} as const;
