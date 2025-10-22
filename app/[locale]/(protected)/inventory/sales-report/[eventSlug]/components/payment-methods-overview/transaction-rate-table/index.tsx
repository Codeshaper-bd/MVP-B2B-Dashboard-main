"use client";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function TransactionRateTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.TitleContainer className="p-6 text-lg font-semibold text-default-900">
        Transaction Success Rate
      </DefaultTable.TitleContainer>
      <DefaultTable.Table />
      {/* <DefaultTable.Footer>
        <DefaultTable.Pagination />
      </DefaultTable.Footer> */}
    </DefaultTable>
  );
}

export default TransactionRateTable;
