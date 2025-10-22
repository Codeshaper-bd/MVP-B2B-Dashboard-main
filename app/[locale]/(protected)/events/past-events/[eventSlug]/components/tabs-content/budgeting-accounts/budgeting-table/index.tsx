"use client";
import ExcelIcon from "@/components/icons/ExcelIcon";
import DefaultTable from "@/components/partials/table/DefaultTable";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { data } from "./data";

function BudgetingTable() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base md:text-xl">Event Payout</h3>
        <Button color="secondary" size="lg">
          <a
            className="flex items-center gap-3"
            href="/files/event.csv"
            download="event.csv"
            target="_blank"
          >
            <ExcelIcon className="size-5" /> Download
          </a>
        </Button>
      </div>

      <DefaultTable data={data} columns={columns}>
        <DefaultTable.Table />
      </DefaultTable>
    </div>
  );
}

export default BudgetingTable;
