import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import DetailsTab from "./details-tab";

function DetailsCustomer() {
  return (
    <div>
      <PageHeader title="Create New Customers" />
      <DynamicBreadcrumb />
      <DetailsTab />
    </div>
  );
}

export default DetailsCustomer;
