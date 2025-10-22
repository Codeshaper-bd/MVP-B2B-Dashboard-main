"use client";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type { TGetPastEventOrderArgs } from "@/store/api/past-event/past-event.types";
import SearchComponent from "@/components/ui/search-component";

interface OrdersSearchProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPastEventOrderArgs, void>
  >;
}
function OrdersSearch({ manageStateParams }: OrdersSearchProps) {
  const { updateMultipleParam, getAllParamValue } = manageStateParams;
  const { search } = getAllParamValue();

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
      placeholder="Search"
    />
  );
}

export default OrdersSearch;
