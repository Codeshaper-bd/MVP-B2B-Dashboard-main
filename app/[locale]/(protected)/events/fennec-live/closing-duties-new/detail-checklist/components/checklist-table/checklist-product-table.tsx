import React from "react";

import CurrentInventoryTable from "./current-inventory-table";
import TableHeader from "./table-header";

function ChecklistProductTable() {
  return (
    <div className="space-y-4">
      <TableHeader />
      <CurrentInventoryTable />
    </div>
  );
}

export default ChecklistProductTable;
