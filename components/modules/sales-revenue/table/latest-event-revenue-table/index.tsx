"use client";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetLatestRevenueQuery } from "@/store/api/sales-revenue/sales-revenue-api";
import type { TGetLatestRevenueArgs } from "@/store/api/sales-revenue/sales-revenue.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";

function LatestEventRevenueTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetLatestRevenueArgs, void>>();
  const { page, search } = getAllParamValue();

  const { data: getLatestRevenueRes, ...getLatestRevenueApiState } =
    useGetLatestRevenueQuery({
      page: page || 1,
      pageSize: 10,
      search: search || undefined,
    });

  const getLatestRevenueData = getLatestRevenueRes?.data;
  const getLatestRevenuePagination = getLatestRevenueRes?.pagination;

  return (
    <DefaultTable data={getLatestRevenueData} columns={columns}>
      <DefaultTable.TitleContainer>
        <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
          Latest event revenue
        </DefaultTable.TitleContainer.Title>
      </DefaultTable.TitleContainer>

      <RenderData
        expectedDataType="array"
        data={getLatestRevenueData}
        loadingSkeleton={<TableSkeleton />}
        {...getLatestRevenueApiState}
      >
        <DefaultTable.Table />

        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getLatestRevenueApiState.isLoading ||
              getLatestRevenueApiState.isFetching
            }
            totalPages={getLatestRevenuePagination?.totalPages || 1}
          />
        </DefaultTable.Footer>
      </RenderData>
    </DefaultTable>
  );
}

export default LatestEventRevenueTable;
