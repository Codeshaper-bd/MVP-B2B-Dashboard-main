import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./components/page-content";

function ComparedContent() {
  return (
    <div>
      <PageHeader title="Update Inventory" />
      <DynamicBreadcrumb />
      <PageContent />
    </div>
  );
}

export default ComparedContent;
