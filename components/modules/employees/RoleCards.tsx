"use client";

import { contentPerPageOptions } from "@/config/client-config";
import useIsEventCompany from "@/hooks/feature/useIsEventCompany";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllRolesQuery } from "@/store/api/roles/roles-api";
import type { TGetAllRolesArgs, TRole } from "@/store/api/roles/roles.types";
import RoleCard from "@/components/organization/role-card";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

import DemoCard from "./DemoCard";

function SkeletonRoleCard() {
  return (
    <div className="rounded-md border border-border">
      <Skeleton className="flex h-[340px] w-full flex-col gap-2 rounded-b-none bg-default-50 p-4">
        <Skeleton className="mt-3 h-3 w-1/4 flex-none bg-default-100" />
        <Skeleton className="mt-3 h-3 w-1/2 flex-none bg-default-100" />
        <div className="flex-1"></div>
        <Skeleton className="mt-3 h-3 w-1/2 flex-none bg-default-100" />
        <div className="flex gap-1">
          <Skeleton className="size-4 rounded-full bg-default-100" />
          <Skeleton className="h-3 w-full bg-default-100" />
        </div>
      </Skeleton>
    </div>
  );
}
function getFilteredRoles(
  roles: TRole[],
  isEventCompanyUser?: boolean,
): TRole[] {
  if (isEventCompanyUser) {
    return roles.filter(
      (role) =>
        role.slug === "admin" ||
        role.slug === "co-admin" ||
        role.slug === "guestlist",
    );
  } else {
    return roles.filter(
      (role) => role.slug !== "bottlegirl" && role.slug !== "viphost",
    );
  }
}
function RoleCards() {
  const isEventCompanyUser = useIsEventCompany();
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllRolesArgs, void>>();
  const { page } = getAllParamValue();

  const { data: getAllRolesRes, ...getAllRolesApiState } = useGetAllRolesQuery({
    page: page || 1,
    pageSize: contentPerPageOptions[10],
  });

  const getAllRolesData = getAllRolesRes?.data;
  const getAllRolesPagination = getAllRolesRes?.pagination;

  const filteredData = getAllRolesData
    ? getFilteredRoles(getAllRolesData, isEventCompanyUser)
    : [];
  return (
    <>
      <RenderData
        data={getAllRolesData}
        expectedDataType="array"
        {...getAllRolesApiState}
        loadingSkeleton={
          <SkeletonWrapper
            size={12}
            className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          >
            <SkeletonRoleCard />
          </SkeletonWrapper>
        }
      >
        <div className="mb-6 mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {filteredData?.map((item, index) => (
            <RoleCard key={`role-card-${index}`} {...item} />
          ))}
          <DemoCard name="Coat Check" userCount={5} isComingSoon={true} />
        </div>
      </RenderData>

      <div className="mt-4">
        <BasicPagination
          isLoading={
            getAllRolesApiState.isLoading || getAllRolesApiState.isFetching
          }
          totalPages={getAllRolesPagination?.totalPages || 1}
          hideForTotalPagesOne
        />
      </div>
    </>
  );
}

export default RoleCards;
