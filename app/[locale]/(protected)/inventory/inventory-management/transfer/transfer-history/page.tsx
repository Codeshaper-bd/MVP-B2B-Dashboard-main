import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import TransferHistoryPageContent from "./TransferHistoryPageContent";

function TransferHistory() {
  return (
    <div>
      <PageHeader title="Transfer History" />
      <DynamicBreadcrumb />
      <TransferHistoryPageContent />
    </div>
  );
}

export default TransferHistory;
