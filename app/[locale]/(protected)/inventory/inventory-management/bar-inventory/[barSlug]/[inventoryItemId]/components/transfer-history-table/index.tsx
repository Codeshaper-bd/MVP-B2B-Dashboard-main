"use client";

import { useParams } from "next/navigation";
import { memo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAnInventoryTransferHistoryQuery } from "@/store/api/inventory-transfer/inventory-transfer-api";
import type { TGetAnInventoryTransferHistoryArgs } from "@/store/api/inventory-transfer/inventory-transfer.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
import type { IPageParams } from "../overview-content";

type TTransferHistoryPageParams = Exclude<
  TGetAnInventoryTransferHistoryArgs,
  void
> & {
  childItemId?: number;
};

interface TransferHistoryTableProps {
  defaultId?: number;
}

function TransferHistoryTable({ defaultId }: TransferHistoryTableProps) {
  const params = useParams<IPageParams>();

  const { getAllParamValue } =
    useManageSearchParams<TTransferHistoryPageParams>();

  const queryObject = getAllParamValue();
  const isChildId = !!queryObject.childItemId;

  const {
    data: getAnInventoryTransferHistoryRes,
    ...getAnInventoryTransferHistoryApiState
  } = useGetAnInventoryTransferHistoryQuery(
    {
      barSlug: params?.barSlug,
      inventoryItemId: isChildId ? queryObject.childItemId : defaultId,
    },
    { skip: !checkIsValidId(params?.barSlug, { type: "string" }) },
  );

  const getAnInventoryTransferHistoryData =
    getAnInventoryTransferHistoryRes?.data;
  const getTransferHistoryPagination =
    getAnInventoryTransferHistoryRes?.pagination;

  return (
    <div>
      <RenderData
        data={getAnInventoryTransferHistoryData}
        expectedDataType="array"
        {...getAnInventoryTransferHistoryApiState}
        loadingSkeleton={<TableSkeleton />}
      >
        <DefaultTable
          data={getAnInventoryTransferHistoryData}
          columns={columns}
        >
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getAnInventoryTransferHistoryApiState.isLoading ||
                getAnInventoryTransferHistoryApiState?.isFetching
              }
              totalPages={getTransferHistoryPagination?.totalPages || 1}
              hideForTotalPagesOne
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default memo(TransferHistoryTable);
