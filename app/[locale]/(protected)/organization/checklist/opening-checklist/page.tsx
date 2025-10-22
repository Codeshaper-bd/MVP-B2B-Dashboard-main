import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import ChecklistHomeIcon from "@/components/icons/ChecklistHomeIcon";
import PageHeader from "@/components/partials/header/page-header";

import MainContent from "./components/main-content";

function OpeningChecklistPage() {
  return (
    <div>
      <PageHeader title="Opening Checklist" />
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <DynamicBreadcrumb
          starterIcon={
            <ChecklistHomeIcon className="size-5 text-default-600 hover:text-primary" />
          }
          className="mb-0 flex-1 lg:mb-0"
        />
        <div className="flex-none">
          <BackButton label="Back To Menu" />
        </div>
      </div>

      <h2 className="mb-3 text-base font-semibold text-foreground">Roles</h2>
      <MainContent />
    </div>
  );
}

export default OpeningChecklistPage;
