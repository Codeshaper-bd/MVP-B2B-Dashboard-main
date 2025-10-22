import Link from "next/link";

import EventTime from "@/components/date-time/event-time";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import CustomerListTable from "@/components/modules/customers/tables/CustomerList";
import UpcomingEvents from "@/components/modules/dashboard/upcoming-events";
import HighlightedTodoList from "@/components/modules/todo/highlighted-todo-list";
import PageHeader from "@/components/partials/header/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DashboardTopCards from "./dashboard-top-cards";

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Event Company Overview" />

      <DynamicBreadcrumb />
      <EventTime hostEventLink="/en/event-company/events/host-event" />
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
          <div className="flex-none">
            <DashboardTopCards />
          </div>
          <div className="flex-1">
            <Card className="h-full">
              <CardHeader className="flex-row items-center md:pb-0">
                <CardTitle className="flex-1">
                  Customer Data Base Table
                </CardTitle>
                <Button asChild color="primary" className="flex-none">
                  <Link href="/en/event-company/customers/customer-lookup">
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <CustomerListTable
                  isHeaderShow={false}
                  tableClassName="rounded-none"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-12 space-y-6 lg:col-span-4">
          <HighlightedTodoList seeAllLink="/en/event-company/todo-list" />

          <UpcomingEvents seeAllHref="/en/event-company/events/upcoming-events" />
        </div>
      </div>
    </>
  );
}
