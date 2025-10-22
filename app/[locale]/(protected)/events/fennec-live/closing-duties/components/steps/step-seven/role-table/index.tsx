"use client";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";
import { data } from "./data";

function RoleTable() {
  return (
    <DefaultTable data={data} columns={columns}>
      <DefaultTable.TitleContainer>
        <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
          Role
        </DefaultTable.TitleContainer.Title>
      </DefaultTable.TitleContainer>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default RoleTable;
