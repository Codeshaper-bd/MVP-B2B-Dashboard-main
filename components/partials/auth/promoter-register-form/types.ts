import type { TPromoterRegisterArgs } from "@/store/api/auth/auth.types";

export interface IPromoterRegisterForm extends TPromoterRegisterArgs {
  confirmPassword: string;
  profilePicture: File | null;
}
