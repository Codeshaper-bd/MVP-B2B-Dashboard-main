import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import OverviewContent from "./overview-content";

function ProductDetails() {
  return (
    <div>
      <PageHeader title="Product Detail" />
      <DynamicBreadcrumb />
      <OverviewContent />
    </div>
  );
}

export default ProductDetails;
