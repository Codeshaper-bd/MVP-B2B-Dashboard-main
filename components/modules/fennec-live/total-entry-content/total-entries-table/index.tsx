"use client";

import useManageStateParams from "@/hooks/useManageStateParams";
import { cn } from "@/lib/utils";
import { useGetFennecLiveGuestlistDetailsQuery } from "@/store/api/fennec-live/fennec-live-api";
import type { TGetFennecLiveGuestlistDetailsArgs } from "@/store/api/fennec-live/fennec-live.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import type { ITotalEntryContent } from "..";
import { columns } from "./columns";
import GuestListFilter from "./guest-list-filter";
import GuestListTableSearch from "./guestlist-table-search";

function TotalEntriesTable({ tableClassName }: ITotalEntryContent) {
  const manageStateParams =
    useManageStateParams<Exclude<TGetFennecLiveGuestlistDetailsArgs, void>>();

  const { updateAParam, getAllParamValue } = manageStateParams;
  const { page, search, status, sex } = getAllParamValue();
  const {
    data: getFennecLiveGuestlistDetailsRes,
    ...getFennecLiveGuestlistDetailsApiState
  } = useGetFennecLiveGuestlistDetailsQuery({
    page: page || 1,
    search,
    status,
    sex,
    pageSize: 6,
  });
  const getFennecLiveGuestlistDetailsData =
    getFennecLiveGuestlistDetailsRes?.data;
  const getFennecLiveGuestlistDetailsPagination =
    getFennecLiveGuestlistDetailsRes?.pagination;

  return (
    <div className={cn("lg:-mt-16", tableClassName)}>
      <div className="mb-6 flex justify-end gap-4">
        <GuestListTableSearch manageStateParams={manageStateParams} />
        <GuestListFilter manageStateParams={manageStateParams} />
      </div>

      <DefaultTable
        data={getFennecLiveGuestlistDetailsData}
        className="rounded-b-none"
        columns={columns}
      >
        <RenderData
          expectedDataType="array"
          data={getFennecLiveGuestlistDetailsData}
          {...getFennecLiveGuestlistDetailsApiState}
          loadingSkeleton={<TableSkeleton length={6} />}
        >
          <DefaultTable.Table />
        </RenderData>
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getFennecLiveGuestlistDetailsApiState.isLoading ||
              getFennecLiveGuestlistDetailsApiState.isFetching
            }
            totalPages={
              getFennecLiveGuestlistDetailsPagination?.totalPages || 1
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
    </div>
  );
}

export default TotalEntriesTable;
