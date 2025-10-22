"use client";

import { memo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllBarMenuQuery } from "@/store/api/bar-menu/bar-menu-api";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import PostCardSkeleton from "@/components/skeleton/post-card-skeleton";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";

import CategoryCard from "./category-card";

function CategoryCards() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();
  const queryObject = getAllParamValue();
  const { data: getAllBarMenuRes, ...getAllBarMenuApiState } =
    useGetAllBarMenuQuery({
      ...queryObject,
      pageSize: contentPerPageOptions[12],
      page: queryObject.page || contentPerPageOptions.initialPage,
    });
  const getAllBarMenuData = getAllBarMenuRes?.data;
  const getAllBarMenuPagination = getAllBarMenuRes?.pagination;

  return (
    <>
      <RenderData
        expectedDataType="array"
        data={getAllBarMenuData}
        {...getAllBarMenuApiState}
        loadingSkeleton={
          <SkeletonWrapper size={12}>
            <PostCardSkeleton />
          </SkeletonWrapper>
        }
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {getAllBarMenuData?.map((item) => (
            <CategoryCard key={item?.id} item={item} />
          ))}
        </div>
      </RenderData>

      <div className="mt-4">
        <BasicPagination
          isLoading={
            getAllBarMenuApiState.isLoading || getAllBarMenuApiState.isFetching
          }
          totalPages={getAllBarMenuPagination?.totalPages || 1}
          hideForTotalPagesOne
        />
      </div>
    </>
  );
}

export default memo(CategoryCards);
