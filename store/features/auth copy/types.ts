import type { TSigninData } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";

//
export type TApiTokenInfo =
  | Partial<
      Pick<
        TSigninData,
        "accessToken" | "refreshToken" | "accessExpiresAt" | "refreshExpiresAt"
      >
    >
  | TNullish;

export type TTokenData = Pick<
  TSigninData,
  "accessToken" | "refreshToken" | "accessExpiresAt" | "refreshExpiresAt"
>;

export type TAuthInfo = TSigninData;

export type TAuthState = {
  authInfo: TAuthInfo | TNullish;
};
