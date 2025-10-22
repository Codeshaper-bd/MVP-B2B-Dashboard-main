import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import SalesContentTab from "./sales-content-tab";

function EventPage() {
  return (
    <div>
      <PageHeader title="Sales Report" />
      <DynamicBreadcrumb />
      <SalesContentTab />
    </div>
  );
}

export default EventPage;
