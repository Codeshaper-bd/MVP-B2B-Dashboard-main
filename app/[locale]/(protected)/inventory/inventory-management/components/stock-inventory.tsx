import React from "react";

import InventoryServices from "./inventory-services";
import QuickLinksCardList from "./quick-links-cards/QuickLinksCardList";

function StockInventory() {
  return (
    <div>
      <div className="my-6">
        <QuickLinksCardList />
      </div>
      <div className="mb-8 mt-16 flex w-full items-center justify-between gap-2">
        <h3 className="text-2xl font-semibold leading-10 text-white">
          Services
        </h3>
      </div>

      <InventoryServices />
    </div>
  );
}

export default StockInventory;
