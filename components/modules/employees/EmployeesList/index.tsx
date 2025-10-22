"use client";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import { useGetAllEmployeeQuery } from "@/store/api/employees/employees-api";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

import CountEmployees from "./count-employees";
import EmployeeCard from "./employee-card";
import EmployeeCardSkeleton from "./employee-card-skeleton";

function EmployeesList() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();
  const queryObject = getAllParamValue();

  const { data: getAllEmployeeRes, ...getAllEmployeeApiState } =
    useGetAllEmployeeQuery({
      ...queryObject,
      pageSize: contentPerPageOptions[9],
      page: queryObject.page || contentPerPageOptions.initialPage,
    });

  const getAllEmployeesData = getAllEmployeeRes?.data;
  const getAllEmployeesPagination = getAllEmployeeRes?.pagination;

  return (
    <div>
      <RenderData
        expectedDataType="array"
        data={getAllEmployeesData}
        {...getAllEmployeeApiState}
        loadingSkeleton={
          <div>
            <Skeleton className="mb-4 h-6 w-36" />
            <SkeletonWrapper
              size={12}
              className="mb-6 mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              <EmployeeCardSkeleton />
            </SkeletonWrapper>
          </div>
        }
      >
        <div>
          <CountEmployees count={getAllEmployeesPagination?.totalCount || 0} />
          <div className="mb-6 mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {getAllEmployeesData?.map((item) => (
              <EmployeeCard key={item?.id} {...(item || {})} />
            ))}
          </div>
        </div>
      </RenderData>

      <div className="mt-4">
        <BasicPagination
          isLoading={
            getAllEmployeeApiState.isLoading ||
            getAllEmployeeApiState.isFetching
          }
          totalPages={getAllEmployeesPagination?.totalPages || 1}
          hideForTotalPagesOne
        />
      </div>
    </div>
  );
}

export default EmployeesList;
