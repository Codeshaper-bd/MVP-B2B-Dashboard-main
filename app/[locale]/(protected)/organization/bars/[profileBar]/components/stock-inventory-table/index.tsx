"use client";

import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { checkIsValidId } from "@/lib/query-management/check-valid-id";
import { useGetAllInventoryItemIncludingBarQuery } from "@/store/api/inventory-item/inventory-item-api";
import {
  EInventoryItemType,
  type TGetAllInventoryItemIncludingBarArgs,
} from "@/store/api/inventory-item/inventory-item.types";
import SoldByDropDown from "@/components/features/dropdown/SoldByDropDown";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import type { TTabOption } from "@/components/tab-card";
import { Button } from "@/components/ui/button";

import { columns } from "./columns";
import { HandleSubComponent } from "./sub-component";

type TPagePrams = Params & {
  locale?: string;
  inventoryType?: string;
  barSlug?: string;
};

export interface IStockInventoryTable {
  // barProductType?: string;
  barSlug?: string;
}

export type TTabValue = "alcohol" | "non-alcoholic";
export type TTabState = {
  tab?: TTabValue;
};
export const tabs: TTabOption<TTabValue>[] = [
  {
    label: "Alcohol",
    value: "alcohol",
  },
  {
    label: "Non Alcoholic",
    value: "non-alcoholic",
  },
];

function formatDashedString(value: string | undefined): string {
  if (!value) {
    return "";
  }
  return value.replace(/-/g, " ");
}

function StockInventoryTable({ barSlug }: IStockInventoryTable) {
  const { getAParamValue, updateAParam } = useManageSearchParams<TTabState>();
  const barProductType: TTabValue | undefined =
    getAParamValue("tab") || "alcohol";

  const { inventoryType } = useParams<TPagePrams>();
  const { getAllParamValue } =
    useManageSearchParams<
      Exclude<TGetAllInventoryItemIncludingBarArgs, void | undefined>
    >();
  const queryObject = getAllParamValue();

  const {
    data: getAllInventoryItemIncludingBarRes,
    ...getAllInventoryItemIncludingBarApiState
  } = useGetAllInventoryItemIncludingBarQuery(
    {
      ...queryObject,
      type:
        inventoryType === "non-alcoholic" || barProductType === "non-alcoholic"
          ? EInventoryItemType.NON_ALCOHOLIC
          : EInventoryItemType.ALCOHOLIC,
      pageSize: contentPerPageOptions[10],
      page: queryObject.page || 1,
      soldBy: queryObject.soldBy || "VOLUME",
      barSlug,
    },
    {
      skip: !checkIsValidId(barSlug, {
        type: "string",
      }),
    },
  );

  const getAllGroupTypeInventoryData = getAllInventoryItemIncludingBarRes?.data;
  const getAllGroupTypeInventoryPaginationData =
    getAllInventoryItemIncludingBarRes?.pagination;

  return (
    <div>
      <div className="mb-4 flex items-center">
        <h3 className="flex-1 text-lg font-semibold capitalize text-default-700">
          {formatDashedString(barSlug)} Inventory
        </h3>
        <div className="flex flex-none items-center gap-3">
          <span className="text-sm font-medium text-default-700">Sold by</span>
          <SoldByDropDown />

          <Button color="primary" asChild>
            <Link
              href={`/en/inventory/inventory-management/bar-inventory/${barSlug}`}
            >
              View All
            </Link>
          </Button>
        </div>
      </div>
      <RenderData
        data={getAllGroupTypeInventoryData?.items}
        expectedDataType="array"
        {...getAllInventoryItemIncludingBarApiState}
        loadingSkeleton={
          <SkeletonWrapper>
            <TableSkeleton />
          </SkeletonWrapper>
        }
      >
        <DefaultTable
          data={getAllGroupTypeInventoryData?.items}
          columns={columns}
        >
          <DefaultTable.Table renderSubComponent={HandleSubComponent} />

          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getAllInventoryItemIncludingBarApiState.isLoading ||
                getAllInventoryItemIncludingBarApiState.isFetching
              }
              totalPages={
                getAllGroupTypeInventoryPaginationData?.totalPages || 1
              }
              hideForTotalPagesOne
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default memo(StockInventoryTable);
