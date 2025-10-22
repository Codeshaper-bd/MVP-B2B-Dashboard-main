"use client";

import type { TNullish, TPagination } from "@/store/api/common-api-types";
import type { TPromotersTicketSoldListData } from "@/store/api/promoter/promoter.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
interface IGuestTableProps {
  getTicketSoldListData: TNullish | TPromotersTicketSoldListData[];
  getTicketSoldListPagination: TPagination | undefined;
  getTicketSoldListApiState: IApiStateInfo;
}
function GuestTable({
  getTicketSoldListData,
  getTicketSoldListPagination,
  getTicketSoldListApiState,
}: IGuestTableProps) {
  return (
    <RenderData
      dataNotFoundSubtitle="No  ticket data found"
      expectedDataType="array"
      data={getTicketSoldListData}
      loadingSkeleton={<TableSkeleton length={5} />}
      {...getTicketSoldListApiState}
    >
      <DefaultTable data={getTicketSoldListData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getTicketSoldListApiState.isLoading ||
              getTicketSoldListApiState?.isFetching
            }
            totalPages={getTicketSoldListPagination?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default GuestTable;
