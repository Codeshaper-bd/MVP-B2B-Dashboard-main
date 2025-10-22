import type { TUserSubscriptionPlan } from "@/store/api/auth/auth.types";

export type TRegisterForm = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  orgName: string;
  dialCode: string;
  phone: string;
  agree: boolean;
  subscription: TUserSubscriptionPlan;
};
