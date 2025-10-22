import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PastEventFennecLiveContent from "./PastEventFennecLiveContent";

function PastEventLivePage() {
  return (
    <div>
      <PageHeader title="Past Event Day" />
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <DynamicBreadcrumb className="!mb-0" />
        <div>
          <BackButton />
        </div>
      </div>

      <PastEventFennecLiveContent />
    </div>
  );
}

export default PastEventLivePage;
