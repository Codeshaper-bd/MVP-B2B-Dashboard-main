"use client";

import EmployeeFilter from "@/components/modules/employees/EmployeeFilter";
import CreateEmployeeDialog from "@/components/modules/employees/modals/CreateEmployeeDialog";
import SearchComponent from "@/components/ui/search-component";

function EmployeePageTopBar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchComponent className="max-w-[312px]" placeholder="Search" />
      <EmployeeFilter />
      <CreateEmployeeDialog />
    </div>
  );
}

export default EmployeePageTopBar;
