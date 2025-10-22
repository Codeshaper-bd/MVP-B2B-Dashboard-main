"use client";

import { useGetAllBarsQuery } from "@/store/api/bars/bars-api";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";

import BarInventoryCard from "./bar-inventory-card";
import BarInventorySkeleton from "./bar-inventory-skeleton";

function BarInventoryWrapper() {
  const { data: getAllBarRes, ...getAllBarApiState } = useGetAllBarsQuery();
  const getAllBarData = getAllBarRes?.data;
  return (
    <div className="gird-5 grid md:grid-cols-2 md:gap-7 lg:grid-cols-4 [&_>div]:w-full">
      <RenderData
        {...getAllBarApiState}
        expectedDataType="array"
        data={getAllBarData}
        loadingSkeleton={
          <SkeletonWrapper
            size={4}
            className="gird-5 col-span-full grid grid-cols-1 md:grid-cols-4 md:gap-7"
          >
            <BarInventorySkeleton />
          </SkeletonWrapper>
        }
      >
        {getAllBarData?.map((item) => (
          <BarInventoryCard item={item} key={item?.slug} />
        ))}
      </RenderData>
    </div>
  );
}

export default BarInventoryWrapper;
