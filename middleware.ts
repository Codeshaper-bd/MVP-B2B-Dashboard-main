import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { locales } from "./config/client-config";
import { compareDateTimes } from "./lib/date-time/compare-date-times";
import { getRedirectPath } from "./lib/user/getRedirectPath";
import type { TUser } from "./store/api/auth/auth.types";
import type { TTokenData } from "./store/features/auth/types";

const publicPages: string[] = [
  "/en",
  "/en/",
  "/en/auth/forgot-password",
  "/en/auth/otp-verification",
  "/en/auth/password-reset",
  "/en/auth/register",
  "/en/auth/fennec-admin-register",
  "/en/auth/resend-otp",
  "/en/auth/reset-password-success",
  "/en/auth/set-new-password",
  "/en/auth/promoter-register",
];

type TAuthTokens =
  | {
      name: "authTokens";
      value: string | undefined;
    }
  | undefined;

export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const authTokens = cookies.get("authTokens") as TAuthTokens;
  const userInfo = cookies.get("userInfo");

  let tokenInfo: TTokenData | undefined;
  try {
    tokenInfo =
      typeof authTokens?.value === "string"
        ? JSON.parse(authTokens?.value)
        : undefined;
  } catch (error) {
    console.error("Error parsing authTokens cookie: ", error);
    console.error("Deleting authTokens cookie due to parsing error.");
    cookies.delete("authTokens");
  }

  const isRefreshTokenExpired =
    !tokenInfo ||
    !tokenInfo?.refreshToken ||
    !tokenInfo?.refreshExpiresAt ||
    compareDateTimes({
      providedDateTime: tokenInfo?.refreshExpiresAt,
    })?.status !== "after";

  const path = request?.nextUrl?.pathname?.replace(/\/+$/, "");
  const isPublicPage =
    typeof path === "string" ? publicPages.includes(path) : false;

  if (!isRefreshTokenExpired && isPublicPage) {
    // Parse user info to determine role-based redirect
    let userInfoParsed: TUser | undefined;
    try {
      userInfoParsed =
        typeof userInfo?.value === "string"
          ? JSON.parse(userInfo.value)
          : undefined;
    } catch (error) {
      console.error("Error parsing userInfo cookie: ", error);
    }

    // Determine redirect path based on user role
    const redirectPath = getRedirectPath(userInfoParsed);

    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (isRefreshTokenExpired && !isPublicPage) {
    cookies.delete("authTokens");
    cookies.delete("userInfo");
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // Step 1: Use the incoming request (example)
  const defaultLocale = (request.headers.get("dashcode-locale") ||
    "en") as (typeof locales)[number];

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  response.headers.set("dashcode-locale", defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
