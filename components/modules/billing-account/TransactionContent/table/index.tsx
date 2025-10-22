"use client";
import type { TNullish, TPagination } from "@/store/api/common-api-types";
import type { TTransaction } from "@/store/api/transactions/transactions.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData, { type IApiStateInfo } from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
interface ITransactionHistoryTableProps {
  getAllTransactionsData: TTransaction[] | TNullish;
  getAllTransactionsPagination: TPagination | undefined;
  getAllTransactionsApiState: IApiStateInfo;
}
function TransactionHistoryTable({
  getAllTransactionsData,
  getAllTransactionsPagination,
  getAllTransactionsApiState,
}: ITransactionHistoryTableProps) {
  return (
    <RenderData
      data={getAllTransactionsData}
      expectedDataType="array"
      {...getAllTransactionsApiState}
      loadingSkeleton={<TableSkeleton />}
      dataNotFoundTitle="No transaction found"
      dataNotFoundDescription="There has been no transaction yet"
    >
      <DefaultTable data={getAllTransactionsData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getAllTransactionsApiState.isLoading ||
              getAllTransactionsApiState.isFetching
            }
            totalPages={getAllTransactionsPagination?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default TransactionHistoryTable;
