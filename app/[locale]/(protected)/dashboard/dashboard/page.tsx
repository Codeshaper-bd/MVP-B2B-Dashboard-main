import { getSeoMeta } from "@/lib/get-seo-meta";
import EventTime from "@/components/date-time/event-time";
import BoothBox from "@/components/modules/dashboard/booth-box";
import UpcomingEvents from "@/components/modules/dashboard/upcoming-events";
import HighlightedTodoList from "@/components/modules/todo/highlighted-todo-list";
import PageHeader from "@/components/partials/header/page-header";

import DashboardTopCards from "./dashboard-top-cards";
export const metadata = getSeoMeta({ title: "Dashboard" });

function Dashboard() {
  return (
    <div>
      <PageHeader title="Reporting Overview" />
      <EventTime hostEventLink="/en/events/host-event" />
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
          <div className="flex-none">
            <DashboardTopCards />
          </div>
          <div className="flex-1">
            <BoothBox />
          </div>
        </div>

        <div className="col-span-12 space-y-6 lg:col-span-4">
          <HighlightedTodoList seeAllLink="/en/dashboard/todo-list" />

          <UpcomingEvents seeAllHref="/en/events/upcoming-events" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
