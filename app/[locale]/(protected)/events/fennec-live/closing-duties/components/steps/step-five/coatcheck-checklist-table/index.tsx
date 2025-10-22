"use client";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function CoatcheckCheckListTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default CoatcheckCheckListTable;
