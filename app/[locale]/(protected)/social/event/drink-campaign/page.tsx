import BackButton from "@/components/Buttons/back-button";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import CreateScheduleForm from "./components/CreateScheduleForm";

function AiGeneratedCampaignPage() {
  return (
    <div>
      <PageHeader title="A.I Generated Campaigns" description="By Fennec AI" />
      <DynamicBreadcrumb />
      <BackButton />
      <div className="mt-6">
        <CreateScheduleForm />
      </div>
    </div>
  );
}

export default AiGeneratedCampaignPage;
