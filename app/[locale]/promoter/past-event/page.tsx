import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./page-content";

export const metadata = getSeoMeta({ title: "Past Events" });

function PastEventPage() {
  return (
    <div>
      <PageHeader
        title="Past Events"
        description="Manage your promotions and guest experiences"
      />
      <DynamicBreadcrumb />
      <PageContent />
    </div>
  );
}

export default PastEventPage;
