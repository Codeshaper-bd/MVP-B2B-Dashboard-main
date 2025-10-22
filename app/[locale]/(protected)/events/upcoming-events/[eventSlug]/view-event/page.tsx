import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./../components/page-content";

export default function EventDetails() {
  return (
    <div>
      <PageHeader title="Upcoming Events" />
      <div className="relative mb-6 w-full flex-col justify-between gap-3 md:flex md:flex-row md:items-center md:gap-0">
        <DynamicBreadcrumb className="md:mb-0 lg:mb-0" />
        <BackButton />
      </div>

      <PageContent />
    </div>
  );
}
