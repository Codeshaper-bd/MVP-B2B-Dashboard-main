import { Users } from "lucide-react";

import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
// import AnalyticsPageTopBar from "@/components/modules/employees/analytics/AnalyticsPageTopBar";
// import EmployeeAnalyticsTable from "@/components/modules/employees/analytics/EmployeeAnalyticsTable";
import PageHeader from "@/components/partials/header/page-header";
import ComingSoon from "@/components/templates/coming-soon";

function viewEmploymentAnalytics() {
  return (
    <div>
      <PageHeader title="view Employment Analytics" />

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <DynamicBreadcrumb
          starterIcon={
            <Users className="size-5 text-default-600 hover:text-primary" />
          }
          className="mb-0 lg:mb-0"
        />

        {/* <AnalyticsPageTopBar /> */}
      </div>

      <div className="mt-7">
        {/* <EmployeeAnalyticsTable /> */}
        <ComingSoon />
      </div>
    </div>
  );
}

export default viewEmploymentAnalytics;
