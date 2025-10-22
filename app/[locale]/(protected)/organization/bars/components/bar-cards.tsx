"use client";

import { useEffect, useState, useMemo } from "react";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { getDeletedBarSlugs } from "@/lib/deleted-bars";
import { cn } from "@/lib/utils";
import { useGetAllBarsQuery } from "@/store/api/bars/bars-api";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import BarCard from "@/components/modules/bars/BarCard";
import BarSkeleton from "@/components/organization/bar-skeleton";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";

function BarCards() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();

  const queryObject = getAllParamValue();

  const { data: getAllBarRes, ...getAllBarApiState } = useGetAllBarsQuery({
    ...queryObject,
    pageSize: contentPerPageOptions[5],
  });

  const getAllBarData = getAllBarRes?.data;
  const getAllBarPagination = getAllBarRes?.pagination;
  const [deletedBarSlugs, setDeletedBarSlugs] = useState<string[]>([]);

  useEffect(() => {
    const update = () => {
      setDeletedBarSlugs(getDeletedBarSlugs());
    };

    update();

    window.addEventListener("deleted-bars-changed", update);

    return () => {
      window.removeEventListener("deleted-bars-changed", update);
    };
  }, []);

  const visibleBars = useMemo(
    () => getAllBarData?.filter((bar) => !deletedBarSlugs.includes(bar.slug)),
    [getAllBarData, deletedBarSlugs],
  );

  return (
    <div
      className={cn(
        "mt-6 space-y-6",
        !visibleBars?.length
          ? "flex min-h-[calc(100vh-200px)] items-center justify-center"
          : "",
      )}
    >
      <RenderData
        {...getAllBarApiState}
        expectedDataType="array"
        data={visibleBars}
        loadingSkeleton={
          <SkeletonWrapper size={3} className="w-full space-y-6">
            <BarSkeleton />
          </SkeletonWrapper>
        }
        dataNotFoundTitle="No Bar Found"
        dataNotFoundSubtitle="There is no Bar Found in this organization"
      >
        {visibleBars?.map((item) => <BarCard key={item?.slug} {...item} />)}
      </RenderData>

      <div className="mt-4">
        <BasicPagination
          isLoading={
            getAllBarApiState.isLoading || getAllBarApiState.isFetching
          }
          totalPages={getAllBarPagination?.totalPages}
          hideForTotalPagesOne
        />
      </div>
    </div>
  );
}

export default BarCards;
