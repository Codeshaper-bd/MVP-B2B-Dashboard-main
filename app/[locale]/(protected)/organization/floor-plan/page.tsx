import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";
import ComingSoon from "@/components/templates/coming-soon";

function FloorPlanPage() {
  return (
    <div>
      <PageHeader title="Floor Plan" />
      <DynamicBreadcrumb />
      <ComingSoon />
    </div>
  );
}

export default FloorPlanPage;
