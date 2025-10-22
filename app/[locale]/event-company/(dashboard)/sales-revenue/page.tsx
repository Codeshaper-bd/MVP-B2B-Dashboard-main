import { getSeoMeta } from "@/lib/get-seo-meta";
import SalesRevenueTopBar from "@/components/modules/sales-revenue/sales-revenue-topbar";
import SalesRevenueFilterProvider from "@/components/modules/sales-revenue/SalesRevenueFilterContext";
import PageHeader from "@/components/partials/header/page-header";

import SalesRevenueContent from "./components/sales-revenue-content";

export const metadata = getSeoMeta({ title: "Sales Revenue" });

function SalesRevenuePage() {
  return (
    <>
      <PageHeader title="Sales Revenue" />
      <SalesRevenueFilterProvider>
        <SalesRevenueTopBar />

        <SalesRevenueContent />
      </SalesRevenueFilterProvider>
    </>
  );
}

export default SalesRevenuePage;
