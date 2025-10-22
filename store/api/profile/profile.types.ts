import type { TUserType, TVerificationMethod } from "../auth/auth.types";
import type {
  TApiResponse,
  TNullish,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type {
  useUpdateAuthenticatedUserProfileMutation,
  useVerifyUserPasswordMutation,
} from "./profile-api";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Verify User Password Start
|--------------------------------------------------
*/
export type TVerifyUserPasswordArgs = {
  password: string;
};

export type TUserVerifiedData = {
  token: string;
  verifyUserExpiresAt: string;
};

export type TVerifyUserPasswordRes = TApiResponse<TUserVerifiedData>;

export type TVerifyUserPasswordMutation = ReturnType<
  typeof useVerifyUserPasswordMutation
>[0];

/**
|--------------------------------------------------
| Verify User Password End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Authenticated User Profile Start
|--------------------------------------------------
*/
export type TGetAuthenticatedUserProfileArgs = void;
export type TUserProfile = {
  id: 1;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  media: TMedia | null;
  type: TUserType;
  rememberToken: null;
  verificationMethod: TVerificationMethod;
  statusId: number;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
export type TGetAuthenticatedUserProfileRes = TApiResponse<TUserProfile>;
/**
|--------------------------------------------------
| Get LoAuthenticated User Profile End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update An User Profile Start
|--------------------------------------------------
*/
export type TUpdateAuthenticatedUserProfileArgsData = {
  token: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  type?: TUserType;
  media?: TLinkAMediaToAModuleArgs;
};
export type TUpdateAuthenticatedUserProfileArgs = Omit<
  TUpdateOptionalArgs<TUpdateAuthenticatedUserProfileArgsData, "id">,
  "id"
>;
export type TUpdateAnUserResData = Omit<
  TUpdateAuthenticatedUserProfileArgs,
  "media" | "token"
> & {
  media: TMedia | TNullish;
};

export type TUpdateAuthenticatedUserProfileRes =
  TApiResponse<TUpdateAnUserResData>;

export type TUpdateAuthenticatedUserProfileMutation = ReturnType<
  typeof useUpdateAuthenticatedUserProfileMutation
>[0];
/**
|--------------------------------------------------
| Update An User Profile End
|--------------------------------------------------
*/
