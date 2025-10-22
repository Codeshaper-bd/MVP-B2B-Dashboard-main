import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PastEventsSection from "@/components/modules/event/past-events-sections";
import PageHeader from "@/components/partials/header/page-header";

function OrderHistory() {
  return (
    <div className="mt-6 space-y-6">
      <PageHeader title="Select Event" />
      <div className="my-6 flex w-full flex-col items-start md:flex-row">
        <div className="flex-none">
          <DynamicBreadcrumb className="lg:mb-0" />
        </div>
      </div>

      <PastEventsSection />
    </div>
  );
}

export default OrderHistory;
