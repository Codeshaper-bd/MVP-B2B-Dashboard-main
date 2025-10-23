"use client";
import Link from "next/link";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetTopPromotionsQuery } from "@/store/api/promotion/promotion-api";
import type { TGetTopPromotionArgs } from "@/store/api/promotion/promotion.types";
import { ArrowRightIcon as RightArrowIcon } from "@/components/icons";
import StarIcon from "@/components/icons/StarIcon";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Button } from "@/components/ui/button";

import type { TDateRange } from "../promotions-content";
import { columns } from "./columns";

function TopPromotionsTable({ dateRange }: { dateRange: TDateRange }) {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetTopPromotionArgs, void>>();
  const { page, pageSize } = getAllParamValue();
  const { data: getTopPromotionsRes, ...getTopPromotionsApiState } =
    useGetTopPromotionsQuery({
      startDate: dateRange.from,
      endDate: dateRange.to,
      page: page || 1,
      pageSize: pageSize || 5,
    });
  const getTopPromotionsData = getTopPromotionsRes?.data;
  const getTopPromotionsPagination = getTopPromotionsRes?.pagination;
  return (
    <DefaultTable data={getTopPromotionsData} columns={columns}>
      <DefaultTable.TitleContainer>
        <DefaultTable.TitleContainer.Title className="flex items-center gap-2">
          <StarIcon className="h-[19.54px] w-[20.54px] text-default-1000" />
          Top Promotion
        </DefaultTable.TitleContainer.Title>
      </DefaultTable.TitleContainer>
      <RenderData
        expectedDataType="array"
        data={getTopPromotionsData}
        {...getTopPromotionsApiState}
        loadingSkeleton={<TableSkeleton length={5} />}
      >
        <DefaultTable.Table />
      </RenderData>

      <DefaultTable.Footer>
        <div>
          <BasicPagination
            isLoading={
              getTopPromotionsApiState.isLoading ||
              getTopPromotionsApiState.isFetching
            }
            totalPages={getTopPromotionsPagination?.totalPages || 1}
            hideForTotalPagesOne
          />
          <div className="h-5"></div>
          <div className="px-4 pb-4">
            <Button asChild fullWidth color="secondary">
              <Link href="/en/dashboard/promotions/view-more-promotion">
                View All <RightArrowIcon className="ms-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </DefaultTable.Footer>
    </DefaultTable>
  );
}

export default TopPromotionsTable;
