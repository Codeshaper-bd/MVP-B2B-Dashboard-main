import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import CustomerDetailsPageContent from "./CustomerDetailsPageContent";

export const metadata = getSeoMeta({ title: "Customer List" });

function CustomerDetails() {
  return (
    <>
      <PageHeader title="Customer Details" />

      <DynamicBreadcrumb className="mb-0 w-fit lg:mb-0" />

      <CustomerDetailsPageContent />
    </>
  );
}

export default CustomerDetails;
