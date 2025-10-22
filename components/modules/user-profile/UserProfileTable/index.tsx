"use client";
import DefaultTable from "@/components/partials/table/DefaultTable";

import { columns } from "./columns";

function UserProfileTable() {
  return (
    <DefaultTable data={[]} columns={columns}>
      <DefaultTable.Table />
    </DefaultTable>
  );
}

export default UserProfileTable;
