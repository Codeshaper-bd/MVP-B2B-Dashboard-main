import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllTransactionsQuery } from "@/store/api/transactions/transactions-api";
import type { TGetAllTransactionsArgs } from "@/store/api/transactions/transactions.types";
import SearchComponent from "@/components/ui/search-component";

import TransactionHistoryTable from "./table";
import TransactionsFilter from "./TransactionsFilter";
import TransactionsFilterValue from "./TransactionsFilterValue";

function TransactionsContent() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllTransactionsArgs, void>>();

  const queryParams = getAllParamValue();
  const { data: getAllTransactionsRes, ...getAllTransactionsApiState } =
    useGetAllTransactionsQuery({
      ...queryParams,
    });
  const getAllTransactionsData = getAllTransactionsRes?.data;
  const getAllTransactionsPagination = getAllTransactionsRes?.pagination;
  return (
    <div className="mt-4 lg:-mt-11">
      <div className="mb-4 flex gap-2 lg:justify-end">
        <SearchComponent className="max-w-[312px]" placeholder="Search" />
        <TransactionsFilter />
      </div>
      <TransactionsFilterValue />
      <TransactionHistoryTable
        getAllTransactionsData={getAllTransactionsData}
        getAllTransactionsPagination={getAllTransactionsPagination}
        getAllTransactionsApiState={getAllTransactionsApiState}
      />
    </div>
  );
}

export default TransactionsContent;
