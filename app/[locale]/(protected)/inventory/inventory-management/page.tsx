import PageHeader from "@/components/partials/header/page-header";

import InventoryHeader from "./components/inventory-header";
import PageOverview from "./components/page-overview";

function InventoryPage() {
  return (
    <div>
      <PageHeader title="View Analytics" description="By Fennec AI" />

      <div className="container mt-5 w-full p-0 md:px-6">
        <InventoryHeader
          title="Inventory Management"
          image="/assets/product-3/inventory-management/banner.svg"
        />
        <PageOverview />
      </div>
    </div>
  );
}

export default InventoryPage;
