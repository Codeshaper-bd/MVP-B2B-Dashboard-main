import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import EmployeeAnalyticsContent from "./EmployeeAnalyticsContent";

function EmployeeDetails() {
  return (
    <div>
      <PageHeader title="View Employment Analytics" />
      <div className="flex flex-col lg:flex-row lg:items-center">
        <DynamicBreadcrumb className="lg:mb-0" />
        <div className="flex items-center gap-3">
          <BackButton />
        </div>
      </div>
      <div className="mt-6">
        <EmployeeAnalyticsContent />
      </div>
    </div>
  );
}

export default EmployeeDetails;
