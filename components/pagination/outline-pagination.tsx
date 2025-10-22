import { memo, useCallback, useMemo } from "react";

import useManageSearchParams, {
  type TUseManageSearchParamsReturnType,
} from "@/hooks/useManageSearchParams";
import {
  generatePagination,
  type TGeneratePaginationProps,
} from "@/lib/pagination/generate-pagination";
import type { TPaginationArgs } from "@/store/api/common-api-types";
import {
  Pagination,
  PaginationButton,
  PaginationButtonNext,
  PaginationButtonPrevious,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface IOutlinePaginationProps
  extends Exclude<TGeneratePaginationProps, null | undefined | void> {
  onPageChange?: (page: number) => void;
  disableUrlState?: boolean;
  isLoading?: boolean;
  hideForTotalPagesOne?: boolean;
}

function OutlinePagination({
  currentPage = 1,
  totalPages = 1,
  siblingCount = 1,
  onPageChange,
  disableUrlState,
  isLoading,
  hideForTotalPagesOne,
}: IOutlinePaginationProps) {
  const { getAParamValue, updateAParam } =
    useManageSearchParams<Exclude<TPaginationArgs, void | undefined>>();

  const finalCurrentPage = disableUrlState
    ? currentPage
    : Number(getAParamValue("page") || 1);

  const {
    generatedPagination,
    isPreviousButtonDisabled,
    isNextButtonDisabled,
  } = useMemo(
    () =>
      generatePagination({
        currentPage: finalCurrentPage,
        totalPages,
        siblingCount,
      }),
    [finalCurrentPage, totalPages, siblingCount],
  );

  const handlePageChange = useCallback(
    ({
      onPageChange,
      pageNumber,
      updateAParam,
      disableUrlState,
      isPageChangeDisabled,
    }: Pick<IOutlinePaginationProps, "onPageChange" | "disableUrlState"> & {
      pageNumber: number;
      updateAParam: TUseManageSearchParamsReturnType<
        Exclude<TPaginationArgs, void | undefined>
      >["updateAParam"];
      isPageChangeDisabled: boolean;
    }) =>
      () => {
        if (!disableUrlState) {
          if (pageNumber > 1) {
            updateAParam({
              key: "page",
              value: pageNumber,
            });
            return;
          }

          updateAParam({
            key: "page",
            value: undefined,
          });

          updateAParam({
            key: "pageSize",
            value: undefined,
          });
        }

        onPageChange?.(pageNumber);
      },
    [],
  );

  if (hideForTotalPagesOne && totalPages === 1) {
    return null;
  }

  return (
    <div>
      <Pagination>
        <PaginationContent variant="outline">
          <PaginationItem>
            <PaginationButtonPrevious
              variant="outline"
              isLeftRounded
              disabled={isPreviousButtonDisabled || !!isLoading}
              onClick={handlePageChange({
                disableUrlState,
                updateAParam,
                onPageChange,
                pageNumber: finalCurrentPage ? finalCurrentPage - 1 : 1,
                isPageChangeDisabled: isPreviousButtonDisabled || !!isLoading,
              })}
            />
          </PaginationItem>

          {generatedPagination?.map((item, index) => {
            switch (item.type) {
              case "page": {
                return (
                  <PaginationItem key={`${index}-page`}>
                    <PaginationButton
                      variant="outline"
                      isActive={finalCurrentPage === item.page}
                      onClick={handlePageChange({
                        onPageChange,
                        updateAParam,
                        pageNumber: item.page,
                        disableUrlState,
                        isPageChangeDisabled: item?.disabled,
                      })}
                      disabled={!!isLoading}
                    >
                      {item.page}
                    </PaginationButton>
                  </PaginationItem>
                );
              }

              case "ellipsis": {
                return (
                  <PaginationItem key={`${index}-ellipsis`}>
                    <PaginationButton
                      variant="outline"
                      disabled={item?.disabled || !!isLoading}
                    >
                      ...
                    </PaginationButton>
                  </PaginationItem>
                );
              }

              default:
                return null;
            }
          })}

          <PaginationItem>
            <PaginationButtonNext
              variant="outline"
              isRightRounded
              disabled={isNextButtonDisabled || !!isLoading}
              onClick={handlePageChange({
                onPageChange,
                pageNumber: finalCurrentPage
                  ? finalCurrentPage + 1
                  : (totalPages ?? 1),
                updateAParam,
                disableUrlState,
                isPageChangeDisabled: isNextButtonDisabled || !!isLoading,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default memo(OutlinePagination);
