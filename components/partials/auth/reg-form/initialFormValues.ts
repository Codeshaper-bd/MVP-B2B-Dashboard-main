import type { TRegisterForm } from "./types";

export const initialFormValues: TRegisterForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  orgName: "",
  dialCode: "",
  phone: "",
  agree: false,
  subscription: "NIGHT_CLUB",
};
