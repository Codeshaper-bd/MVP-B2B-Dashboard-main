import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./components/page-content";

function MyAccountsPage() {
  return (
    <div>
      <PageHeader
        title="Al Social Media Accounts"
        description="Connect your social media accounts to starts sharing your content"
      />
      <DynamicBreadcrumb />
      <PageContent />
    </div>
  );
}

export default MyAccountsPage;
