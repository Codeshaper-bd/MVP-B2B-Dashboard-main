import BasicPagination from "@/components/pagination/basic-pagination";

import CurrentInventoryTable from "./current-inventory-table";
import PreEventInventoryTable from "./pre-event-inventory-table";

function ComparedTables() {
  return (
    <div className="rounded-lg border border-default-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h2 className="border-e border-border p-4 text-lg font-semibold text-default-900">
            Current
          </h2>
          <CurrentInventoryTable />
        </div>
        <div>
          <h2 className="p-4 text-lg font-semibold text-default-900">
            Current
          </h2>
          <PreEventInventoryTable />
        </div>
      </div>
      <div className="p-4">
        <BasicPagination />
      </div>
    </div>
  );
}

export default ComparedTables;
