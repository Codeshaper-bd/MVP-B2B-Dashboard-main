import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import DetailsEvent from "@/components/modules/event/DetailsEvent";
import PageHeader from "@/components/partials/header/page-header";

export default function EventDetails() {
  return (
    <div>
      <PageHeader title="Upcoming Events" />
      <div className="relative my-4 w-full flex-col justify-between gap-3 md:flex md:flex-row md:items-center md:gap-0">
        <DynamicBreadcrumb className="md:mb-0 lg:mb-0" />
        <BackButton />
      </div>
      <DetailsEvent />
    </div>
  );
}
