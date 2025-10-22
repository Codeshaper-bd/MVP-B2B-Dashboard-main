import { clientEnv } from "@/config/client-config";

export const isDevelopment = clientEnv.NEXT_PUBLIC_NODE_ENV === "development";
