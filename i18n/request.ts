import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import type { locales } from "@/config/client-config";

import { routing } from "./routing";

type TLocale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing?.locales?.includes(locale as TLocale)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
