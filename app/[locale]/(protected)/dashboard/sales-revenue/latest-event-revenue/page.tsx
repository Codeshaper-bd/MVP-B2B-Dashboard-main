import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import LatestEventRevenueTable from "@/components/modules/sales-revenue/table/latest-event-revenue-table";
import PageHeader from "@/components/partials/header/page-header";
import SearchComponent from "@/components/ui/search-component";

function LatestEventPage() {
  return (
    <>
      <PageHeader title="Latest Event Revenue" />
      <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <DynamicBreadcrumb className="mb-0 lg:mb-0" />
        <div className="flex items-center gap-3">
          <BackButton />
          <SearchComponent className="max-w-[312px]" placeholder="Search" />
        </div>
      </div>
      <div>
        <LatestEventRevenueTable />
      </div>
    </>
  );
}

export default LatestEventPage;
