"use client";

import { memo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetShipmentHistoryQuery } from "@/store/api/shipment/shipment-api";
import type { TGetShipmentsArgs } from "@/store/api/shipment/shipment.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";

function ShipmentTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetShipmentsArgs, void>>();
  const queryObject = getAllParamValue();

  const { data: getShipmentHistoryRes, ...getShipmentHistoryApiState } =
    useGetShipmentHistoryQuery({
      ...queryObject,
      page: contentPerPageOptions.initialPage,
      pageSize: contentPerPageOptions[10],
    });
  const getShipmentHistoryData = getShipmentHistoryRes?.data;
  const getShipmentHistoryPagination = getShipmentHistoryRes?.pagination;

  return (
    <div>
      <RenderData
        data={getShipmentHistoryData}
        expectedDataType="array"
        {...getShipmentHistoryApiState}
        loadingSkeleton={<TableSkeleton />}
      >
        <DefaultTable data={getShipmentHistoryData} columns={columns}>
          <DefaultTable.Table />
          <DefaultTable.Footer>
            <BasicPagination
              isLoading={
                getShipmentHistoryApiState.isLoading ||
                getShipmentHistoryApiState?.isFetching
              }
              totalPages={getShipmentHistoryPagination?.totalPages || 1}
              hideForTotalPagesOne
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default memo(ShipmentTable);
