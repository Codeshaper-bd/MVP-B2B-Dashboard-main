import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

import CurrentInventoryTable from "./components/current-inventory-table";
import InventoryHeader from "./components/inventory-header";
import InventoryPageTop from "./components/inventory-page-top";
import InventoryFilterValue from "./components/page-tools/InventoryFilterValue";

function CurrentInventoryPage() {
  return (
    <>
      <InventoryPageTop />
      <DynamicBreadcrumb />

      <InventoryHeader />
      <InventoryFilterValue />

      <div className="mt-6 space-y-6">
        <CurrentInventoryTable />
      </div>
    </>
  );
}

export default CurrentInventoryPage;
