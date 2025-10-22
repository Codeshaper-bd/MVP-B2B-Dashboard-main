import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import ChecklistHomeIcon from "@/components/icons/ChecklistHomeIcon";
import PageHeader from "@/components/partials/header/page-header";

import ChecklistTable from "./components/checklist-table";
import PageToolbar from "./components/page-toolbar";

function ChecklistHistoryPage() {
  return (
    <div>
      <PageHeader title="Checklist History" />
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <DynamicBreadcrumb
          starterIcon={
            <ChecklistHomeIcon className="size-5 text-default-600 hover:text-primary" />
          }
          className="mb-0 lg:mb-0"
        />
        <PageToolbar />
      </div>
      <ChecklistTable />
    </div>
  );
}

export default ChecklistHistoryPage;
