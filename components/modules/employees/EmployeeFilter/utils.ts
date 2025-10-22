import type { TEmployeeStatus } from "@/store/api/employees/employees.types";

export type TRoleOptions = {
  label: string;
  value: number;
};
export interface IEmployeeFilters {
  roles: TRoleOptions[];
  status?: TEmployeeStatus;
}
