import { Fragment } from "react";

import { getSeoMeta } from "@/lib/get-seo-meta";
import EventListPastContent from "@/components/modules/event/EventListPastContent";
import PageHeader from "@/components/partials/header/page-header";

export const metadata = getSeoMeta({ title: "Past Events" });

function PastEventsPage() {
  return (
    <Fragment>
      <PageHeader title="Past Events" />
      <EventListPastContent />
    </Fragment>
  );
}

export default PastEventsPage;
