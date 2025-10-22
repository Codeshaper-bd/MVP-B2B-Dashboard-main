"use client";
import { cn } from "@/lib/utils";
import { useGetAllBarMenuQuery } from "@/store/api/bar-menu/bar-menu-api";
import type {
  TBarMenu,
  TGetAllBarMenuArgs,
} from "@/store/api/bar-menu/bar-menu.types";
import type { TNullish } from "@/store/api/common-api-types";
import RenderData from "@/components/render-data";
import CategoryCardSkeleton from "@/components/skeleton/category-card";

import CategoryOption from "./CategoryOption";

interface ICategoryOptionsProps {
  title?: string | number;
  enableHorizontalPadding?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: TBarMenu | null | undefined,
  ) => void;
  selectedSlug: string | TNullish;
  apiQuery?: TGetAllBarMenuArgs;
}

function CategoryOptions({
  selectedSlug,
  title,
  enableHorizontalPadding,
  onClick,
  apiQuery,
}: ICategoryOptionsProps) {
  const { data: getAllBarMenuRes, ...getAllBarMenuApiState } =
    useGetAllBarMenuQuery(apiQuery);
  const getAllBarMenuData = getAllBarMenuRes?.data;

  return (
    <div className="w-full">
      {!!title && (
        <h2 className="mb-6 text-lg font-semibold leading-7 text-default-900">
          {title}
        </h2>
      )}

      <RenderData
        data={getAllBarMenuData}
        expectedDataType="array"
        {...getAllBarMenuApiState}
        loadingSkeleton={
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 8 }).map((_, idx) => (
              <CategoryCardSkeleton key={idx} />
            ))}
          </div>
        }
        dataNotFoundUI={<div></div>}
      >
        <div
          className={cn("min-h-[118px]", {
            "px-3": enableHorizontalPadding,
          })}
        >
          <div
            className={cn(
              "custom-scrollbar flex touch-pan-x flex-nowrap items-center gap-4 gap-x-9 overflow-y-hidden scroll-smooth",
              "pb-[8px]# hover:pb-0# overflow-x-hidden hover:overflow-x-auto focus:overflow-x-auto",
            )}
          >
            {getAllBarMenuData?.map((item) => (
              <CategoryOption
                key={item?.id}
                {...item}
                selectedSlug={selectedSlug}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      </RenderData>
    </div>
  );
}

export default CategoryOptions;
