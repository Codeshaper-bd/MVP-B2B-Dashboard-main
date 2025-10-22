"use client";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import useManageStateParams from "@/hooks/useManageStateParams";
import type { TGetAnInventoryTransferHistoryArgs } from "@/store/api/inventory-transfer/inventory-transfer.types";
import { useGetInventoryTransferHistoryQuery } from "@/store/api/transfer-history/inventory-transfer-api";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";

function HistoryTable() {
  const { getAParamValue } = useManageSearchParams<{ eventSlug: string }>();
  const eventSlug = getAParamValue("eventSlug");
  const manageStateParams =
    useManageStateParams<Exclude<TGetAnInventoryTransferHistoryArgs, void>>();
  const { updateAParam, getAllParamValue } = manageStateParams;
  const { page } = getAllParamValue();
  const {
    data: getAnInventoryTransferHistoryRes,
    ...getAnInventoryTransferHistoryApiState
  } = useGetInventoryTransferHistoryQuery({
    page: page || contentPerPageOptions.initialPage,
    pageSize: contentPerPageOptions[10],
    eventSlug,
  });
  const getHistoryData = getAnInventoryTransferHistoryRes?.data;
  const getHistoryPagination = getAnInventoryTransferHistoryRes?.pagination;
  return (
    <RenderData
      expectedDataType="array"
      data={getHistoryData}
      loadingSkeleton={<TableSkeleton />}
      {...getAnInventoryTransferHistoryApiState}
      dataNotFoundTitle="No transfer history available"
      dataNotFoundSubtitle="You haven't made any transfers yet"
    >
      <DefaultTable data={getHistoryData} columns={columns}>
        <DefaultTable.TitleContainer>
          <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
            Transfer History
          </DefaultTable.TitleContainer.Title>
        </DefaultTable.TitleContainer>

        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getAnInventoryTransferHistoryApiState.isLoading ||
              getAnInventoryTransferHistoryApiState.isFetching
            }
            totalPages={getHistoryPagination?.totalPages || 1}
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
  );
}

export default HistoryTable;
