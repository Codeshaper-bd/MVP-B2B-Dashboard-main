"use client";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { useGetAllFeedbackQuery } from "@/store/api/feedback/feedback-api";
import type { TGetAllFeedbackArgs } from "@/store/api/feedback/feedback.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import DefaultTable from "@/components/partials/table/DefaultTable";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

import { columns } from "./columns";

function CustomerFeedbackTable() {
  const { getAllParamValue } =
    useManageSearchParams<Exclude<TGetAllFeedbackArgs, void>>();
  const {
    sortBy,
    sortOrder,
    page,
    pageSize,
    search,
    rating,
    startDate,
    endDate,
  } = getAllParamValue();
  const { data: getAllFeedbackDataRes, ...getAllFeedbackApiState } =
    useGetAllFeedbackQuery({
      page: page || contentPerPageOptions.initialPage,
      pageSize: pageSize || contentPerPageOptions[10],
      sortBy,
      sortOrder,
      search,
      rating,
      startDate,
      endDate,
    });
  const getAllFeedbackData = getAllFeedbackDataRes?.data;
  const getAllFeedbackPagination = getAllFeedbackDataRes?.pagination;

  return (
    <RenderData
      data={getAllFeedbackData}
      expectedDataType="array"
      {...getAllFeedbackApiState}
      loadingSkeleton={
        <SkeletonWrapper size={10}>
          <div className="mb-3">
            <Skeleton className="h-10 w-full bg-default-50" />
          </div>
        </SkeletonWrapper>
      }
    >
      <DefaultTable data={getAllFeedbackData} columns={columns}>
        <DefaultTable.Table />
        <DefaultTable.Footer>
          <BasicPagination
            isLoading={
              getAllFeedbackApiState.isLoading ||
              getAllFeedbackApiState.isFetching
            }
            totalPages={getAllFeedbackPagination?.totalPages || 1}
            hideForTotalPagesOne
          />
        </DefaultTable.Footer>
      </DefaultTable>
    </RenderData>
  );
}

export default CustomerFeedbackTable;
