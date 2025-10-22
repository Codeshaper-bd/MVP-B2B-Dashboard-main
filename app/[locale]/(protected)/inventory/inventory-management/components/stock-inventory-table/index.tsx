"use client";

import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
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
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";
import { HandleSubComponent } from "./sub-component";
import type {
  TTabState,
  TTabValue,
} from "../../bar-inventory/[barSlug]/components/page-tools";

type TPagePrams = Params & {
  locale?: string;
  inventoryType?: string;
  barSlug?: string;
};

function StockInventoryTable() {
  const { getAParamValue } = useManageSearchParams<TTabState>();
  const barProductType: TTabValue | undefined =
    getAParamValue("tab") || "alcohol";

  const { inventoryType, barSlug } = useParams<TPagePrams>();
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
      soldBy: queryObject.soldBy,
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
    <RenderData
      data={getAllGroupTypeInventoryData?.items}
      expectedDataType="array"
      {...getAllInventoryItemIncludingBarApiState}
      loadingSkeleton={
        <SkeletonWrapper>
          <TableSkeleton />
        </SkeletonWrapper>
      }
      dataNotFoundTitle="No Inventory Item Found"
      dataNotFoundSubtitle="There is no inventory item found for this bar."
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
            totalPages={getAllGroupTypeInventoryPaginationData?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default memo(StockInventoryTable);
