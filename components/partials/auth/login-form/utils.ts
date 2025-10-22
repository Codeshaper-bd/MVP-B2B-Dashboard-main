import type { TUserType } from "@/store/api/auth/auth.types";
import type { ICustomRadioLabelProps } from "@/components/CustomRadioGroup/Radio/Label";

export type TLoginForm = {
  emailOrPhone: string;
  password: string;
  userType: TUserType;
};

export const devInitialState: TLoginForm = {
  emailOrPhone: "admin.one@example.com",
  password: "Password123!",
  userType: "ADMIN",
};

export const prodInitialState: TLoginForm = {
  emailOrPhone: "",
  password: "",
  userType: "ADMIN",
};

export const initialState = prodInitialState;

type TOptions<T> = {
  label: string;
  value: T;
  radioProps: ICustomRadioLabelProps;
}[];
const radioProps: ICustomRadioLabelProps = {
  textSize: "16px",
  centerColor: "transparent",
  ringSize: "5px",
  mode: "label-right",
};

export const userOptions: TOptions<TUserType> = [
  { label: "Admin", value: "ADMIN", radioProps },
  { label: "Co-Admin", value: "EMPLOYEE", radioProps },
  { label: "Promoter", value: "PROMOTER", radioProps },
];
