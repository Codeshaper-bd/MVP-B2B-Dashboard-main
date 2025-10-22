import React from "react";

import EmployeeCashoutSummaryTable from "./employee-cashout-summary-table";
import RoleTable from "./role-table";

function StepSeven() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex-1">
        <EmployeeCashoutSummaryTable />
      </div>
      <div className="w-auto lg:min-w-72 2xl:min-w-96">
        <RoleTable />
      </div>
    </div>
  );
}

export default StepSeven;
