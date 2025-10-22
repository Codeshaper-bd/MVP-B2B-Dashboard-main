"use client";

import { memo } from "react";

import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function TimeActivitySummaryTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.Table />

      <DefaultTable.Footer>
        <BasicPagination
          isLoading={false}
          totalPages={1}
          hideForTotalPagesOne
        />
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default memo(TimeActivitySummaryTable);
