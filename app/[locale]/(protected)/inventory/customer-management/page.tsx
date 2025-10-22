import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import CustomerLookupTable from "./customer-lookup-table";
import PageTools from "./page-tools";

function CustomerManagement() {
  return (
    <>
      <PageHeader title="Customer Lookup" />
      <div className="my-6 flex w-full flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-none">
          <DynamicBreadcrumb className="mb-0 lg:mb-0" />
        </div>

        <div className="flex flex-1 flex-wrap gap-3 lg:justify-end">
          <PageTools />
        </div>
      </div>
      <div className="mt-6">
        <CustomerLookupTable />
      </div>
    </>
  );
}

export default CustomerManagement;
