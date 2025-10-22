import type { TNullish } from "@/store/api/common-api-types";
import type { TUpdateOrganizationDetailsData } from "@/store/api/organization/organization.types";

export type TManageOrganizationProfileFormData = Omit<
  TUpdateOrganizationDetailsData,
  "token" | "media"
> & {
  dialCode?: string;
  totalEmployees?: number;
  organizationLogo?: File[] | TNullish;
};
