"use client";

import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useMemo } from "react";
import { VirtuosoGrid } from "react-virtuoso";

import useManageStateParams from "@/hooks/useManageStateParams";
import { cn } from "@/lib/utils";
import type { TBarMenu } from "@/store/api/bar-menu/bar-menu.types";
import { useGetAllBarMenuItemsInfiniteQuery } from "@/store/api/bar-menu-item/bar-menu-item-api";
import type {
  TBarMenuItem,
  TGetAllBarMenuItemArgs,
} from "@/store/api/bar-menu-item/bar-menu-item.types";
import type { TNullish, TPagination } from "@/store/api/common-api-types";

import CategoryOptions from "./CategoryOptions";
import RenderData from "../render-data";
import FoodCard, { type TFoodCardProps } from "./FoodCardList/FoodCard";
import DrinkCardSkeleton from "../skeleton/drink-card-skeleton";
import { getGridComponents } from "./FoodCardList/GridComponent";

type TUpdateMultipleParam = (
  paramsToUpdate: Partial<Exclude<TGetAllBarMenuItemArgs, void | undefined>>,
  options?: void | NavigateOptions | null | undefined,
) => void;
type THandleOnSelectCategory = (props: {
  updateMultipleParam: TUpdateMultipleParam;
  onFilterSelect?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: TBarMenu | null | undefined,
  ) => void;
}) => (
  e: React.MouseEvent<HTMLDivElement>,
  data: TBarMenu | null | undefined,
) => void;

const handleOnSelectCategory: THandleOnSelectCategory =
  ({ updateMultipleParam, onFilterSelect }) =>
  (e, data) => {
    // setBarMenuSlug(data?.slug ?? undefined);
    updateMultipleParam({
      barMenuSlug: data?.slug ?? undefined,
      page: undefined,
      search: undefined,
    });
    onFilterSelect?.(e, data);
  };

export interface IFoodSelectContentProps {
  title?: string | number;
  className?: string;
  gridClassName?: string;
  enableFilterHorizontalPadding?: boolean;
  onFilterSelect?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: TBarMenu | null | undefined,
  ) => void;
  onSelectFood?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: TFoodCardProps | null | undefined,
  ) => void;
  selectedFoodId: string | number | null | undefined;
  isNotInsideModal?: boolean | undefined;
  skeletonClass?: string | undefined;
}

function FoodSelectContent({
  title,
  className,
  enableFilterHorizontalPadding,
  onFilterSelect,
  onSelectFood,
  selectedFoodId,
  gridClassName,
  isNotInsideModal,
  skeletonClass,
}: IFoodSelectContentProps) {
  const { getAllParamValue, updateMultipleParam } =
    useManageStateParams<Exclude<TGetAllBarMenuItemArgs, void | undefined>>();
  const queryArgs = getAllParamValue();
  /* custom infinite query start */

  const args = {
    ...queryArgs,
  };

  const {
    data: getAllProductsPages,
    fetchNextPage,
    ...getAllProductsApiState
  } = useGetAllBarMenuItemsInfiniteQuery({
    barMenuSlug: queryArgs?.barMenuSlug,
  });

  const { data: getAllProductsData, hasMore } = useMemo(() => {
    const data: TBarMenuItem[] = [];
    const totalPages: number = getAllProductsPages?.pages?.length || 0;
    const lastIndex: number = totalPages > 0 ? totalPages - 1 : 0;
    const lastPaginationInfo: TPagination | TNullish =
      getAllProductsPages?.pages?.[lastIndex]?.pagination || null;

    const hasMore: boolean =
      (lastPaginationInfo?.page || 1) < (lastPaginationInfo?.totalPages || 1);

    for (let index = 0; index < totalPages; index++) {
      const page = getAllProductsPages?.pages?.[index];
      if (page?.data) {
        data.push(...page.data);
      }
    }

    return {
      data,
      dataLength: data?.length || 0,
      hasMore,
      pagination: {
        page: Number(lastPaginationInfo?.page || 1),
        pageSize: Number(
          lastPaginationInfo?.pageSize || lastPaginationInfo?.totalCount || 10,
        ),
        totalPages: Number(lastPaginationInfo?.totalPages || 1),
        totalCount: Number(lastPaginationInfo?.totalCount || 0),
      },
    };
  }, [getAllProductsPages?.pages]);

  return (
    <div className={cn("w-full space-y-[13px]", className)}>
      <CategoryOptions
        title={title}
        enableHorizontalPadding={enableFilterHorizontalPadding}
        onClick={handleOnSelectCategory({
          updateMultipleParam,
          onFilterSelect,
        })}
        selectedSlug={args?.barMenuSlug}
      />
      <RenderData
        data={getAllProductsData}
        expectedDataType="array"
        {...getAllProductsApiState}
        loadingSkeleton={<DrinkCardSkeleton className={skeletonClass} />}
        isFetching={false}
      >
        <VirtuosoGrid
          style={{ height: window.innerHeight - 350 }}
          context={{ hasMore, isFetching: getAllProductsApiState?.isFetching }}
          className="transition-linear custom-scrollbar dark:custom-scrollbar-darkMode grid w-full gap-0.5 overflow-y-auto overflow-x-hidden scroll-smooth"
          data={Array.isArray(getAllProductsData) ? getAllProductsData : []}
          endReached={() => {
            if (hasMore && !getAllProductsApiState?.isFetching) {
              fetchNextPage();
            }
          }}
          components={getGridComponents({ gridClassName })}
          itemContent={(index, item) => (
            <FoodCard
              key={item?.id}
              category={item?.type}
              categorySlug={item?.barMenuSlug}
              id={item?.id}
              slug={item?.slug}
              title={item?.name}
              subTitle={item?.subTitle}
              currency={`$`}
              foodVolume={`${item?.volume}${item?.unit}`}
              image={
                item?.media?.find((media) => !!media?.isFeatured)?.url ||
                item?.media?.[0]?.url ||
                ""
              }
              price={String(item?.price || 0)}
              onClick={onSelectFood}
              selectedFoodId={selectedFoodId}
              isNotInsideModal={isNotInsideModal}
              type={item?.type}
            />
          )}
        />
      </RenderData>
    </div>
  );
}

export default FoodSelectContent;
