"use client";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllPromotersInOrganizationQuery } from "@/store/api/promoter/promoter-api";
import type { TGetAllPromotersInOrganizationArgs } from "@/store/api/promoter/promoter.types";
import NightClubCard from "@/components/features/cards/NightClubCard";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import PostCardSkeleton from "@/components/skeleton/post-card-skeleton";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";

function ClubList() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllPromotersInOrganizationArgs, void>>();

  const queryParams = getAllParamValue();
  const {
    data: getAllPromotersInOrganizationRes,
    ...getAllPromotersInOrganizationApiState
  } = useGetAllPromotersInOrganizationQuery({
    ...queryParams,
    page: queryParams?.page || contentPerPageOptions.initialPage,
    pageSize: queryParams?.pageSize || contentPerPageOptions[12],
  });
  const getAllPromotersData = getAllPromotersInOrganizationRes?.data;
  const getAllPromotersPagination =
    getAllPromotersInOrganizationRes?.pagination;
  return (
    <>
      <RenderData
        expectedDataType="array"
        data={getAllPromotersData}
        {...getAllPromotersInOrganizationApiState}
        dataNotFoundTitle="No clubs found"
        dataNotFoundDescription="This promoter has not added any clubs yet."
        loadingSkeleton={
          <SkeletonWrapper size={12}>
            <PostCardSkeleton />
          </SkeletonWrapper>
        }
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {getAllPromotersData?.map((promoter) => (
            <NightClubCard key={promoter.id} promoter={promoter} />
          ))}
        </div>
      </RenderData>
      <BasicPagination
        isLoading={
          getAllPromotersInOrganizationApiState.isLoading ||
          getAllPromotersInOrganizationApiState.isFetching
        }
        totalPages={getAllPromotersPagination?.totalPages || 1}
        hideForTotalPagesOne
      />
    </>
  );
}

export default ClubList;
