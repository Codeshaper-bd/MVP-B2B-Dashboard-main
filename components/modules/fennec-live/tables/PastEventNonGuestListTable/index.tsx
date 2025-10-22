"use client";

import { useMemo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageStateParams from "@/hooks/useManageStateParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import type { TNullish } from "@/store/api/common-api-types";
import { useGetPastEventGuestListCheckInQuery } from "@/store/api/past-event/past-event-api";
import type { TGetPastEventGuestListCheckInArgs } from "@/store/api/past-event/past-event.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";

import { getColumns } from "./columns";
import NonGuestListFilter from "./non-guest-list-filter";
import NonGuestListTableSearch from "./non-guestlist-table-search";

interface INonGuestListTable {
  eventSlug: string | TNullish;
}
function PastEventNonGuestListTable({ eventSlug }: INonGuestListTable) {
  const isSlugValid = checkIsValidId(eventSlug, {
    type: "string",
  });
  const manageStateParams =
    useManageStateParams<Exclude<TGetPastEventGuestListCheckInArgs, void>>();

  const { updateAParam, getAllParamValue } = manageStateParams;
  const {
    page,
    guestListFilter = "guestList",
    sex,
    numberOfTickets,
    pageSize,
    search,
    status,
  } = getAllParamValue();

  const {
    data: getPastEventGuestListCheckInRes,
    ...getPastEventGuestListCheckInApiState
  } = useGetPastEventGuestListCheckInQuery(
    {
      slug: eventSlug,
      page: page || 1,
      pageSize: pageSize || contentPerPageOptions[6],
      guestListFilter,
      search,
      sex,
      status,
    },
    {
      skip: !isSlugValid,
    },
  );
  const getPastEventGuestListCheckInData =
    getPastEventGuestListCheckInRes?.data;
  const getPastEventGuestListCheckInPagination =
    getPastEventGuestListCheckInRes?.pagination;

  const columns = useMemo(
    () => getColumns(getPastEventGuestListCheckInPagination),
    [getPastEventGuestListCheckInPagination],
  );
  return (
    <div>
      <div className="mb-6 flex justify-end gap-4">
        <NonGuestListTableSearch manageStateParams={manageStateParams} />
        <NonGuestListFilter manageStateParams={manageStateParams} />
      </div>

      <RenderData
        expectedDataType="array"
        data={getPastEventGuestListCheckInData}
        {...getPastEventGuestListCheckInApiState}
      >
        <DefaultTable
          className="rounded-b-none"
          data={getPastEventGuestListCheckInData}
          columns={columns}
        >
          <DefaultTable.Table />

          <DefaultTable.Footer>
            <BasicPagination
              totalPages={
                getPastEventGuestListCheckInPagination?.totalPages || 1
              }
              hideForTotalPagesOne
              disableUrlState
              onPageChange={(page) =>
                updateAParam({
                  key: "page",
                  value: page,
                })
              }
              currentPage={Number(page || 1)}
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default PastEventNonGuestListTable;
