"use client";
import type { TUseManageStateParamsReturnType } from "@/hooks/useManageStateParams";
import type { TGetPastEventGuestListCheckInArgs } from "@/store/api/past-event/past-event.types";
import SearchComponent from "@/components/ui/search-component";

interface GuestListTableSearchProps {
  manageStateParams: TUseManageStateParamsReturnType<
    Exclude<TGetPastEventGuestListCheckInArgs, void>
  >;
}
function NonGuestListTableSearch({
  manageStateParams,
}: GuestListTableSearchProps) {
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
      placeholder="Search"
    />
  );
}

export default NonGuestListTableSearch;
