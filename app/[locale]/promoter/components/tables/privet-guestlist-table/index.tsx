"use client";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";

import { columns } from "./columns";

function PrivateGuestListTable() {
  return (
    <RenderData expectedDataType="array" data={[]} isLoading={false}>
      <DefaultTable data={[]} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={false}
            totalPages={1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default PrivateGuestListTable;
