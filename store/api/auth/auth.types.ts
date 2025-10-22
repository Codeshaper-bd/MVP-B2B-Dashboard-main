import type { TApiResponse, TNullish } from "../common-api-types";
import type {
  useAdminSignUpMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useSigninMutation,
  useUserSignoutMutation,
  useVerifyPasswordResetOtpMutation,
  useVerifyPhoneNumberMutation,
} from "./auth-api";
import type { TMedia } from "../media/media.types";

export enum EUserType {
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  ADMIN = "ADMIN",
  PROMOTER = "PROMOTER",
}

export type TUserType = `${EUserType}`;

export enum EVerificationMethod {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
}

export type TVerificationMethod = `${EVerificationMethod}`;

export enum EGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  NOT_SPECIFIED = "NOT_SPECIFIED",
}

export type TGender = `${EGender}`;

export enum ESubscriptionPlan {
  FREE = "FREE",
  BASIC = "BASIC",
  ADVANCE = "ADVANCE",
  CUSTOM = "CUSTOM",
}

export type TSubscriptionPlan = `${ESubscriptionPlan}`;

export enum EUserSubscriptionPlan {
  EVENT_COMPANY = "EVENT_COMPANY",
  NIGHT_CLUB = "NIGHT_CLUB",
}

export type TUserSubscriptionPlan = `${EUserSubscriptionPlan}`;

/**
|--------------------------------------------------
| Admin SignUp Start
|--------------------------------------------------
*/
export type TAdminSignUpArgs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
  subscription: TUserSubscriptionPlan;
};

export type TAdminSignUpRes = TApiResponse<null>;
export type TAdminSignUpMutation = ReturnType<typeof useAdminSignUpMutation>[0];

/**
|--------------------------------------------------
| Admin SignUp End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Verify PhoneNumber Start
|--------------------------------------------------
*/
export type TVerifyPhoneNumberArgs = {
  phone: string;
  otp: string;
};

export type TVerifyPhoneNumberRes = TApiResponse<TSigninData>;

export type TVerifyPhoneNumberMutation = ReturnType<
  typeof useVerifyPhoneNumberMutation
>[0];

/**
|--------------------------------------------------
| Verify PhoneNumber End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Signin Start
|--------------------------------------------------
*/
export type TSigninArgs = {
  identifier: string;
  password: string;
  userType?: TUserType;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: TUserType;
  avatar: TMedia | TNullish;
  fcmToken: string | TNullish;
  roles: TUserRole[];
  organizationId: number | TNullish;
  subscriptionPlan: TUserSubscriptionPlan | TNullish;
};

export type TSigninData = {
  message: string | TNullish;
  accessToken: string | TNullish;
  accessExpiresAt: string | TNullish;
  refreshToken: string | TNullish;
  refreshExpiresAt: string | TNullish;
  user: TUser | TNullish;
};

export type TSigninRes = TApiResponse<TSigninData>;
export type TSigninMutation = ReturnType<typeof useSigninMutation>[0];

/**
|--------------------------------------------------
| Signin End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Signout Start
|--------------------------------------------------
*/

export type TSignoutArgs = {
  refreshToken: string;
};

export type TSignoutRes = TApiResponse<null>;

export type TUserSignoutMutation = ReturnType<typeof useUserSignoutMutation>[0];

// access_token_expire_time: 3600
// refresh_token_expire_time: 604800

/**
|--------------------------------------------------
| Signout End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Auth Refresh Token Start
|--------------------------------------------------
*/
export type TRefreshTokenArgs = {
  refreshToken: string;
};

export type TRefreshTokenData = {
  accessToken: string | TNullish;
  accessExpiresAt: string | TNullish;
};

export type TRefreshTokenRes = TApiResponse<TRefreshTokenData>;

/**
|--------------------------------------------------
| Auth Refresh Token End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Reset Password Start
|--------------------------------------------------
*/

export type TRequestPasswordResetArgs = {
  phone: string;
};

export type TRequestPasswordResetRes = TApiResponse<null>;
export type TRequestPasswordResetMutation = ReturnType<
  typeof useRequestPasswordResetMutation
>[0];

/**
|--------------------------------------------------
| Reset Password End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Verify Password Reset Otp Start
|--------------------------------------------------
*/

export type TVerifyPasswordResetOtpArgs = {
  phone: string;
  otp: string;
};

export type TVerifyPasswordResetOtpData = {
  token: string;
};

export type TVerifyPasswordResetOtpRes =
  TApiResponse<TVerifyPasswordResetOtpData>;

export type TVerifyPasswordResetOtpMutation = ReturnType<
  typeof useVerifyPasswordResetOtpMutation
>[0];

/**
|--------------------------------------------------
| Verify Password Reset Otp End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Reset Password Start 
|--------------------------------------------------
*/

export type TResetPasswordArgs = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};
export type TResetPasswordRes = TApiResponse<null>;
export type TResetPasswordMutation = ReturnType<
  typeof useResetPasswordMutation
>[0];

/**
|--------------------------------------------------
| Reset Password End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Promoter Register Start
|--------------------------------------------------
*/

export type TPromoterRegisterArgs = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  invitationCode: string;
  avatar?: File | TNullish;
};

export enum EUserRole {
  ADMIN = "Admin",
  COADMIN = "CoAdmin",
}

export type TUserRoles = `${EUserRole}`;

export type TUserRole = {
  id: number;
  name: TUserRoles;
  slug: string;
};

export type TPromoterUser = Pick<
  TUser,
  "id" | "email" | "phone" | "firstName" | "lastName"
> & {
  media: TMedia[] | TNullish;
  roles: TUserRole[] | TNullish;
};

export type TAuthTokens = {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: string;
  refreshExpiresAt: string;
};

export type TPromoterRegisterData = {
  user: TPromoterUser;
} & TAuthTokens;

export type TPromoterRegisterRes = TApiResponse<TPromoterRegisterData>;

/**
|--------------------------------------------------
| Promoter Register End
|--------------------------------------------------
*/
