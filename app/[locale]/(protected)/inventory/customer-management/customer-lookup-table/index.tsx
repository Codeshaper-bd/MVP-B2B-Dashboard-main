"use client";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function CustomerLookupTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.Table />
      <DefaultTable.Footer>
        <DefaultTable.Pagination />
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default CustomerLookupTable;
