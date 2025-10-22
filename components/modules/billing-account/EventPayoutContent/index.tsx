import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAnEventPayoutQuery } from "@/store/api/events/events-api";
import type { TGetAnEventPayoutArgs } from "@/store/api/events/events.types";
import SearchComponent from "@/components/ui/search-component";

import PayoutFilter from "./PayoutFilter";
import PayoutFilterValue from "./PayoutFilterValue";
import EventPayoutTable from "./table";

function EventPayoutContent() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAnEventPayoutArgs, void | undefined>>();
  const queryParams = getAllParamValue();
  const { data: getAnEventPayoutRes, ...getAnEventPayoutApiState } =
    useGetAnEventPayoutQuery({ ...queryParams });
  const getAnEventPayoutData = getAnEventPayoutRes?.data;
  const getAnEventPayoutPagination = getAnEventPayoutRes?.pagination;
  return (
    <div className="mt-4 lg:-mt-11">
      <div className="mb-4 flex gap-2 lg:justify-end">
        <SearchComponent className="max-w-[312px]" placeholder="Search" />
        <PayoutFilter />
      </div>
      <PayoutFilterValue />
      <EventPayoutTable
        getAnEventPayoutData={getAnEventPayoutData}
        getAnEventPayoutPagination={getAnEventPayoutPagination}
        getAnEventPayoutApiState={getAnEventPayoutApiState}
      />
    </div>
  );
}

export default EventPayoutContent;
