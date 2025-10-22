"use client";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function ChecklistTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.Table />
      {/* <DefaultTable.Footer>
        <DefaultTable.Pagination />
      </DefaultTable.Footer> */}
    </DefaultTable>
  );
}

export default ChecklistTable;
