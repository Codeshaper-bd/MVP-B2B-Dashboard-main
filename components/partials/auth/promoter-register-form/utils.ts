import type { IPromoterRegisterForm } from "./types";

export const initialPromoterFormValues: Pick<
  IPromoterRegisterForm,
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "password"
  | "confirmPassword"
  | "invitationCode"
> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  invitationCode: "",
};
