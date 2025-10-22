import { getSeoMeta } from "@/lib/get-seo-meta";

import GuestListTable from "./components/GuestListTable";

export const metadata = getSeoMeta({ title: "Event Details" });

function EventDetailsPage() {
  return (
    <div className="mt-10">
      <GuestListTable />
    </div>
  );
}

export default EventDetailsPage;
