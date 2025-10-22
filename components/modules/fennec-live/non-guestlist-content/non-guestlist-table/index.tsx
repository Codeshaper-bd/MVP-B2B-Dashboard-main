"use client";

import useManageStateParams from "@/hooks/useManageStateParams";
import { useGetFennecLiveNonGuestlistDetailsQuery } from "@/store/api/fennec-live/fennec-live-api";
import type { TGetFennecLiveNonGuestlistDetailsArgs } from "@/store/api/fennec-live/fennec-live.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";

import { columns } from "./columns";
import NonGuestListFilter from "./non-guest-list-filter";
import NonGuestListTableSearch from "./non-guestlist-table-search";

function NonGuestListTable() {
  const manageStateParams =
    useManageStateParams<
      Exclude<TGetFennecLiveNonGuestlistDetailsArgs, void>
    >();

  const { updateAParam, getAllParamValue } = manageStateParams;
  const { page, search, sex } = getAllParamValue();
  const {
    data: getFennecLiveNonGuestListRes,
    ...getFennecLiveGuestListApiState
  } = useGetFennecLiveNonGuestlistDetailsQuery({
    page: page || 1,
    search,
    sex,
    pageSize: 6,
  });
  const getFennecLiveNonGuestListData = getFennecLiveNonGuestListRes?.data;
  const getFennecLiveNonGuestListPagination =
    getFennecLiveNonGuestListRes?.pagination;
  return (
    <div>
      <div className="mb-6 flex justify-end gap-4">
        <NonGuestListTableSearch manageStateParams={manageStateParams} />
        <NonGuestListFilter manageStateParams={manageStateParams} />
      </div>
      <DefaultTable
        className="rounded-b-none"
        data={getFennecLiveNonGuestListData}
        columns={columns}
      >
        <RenderData
          expectedDataType="array"
          data={getFennecLiveNonGuestListData}
          {...getFennecLiveGuestListApiState}
        >
          <DefaultTable.Table />
        </RenderData>
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getFennecLiveGuestListApiState.isLoading ||
              getFennecLiveGuestListApiState.isFetching
            }
            totalPages={getFennecLiveNonGuestListPagination?.totalPages || 1}
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
    </div>
  );
}

export default NonGuestListTable;
