"use client";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type { TGetPastEventTransactionArgs } from "@/store/api/past-event/past-event.types";
import SearchComponent from "@/components/ui/search-component";

interface TransactionsSearchProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPastEventTransactionArgs, void>
  >;
}
function TransactionsSearch({ manageStateParams }: TransactionsSearchProps) {
  const { updateMultipleParam, getAParamValue } = manageStateParams;
  const search = getAParamValue("search");

  return (
    <SearchComponent<"external">
      mode="external"
      search={search}
      setSearch={(value) => {
        updateMultipleParam({
          search: value,
          page: undefined,
        });
      }}
      className="max-w-[312px]"
      placeholder="Search Customer Name"
    />
  );
}

export default TransactionsSearch;
