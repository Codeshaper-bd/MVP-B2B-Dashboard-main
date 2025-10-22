import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageTools from "./components/page-tools";
import ViewData from "./components/view-data";

function ViewHistoryPage() {
  return (
    <div>
      <PageHeader title="View History" />
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1">
          <DynamicBreadcrumb className="mb-0 lg:mb-0" />
        </div>
        <div className="flex-none">
          <PageTools />
        </div>
      </div>
      <ViewData />
    </div>
  );
}

export default ViewHistoryPage;
