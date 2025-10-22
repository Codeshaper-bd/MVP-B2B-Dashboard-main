import type { TNullish } from "@/store/api/common-api-types";
import type { TUpdateAuthenticatedUserProfileArgsData } from "@/store/api/profile/profile.types";

export type TManageProfileInfoFormData = Omit<
  TUpdateAuthenticatedUserProfileArgsData,
  "media" | "token" | "type"
> & {
  media: File | TNullish;
  confirmPassword?: string;
  dialCode?: string;
};
