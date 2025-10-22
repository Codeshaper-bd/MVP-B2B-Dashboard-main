import { getSeoMeta } from "@/lib/get-seo-meta";
import PageHeader from "@/components/partials/header/page-header";

import CustomerPageContent from "./CustomerPageContent";

export const metadata = getSeoMeta({ title: "Customer List" });

function CustomerList() {
  return (
    <>
      <PageHeader title="Customer Lookup" />
      <CustomerPageContent />
    </>
  );
}

export default CustomerList;
