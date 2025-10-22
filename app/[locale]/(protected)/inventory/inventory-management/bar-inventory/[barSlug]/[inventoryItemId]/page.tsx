import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import OverviewContent from "./components/overview-content";

function InventoryProductEditPage() {
  return (
    <div>
      <PageHeader title="Detail Product" />
      <DynamicBreadcrumb />
      <OverviewContent />
    </div>
  );
}

export default InventoryProductEditPage;
