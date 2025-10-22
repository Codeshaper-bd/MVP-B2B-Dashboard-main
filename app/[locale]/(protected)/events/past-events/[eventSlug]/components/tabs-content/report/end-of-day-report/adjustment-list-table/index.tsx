"use client";

import { memo } from "react";

import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function AdjustmentListTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.Table />
      <div className="space-y-4 border-t border-default-100 px-6 py-[18px]">
        <p>
          SUB TOTAL NON PRODUCT DISCOUNT:
          <span className="ms-1 text-primary">-</span>
        </p>
        <p>
          SUB TOTAL (ITEM DISCOUNT):<span className="ms-1 text-primary">-</span>
        </p>
        <p>
          SUB TOTAL (PENNY ROUNDING):
          <span className="ms-1 text-primary">-</span>
        </p>
        <p>
          GRAND TOTAL: <span className="ms-1 text-primary">-</span>
        </p>
      </div>
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

export default memo(AdjustmentListTable);
