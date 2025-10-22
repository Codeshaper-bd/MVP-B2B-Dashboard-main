import { getSeoMeta } from "@/lib/get-seo-meta";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

import BarPageHeader from "./bar-page-header";
import PageTools from "./components/page-tools";
import InventoryFilteredValue from "../../components/InventoryFilteredValue";
import StockInventoryTable from "../../components/stock-inventory-table";
export const metadata = getSeoMeta({ title: "Bar Inventory" });

function BarDetailsPage() {
  return (
    <>
      <BarPageHeader />
      <DynamicBreadcrumb />
      <div className="space-y-6">
        <PageTools />
        <InventoryFilteredValue />
        <StockInventoryTable />
      </div>
    </>
  );
}

export default BarDetailsPage;
