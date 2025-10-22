import { Fragment } from "react";

import { getSeoMeta } from "@/lib/get-seo-meta";
import EventListUpcomingContent from "@/components/modules/event/EventListUpcomingContent";
import PageHeader from "@/components/partials/header/page-header";

export const metadata = getSeoMeta({ title: "Upcoming Events" });
function UpcomingEvents() {
  return (
    <Fragment>
      <PageHeader title="Upcoming Events" />

      <EventListUpcomingContent />
    </Fragment>
  );
}

export default UpcomingEvents;
