import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import NotificationForm from "./components/notification-form";

function NotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notification Management"
        description="Manage notifications and configure"
      />
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <DynamicBreadcrumb className="lg:mb-0" />
        </div>
        <div className="max-w-[120px] flex-none">
          <BackButton />
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-5">
          <p className="mb-2 text-base font-semibold text-default-1000">
            Par Level Alert Notifications
          </p>
          <p className="text-base text-default-700">
            Receive timely alerts when inventory levels exceed or fall below
            your set thresholds, ensuring seamless stock management.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <Card className="p-6">
            <NotificationForm />
          </Card>
        </div>
      </div>
      <Separator className="my-6" />
    </>
  );
}

export default NotificationsPage;
