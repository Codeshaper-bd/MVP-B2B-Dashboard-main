"use client";
import { useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllInvitedCustomersQuery } from "@/store/api/customer-lookup/customer-lookup-api";
import type { TGetAllCustomerArgs } from "@/store/api/customer-lookup/customer-lookup.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { getColumns } from "./columns";

function CustomerHistory() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllCustomerArgs, void>>();
  const queryParams = getAllParamValue();
  const { data: allInvitedCustomersRes, ...allInvitedCustomersApiState } =
    useGetAllInvitedCustomersQuery({
      ...queryParams,
      pageSize: 10,
    });
  const allInvitedCustomersData = allInvitedCustomersRes?.data;
  const allInvitedCustomersPagination = allInvitedCustomersRes?.pagination;

  const columns = useMemo(
    () => getColumns({ currentPage: allInvitedCustomersPagination?.page || 1 }),
    [allInvitedCustomersPagination?.page],
  );

  return (
    <RenderData
      data={allInvitedCustomersData}
      expectedDataType="array"
      {...allInvitedCustomersApiState}
      loadingSkeleton={<TableSkeleton />}
    >
      <DefaultTable data={allInvitedCustomersData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              allInvitedCustomersApiState.isLoading ||
              allInvitedCustomersApiState?.isFetching
            }
            totalPages={allInvitedCustomersPagination?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default CustomerHistory;
