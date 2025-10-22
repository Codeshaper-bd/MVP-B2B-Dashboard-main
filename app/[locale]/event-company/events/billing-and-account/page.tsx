import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./page-content";

export const metadata = getSeoMeta({ title: "Billing & Account" });

function BillingAndAccountPage() {
  return (
    <>
      <PageHeader title="Billing & Account" />
      <DynamicBreadcrumb />
      <PageContent />
    </>
  );
}

export default BillingAndAccountPage;
