import { getSeoMeta } from "@/lib/get-seo-meta";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./page-content";

export const metadata = getSeoMeta({ title: "Upcoming Events" });

function OrganizationPage() {
  return (
    <div>
      <PageHeader
        title="Events"
        description="Manage your promotions and guest experiences"
      />
      <PageContent />
    </div>
  );
}

export default OrganizationPage;
