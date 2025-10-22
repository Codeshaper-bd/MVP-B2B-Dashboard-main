import CreateBarDialog from "@/app/[locale]/(protected)/organization/bars/components/modals/create-bar-dialog";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import BarCards from "./components/bar-cards";

function BarsPage() {
  return (
    <div>
      <PageHeader title="Bars" />
      <div className="flex flex-col lg:flex-row">
        <DynamicBreadcrumb className="flex-1 py-0 lg:mb-0" />
        <div className="flex-none">
          <CreateBarDialog />
        </div>
      </div>
      <BarCards />
    </div>
  );
}

export default BarsPage;
