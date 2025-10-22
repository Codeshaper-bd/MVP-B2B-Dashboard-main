import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";
import PageHeader from "@/components/partials/header/page-header";

import BarInventoryWrapper from "./components/bar-inventory-wrapper";

function BarInventory() {
  return (
    <>
      <PageHeader
        title="Bar Inventories"
        description="Welcome back, Sophia Williams!"
      />
      <DynamicBreadcrumb />
      <BarInventoryWrapper />
    </>
  );
}

export default BarInventory;
