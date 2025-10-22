import type { TSubscriptionPlan } from "../auth/auth.types";
import type {
  TApiResponse,
  TNullish,
  TUpdateOptionalArgs,
} from "../common-api-types";
import type { useUpdateOrganizationMutation } from "./organization-api";
import type { TLinkAMediaToAModuleArgs, TMedia } from "../media/media.types";

/**
|--------------------------------------------------
| Get Authenticated User Organization Details Start
|--------------------------------------------------
*/
export type TGetAuthenticatedUserOrganizationDetailsArgs = void;

export type TAuthenticatedUserOrganizationDetails = {
  id: number;
  organizationOwnerId: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  websiteUrl: string;
  code: string | TNullish;
  subscriptionPlan: TSubscriptionPlan;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  totalEmployee: number;
  media: TMedia | TNullish;
  isTaxEnabled: boolean | TNullish;
  taxId: string | TNullish;
  taxName: string | TNullish;
  taxRate: number | TNullish;
};

export type TGetAuthenticatedUserOrganizationDetailsRes =
  TApiResponse<TAuthenticatedUserOrganizationDetails>;
/**
|--------------------------------------------------
| Get Authenticated User Organization Details End
|--------------------------------------------------
*/

/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Update Organization Start
|--------------------------------------------------
*/

export type TUpdateOrganizationDetailsData = {
  name: string;
  email: string;
  subscriptionPlan: TSubscriptionPlan;
  phone: string;
  description: string;
  address: string;
  token: string;
  websiteUrl: string;
  code?: string | TNullish;
  media?: TLinkAMediaToAModuleArgs;
  isTaxEnabled?: boolean;
  taxId?: string | TNullish;
  taxName?: string | TNullish;
  taxRate?: number | TNullish;
};
export type TUpdateOrganizationDetailsArgs = Omit<
  TUpdateOptionalArgs<TUpdateOrganizationDetailsData, "id">,
  "id"
>;
export type TOrganization = {
  id: number;
  organizationOwnerId: number;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  websiteUrl: string;
  subscriptionPlan: TSubscriptionPlan;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  totalEmployee: number;
};

export type TUpdateOrganizationRes = TApiResponse<TOrganization>;

export type TUpdateOrganizationMutation = ReturnType<
  typeof useUpdateOrganizationMutation
>[0];
/**
|--------------------------------------------------
| Update Organization End
|--------------------------------------------------
*/
/* ******************************************************************************************************************************************************************************************** */

/**
|--------------------------------------------------
| Get Organization Qr Code Start
|--------------------------------------------------
*/
export type TGetOrganizationQrCodeArgs = void;
export type TGetOrganizationQrCodeRes = string;

/**
|--------------------------------------------------
| Get Organization Qr Code End
|--------------------------------------------------
*/
