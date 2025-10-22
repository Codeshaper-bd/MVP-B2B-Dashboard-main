"use client";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function PaymentMethodSalesTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.TitleContainer className="p-6 text-lg font-semibold text-default-900">
        Sales by Payment Method
      </DefaultTable.TitleContainer>
      <DefaultTable.Table />
      <DefaultTable.Footer>
        <BasicPagination />
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default PaymentMethodSalesTable;
