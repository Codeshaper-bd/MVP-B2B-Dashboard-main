"use client";

import { useParams } from "next/navigation";
import { memo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllInventoryItemQuery } from "@/store/api/inventory-item/inventory-item-api";
import {
  type TSoldBy,
  EInventoryItemType,
  type TGetAllInventoryItemArgs,
} from "@/store/api/inventory-item/inventory-item.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns, HandleSubComponent } from "./columns";

export interface ICurrentInventoryTable {
  barProductType?: string;
  soldBy?: TSoldBy;
}
function CurrentInventoryTable({ barProductType }: ICurrentInventoryTable) {
  const { inventoryType } = useParams();
  const { getAllParamValue } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemArgs, void | undefined>
    >();
  const queryObject = getAllParamValue();

  const fallbackSoldBy =
    inventoryType === "non-alcoholic" ? undefined : "VOLUME";

  const { data: getAllInventoryItemRes, ...getAllInventoryItemApiState } =
    useGetAllInventoryItemQuery({
      ...queryObject,
      type:
        inventoryType === "non-alcoholic" || barProductType === "non-alcoholic"
          ? EInventoryItemType.NON_ALCOHOLIC
          : EInventoryItemType.ALCOHOLIC,
      pageSize: contentPerPageOptions[10],
      page: queryObject.page || 1,
      soldBy: queryObject.soldBy || fallbackSoldBy,
    });

  const getAllGroupTypeInventoryData = getAllInventoryItemRes?.data;
  const getAllGroupTypeInventoryPaginationData =
    getAllInventoryItemRes?.pagination;

  return (
    <RenderData
      data={getAllGroupTypeInventoryData}
      expectedDataType="array"
      {...getAllInventoryItemApiState}
      loadingSkeleton={
        <SkeletonWrapper>
          <TableSkeleton />
        </SkeletonWrapper>
      }
    >
      <DefaultTable data={getAllGroupTypeInventoryData} columns={columns}>
        <DefaultTable.Table renderSubComponent={HandleSubComponent} />

        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getAllInventoryItemApiState.isLoading ||
              getAllInventoryItemApiState.isFetching
            }
            totalPages={getAllGroupTypeInventoryPaginationData?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default memo(CurrentInventoryTable);
