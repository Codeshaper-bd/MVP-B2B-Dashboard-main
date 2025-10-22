"use client";

import { memo } from "react";

import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function SalesReportTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.Table />

      <DefaultTable.Footer>
        <div className="px-6 py-4 font-medium text-default-900">
          TOTAL SALES FOR THE DAY:
          <span className="ms-2.5 text-primary">$7231.01</span>
        </div>
        <BasicPagination
          isLoading={false}
          totalPages={1}
          hideForTotalPagesOne
        />
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default memo(SalesReportTable);
