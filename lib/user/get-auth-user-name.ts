import type { TNullish } from "@/store/api/common-api-types";

export type TGetAuthUserNameProps = {
  firstName?: string | TNullish;
  middleName?: string | TNullish;
  lastName?: string | TNullish;
  fullName?: string | TNullish;
  fallBackName?: string;
};
export type TGetAuthUserName = (props: TGetAuthUserNameProps) => string;

export const getAuthUserName: TGetAuthUserName = ({
  firstName,
  middleName,
  lastName,
  fullName,
  fallBackName = "",
}) => {
  if (fullName) {
    return fullName;
  }
  if (firstName && middleName && lastName) {
    return `${firstName} ${middleName} ${lastName}`;
  }
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName) {
    return firstName;
  }
  if (lastName) {
    return lastName;
  }
  return fallBackName;
};
