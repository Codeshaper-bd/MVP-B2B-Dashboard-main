"use client";

import { contentPerPageOptions } from "@/config/client-config";
import useManageSearchParams from "@/hooks/useManageSearchParams";
import { cn } from "@/lib/utils";
import { useGetCompletedTodosQuery } from "@/store/api/todo/todo-api";
import type { TGetAllTodoArgs } from "@/store/api/todo/todo.types";
import BasicPagination from "@/components/pagination/basic-pagination";
import RenderData from "@/components/render-data";
import SkeletonWrapper from "@/components/skeleton/skeleton-wrapper";
import TodoSkeleton from "@/components/skeleton/todo-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import Todo from "./todo";

function CompletedTodos() {
  const { updateMultipleParam, getAllParamValue } = useManageSearchParams<
    Exclude<TGetAllTodoArgs, void | undefined> & {
      completedTodoPageNumber?: number;
    }
  >();
  const {
    sortBy,
    sortOrder,
    tags,
    endDate,
    startDate,
    completedTodoPageNumber,
  } = getAllParamValue();
  const { data: getCompletedTodosRes, ...getCompletedTodosApiState } =
    useGetCompletedTodosQuery({
      sortBy,
      sortOrder,
      tags,
      endDate: endDate && endDate,
      startDate: startDate && startDate,
      page: completedTodoPageNumber || contentPerPageOptions.initialPage,
      pageSize: contentPerPageOptions[10],
    });
  const getCompletedTodosData = getCompletedTodosRes?.data;
  const getCompletedTodosPagination = getCompletedTodosRes?.pagination;

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-default-900">Completed</h3>

      <Card className="border-default-200 bg-default-100 shadow-none">
        <CardContent className="px-0">
          <div
            className={cn(
              (getCompletedTodosPagination?.totalPages ?? 1) > 1
                ? "app-height"
                : "h-[calc(var(--vh,1vh)*100-7rem)]",
            )}
          >
            <RenderData
              {...getCompletedTodosApiState}
              expectedDataType="array"
              data={getCompletedTodosData}
              loadingSkeleton={
                <SkeletonWrapper
                  size={5}
                  className="last-border-none border-border px-5 [&_>div]:border-b [&_>div]:py-5"
                >
                  <TodoSkeleton />
                </SkeletonWrapper>
              }
            >
              <ScrollArea className="h-full">
                <ul className="h-full w-full py-4">
                  {getCompletedTodosData?.map((todo) => (
                    <Todo {...todo} key={todo?.id} />
                  ))}
                </ul>
              </ScrollArea>
            </RenderData>
          </div>

          <div className="px-4 pt-3">
            <BasicPagination
              totalPages={getCompletedTodosPagination?.totalPages || 1}
              hideForTotalPagesOne
              disableUrlState
              isLoading={
                getCompletedTodosApiState.isLoading ||
                getCompletedTodosApiState.isFetching
              }
              onPageChange={(page) => {
                updateMultipleParam({
                  completedTodoPageNumber: page === 1 ? undefined : page,
                });
              }}
              currentPage={completedTodoPageNumber || 1}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompletedTodos;
