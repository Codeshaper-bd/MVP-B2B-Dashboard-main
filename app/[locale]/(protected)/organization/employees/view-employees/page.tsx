import { Users } from "lucide-react";

import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import EmployeeFiltersValue from "@/components/modules/employees/EmployeeFiltersValue";
import EmployeePageTopBar from "@/components/modules/employees/EmployeePageTopBar";
import EmployeesList from "@/components/modules/employees/EmployeesList";
import PageHeader from "@/components/partials/header/page-header";

function ViewEmployees() {
  return (
    <div>
      <PageHeader title="Employees" />

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <DynamicBreadcrumb
          starterIcon={
            <Users className="size-5 text-default-600 hover:text-primary" />
          }
          className="mb-0 lg:mb-0"
        />

        <EmployeePageTopBar />
      </div>
      <EmployeeFiltersValue />

      <div className="mt-7">
        <EmployeesList />
      </div>
    </div>
  );
}

export default ViewEmployees;
