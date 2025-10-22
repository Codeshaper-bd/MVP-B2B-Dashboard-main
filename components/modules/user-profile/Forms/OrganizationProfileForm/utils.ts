import type { TManageOrganizationProfileFormData } from "./types";

export const initialState: TManageOrganizationProfileFormData = {
  name: "",
  email: "",
  phone: "",
  description: "",
  address: "",
  websiteUrl: "",
  dialCode: "",
  totalEmployees: 0,
  subscriptionPlan: "FREE",
  organizationLogo: [],
  isTaxEnabled: false,
  taxId: "",
  taxName: "",
  taxRate: undefined,
};
