import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import HomeIcon from "@/components/icons/HomeIcon";
import PageHeader from "@/components/partials/header/page-header";

import PromoterEventDetails from "../../components/PromoterEventDetails";

function EventDetails() {
  return (
    <div>
      <PageHeader
        title="Detail Events"
        description="Manage your promotions and guest experiences"
      />
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <DynamicBreadcrumb
          starterIcon={
            <HomeIcon className="size-5 text-default-600 hover:text-primary" />
          }
          className="mb-0 flex-1 lg:mb-0"
        />
        <div className="flex-none">
          <BackButton label="Back" />
        </div>
      </div>
      <PromoterEventDetails />
    </div>
  );
}

export default EventDetails;
