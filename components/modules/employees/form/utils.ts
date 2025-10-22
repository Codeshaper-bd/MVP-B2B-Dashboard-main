import {
  isEventCompanyAdminOrCoAdmin,
  isNightClubAdminOrCoAdmin,
} from "@/lib/user/checkAuth";
import type { TUser } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";
import type { TCreateEmployeeArgs } from "@/store/api/employees/employees.types";
import type { TRole } from "@/store/api/roles/roles.types";
export type TRoleOptions = {
  label: string;
  value: number;
};
export type TEmployeeForm = Omit<TCreateEmployeeArgs, "media" | "roles"> & {
  image?: File | TNullish;
  roles: TRoleOptions[];
  isEdit?: boolean;
};

export const initialEmployeeFormValues: TEmployeeForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: undefined,
  password: "",
  confirmPassword: "",
  image: null,
  roles: [],
  isEdit: false,
};

interface IGetRolesOptionsBasedOnUser {
  getAllRolesData: TNullish | TRole[];
  loggedInUser: TNullish | TUser;
}
const getOptions = (roles: TNullish | TRole[]): TRoleOptions[] =>
  roles?.map((role) => ({
    label: role.name,
    value: role.id,
  })) || [];

export function getRolesOptionsBasedOnUser({
  getAllRolesData,
  loggedInUser,
}: IGetRolesOptionsBasedOnUser) {
  let filteredRoles = getAllRolesData;
  if (isNightClubAdminOrCoAdmin(loggedInUser)) {
    filteredRoles = getAllRolesData?.filter((role) => role.name !== "Admin");
  }
  if (isEventCompanyAdminOrCoAdmin(loggedInUser)) {
    filteredRoles = getAllRolesData?.filter(
      (role) => role.slug === "co-admin" || role.slug === "guestlist",
    );
  }
  return getOptions(filteredRoles);
}
