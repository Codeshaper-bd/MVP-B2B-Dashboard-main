import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PastEventsSection from "@/components/modules/event/past-events-sections";
import PageHeader from "@/components/partials/header/page-header";

function SalesReports() {
  return (
    <div>
      <PageHeader title="Sales Report" />
      <DynamicBreadcrumb className="lg:mb-0" />
      <div className="h-6"></div>
      <PastEventsSection />
    </div>
  );
}

export default SalesReports;
