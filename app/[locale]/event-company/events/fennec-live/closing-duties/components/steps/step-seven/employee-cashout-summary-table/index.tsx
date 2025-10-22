"use client";
import EditPenIcon from "@/components/icons/EditPenIcon";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function EmployeeCashoutSummaryTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.TitleContainer>
        <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
          Cashout Sumary
        </DefaultTable.TitleContainer.Title>
        <div>
          <EditPenIcon className="size-5" />
        </div>
      </DefaultTable.TitleContainer>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default EmployeeCashoutSummaryTable;
