"use client";

import EmployeeFilters from "@/components/modules/employees/analytics/AnalyticsPageTopBar/employee-filters";
import SearchComponent from "@/components/ui/search-component";

function AnalyticsPageTopBar() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchComponent
        className="w-fit md:w-[360px]"
        placeholder="Search employee by name"
      />
      <EmployeeFilters />
    </div>
  );
}

export default AnalyticsPageTopBar;
