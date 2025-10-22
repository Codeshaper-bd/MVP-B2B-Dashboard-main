"use client";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type { TGetFennecLiveGuestlistDetailsArgs } from "@/store/api/fennec-live/fennec-live.types";
import SearchComponent from "@/components/ui/search-component";

interface GuestListTableSearchProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetFennecLiveGuestlistDetailsArgs, void>
  >;
}
function GuestListTableSearch({
  manageStateParams,
}: GuestListTableSearchProps) {
  const { updateMultipleParam, getAParamValue } = manageStateParams;
  const search = getAParamValue("search");

  return (
    <SearchComponent<"external">
      mode="external"
      setSearch={(value) => {
        updateMultipleParam({
          search: value,
          page: undefined,
        });
      }}
      search={search}
      className="max-w-[312px]"
      placeholder="Search"
    />
  );
}

export default GuestListTableSearch;
