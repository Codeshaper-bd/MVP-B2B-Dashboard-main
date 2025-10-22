import { getSeoMeta } from "@/lib/get-seo-meta";
import PageHeader from "@/components/partials/header/page-header";

import ViewAnalytics from "./components/view-analytics";

export const metadata = getSeoMeta({ title: "Social Page" });

function EventCampaign() {
  return (
    <div>
      <PageHeader title="A.I Generated Campaigns" description="" />
      <ViewAnalytics />
    </div>
  );
}

export default EventCampaign;
