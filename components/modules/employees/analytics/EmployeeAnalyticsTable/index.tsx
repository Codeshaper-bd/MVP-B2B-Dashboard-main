"use client";
import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import { useGetAllEmployeeQuery } from "@/store/api/employees/employees-api";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";

import { columns } from "./columns";

function EmployeeAnalyticsTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();
  const queryObject = getAllParamValue();

  const { data: getAllEmployeeRes, ...getAllEmployeeApiState } =
    useGetAllEmployeeQuery({
      ...queryObject,
      pageSize: contentPerPageOptions[10],
      page: queryObject.page || contentPerPageOptions.initialPage,
    });

  const getAllEmployeesData = getAllEmployeeRes?.data;
  const getAllEmployeesPagination = getAllEmployeeRes?.pagination;
  return (
    <div className="space-y-7">
      <h2 className="text-xl font-semibold text-[#F5F5F6]">
        {getAllEmployeesPagination?.totalCount || 0} Employees
      </h2>
      <RenderData
        expectedDataType="array"
        data={getAllEmployeesData}
        {...getAllEmployeeApiState}
        loadingSkeleton={<TableSkeleton />}
      >
        <DefaultTable data={getAllEmployeesData} columns={columns}>
          <DefaultTable.Table />
          <DefaultTable.Footer className="">
            <BasicPagination
              isLoading={
                getAllEmployeeApiState.isLoading ||
                getAllEmployeeApiState?.isFetching
              }
              totalPages={getAllEmployeesPagination?.totalPages || 1}
              hideForTotalPagesOne
            />
          </DefaultTable.Footer>
        </DefaultTable>
      </RenderData>
    </div>
  );
}

export default EmployeeAnalyticsTable;
