import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import CampaignTopBar from "./components/campaign-top-bar";
import CreateScheduleForm from "./components/create-schedule-form";

function AiGeneratedCampaignPage() {
  return (
    <div>
      <div>
        <PageHeader
          title="A.I Generated Campaigns"
          description="By Fennec AI"
        />
      </div>

      <DynamicBreadcrumb />
      <CampaignTopBar />
      <CreateScheduleForm />
    </div>
  );
}

export default AiGeneratedCampaignPage;
