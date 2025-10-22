"use client";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type { TGetAllInventoryItemArgs } from "@/store/api/inventory-item/inventory-item.types";
import SearchComponent from "@/components/ui/search-component";

interface GuestListTableSearchProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetAllInventoryItemArgs, void>
  >;
}
function SearchProduct({ manageStateParams }: GuestListTableSearchProps) {
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
      className="w-full rounded-none border-none bg-transparent focus-visible:ring-0"
      placeholder="Search"
    />
  );
}

export default SearchProduct;
