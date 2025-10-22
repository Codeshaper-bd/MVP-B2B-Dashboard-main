"use client";

import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function CurrentInventoryTable() {
  return (
    <DefaultTable data={data} columns={columns} className="rounded-none">
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default CurrentInventoryTable;
