import PageHeader from "@/components/partials/header/page-header";

import PageContent from "./components/page-content";
import PageTop from "./components/page-top";

function OrderHistoryPage() {
  return (
    <div className="mt-6 space-y-6">
      <PageHeader title="Order History" />
      <PageTop />
      <PageContent />
    </div>
  );
}

export default OrderHistoryPage;
