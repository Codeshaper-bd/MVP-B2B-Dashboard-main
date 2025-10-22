import type { TInviteCustomerArgs } from "@/store/api/customer-lookup/customer-lookup.types";

export type TInviteCustomerFormInputs = TInviteCustomerArgs;

export const initialInviteCustomerFormValues: TInviteCustomerFormInputs = {
  name: "",
  email: "",
  phone: "",
};
