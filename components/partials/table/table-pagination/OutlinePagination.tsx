import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import {
  generatePagination,
  type TGeneratePaginationProps,
  type TPaginationItemType,
} from "@/lib/pagination/generate-pagination";
import {
  Pagination,
  PaginationButton,
  PaginationButtonNext,
  PaginationButtonPrevious,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const handlePageChange =
  ({
    updateAParam,
    visiblePage,
  }: {
    updateAParam: ({
      key,
      value,
      options,
    }: {
      key: "page";
      value: unknown;
      options?: NavigateOptions | void | undefined | null;
    }) => void;
    visiblePage: TPaginationItemType;
  }) =>
  () => {
    if (visiblePage?.type === "page") {
      updateAParam({
        key: "page",
        value: visiblePage.page === 1 ? undefined : visiblePage.page,
      });
    }
  };

interface IOutlinePaginationProps {
  paginationProps?: TGeneratePaginationProps | null;
}

function OutlinePagination({ paginationProps }: IOutlinePaginationProps) {
  const { updateAParam } = useManageSearchParams<{
    page: number;
  }>();
  const { generatedPagination } = generatePagination(paginationProps);

  return (
    <div>
      <Pagination>
        <PaginationContent variant="outline">
          <PaginationItem>
            <PaginationButtonPrevious
              variant="outline"
              isLeftRounded
              onClick={handlePageChange({
                updateAParam,
                visiblePage: {
                  type: "page",
                  page: (paginationProps?.currentPage ?? 1) - 1,
                  disabled:
                    paginationProps?.currentPage === 1 ||
                    paginationProps?.currentPage === undefined,
                },
              })}
              disabled={
                paginationProps?.currentPage === 1 ||
                paginationProps?.currentPage === undefined
              }
            />
          </PaginationItem>

          {generatedPagination?.map((visiblePage, index) => (
            <PaginationItem key={index}>
              <PaginationButton
                variant="outline"
                isActive={
                  visiblePage?.type === "page"
                    ? visiblePage.page === paginationProps?.currentPage
                    : false
                }
                onClick={handlePageChange({ updateAParam, visiblePage })}
                disabled={visiblePage.disabled}
              >
                {visiblePage?.type === "page" ? visiblePage.page : "..."}
              </PaginationButton>
            </PaginationItem>
          ))}

          {/* <PaginationItem>
            <PaginationButton variant="outline">1</PaginationButton>
          </PaginationItem>

          <PaginationItem>
            <PaginationButton variant="outline" isActive>
              2
            </PaginationButton>
          </PaginationItem>

          <PaginationItem>
            <PaginationButton variant="outline">3</PaginationButton>
          </PaginationItem>

          <PaginationItem>
            <PaginationButton variant="outline">...</PaginationButton>
          </PaginationItem>

          <PaginationItem>
            <PaginationButton variant="outline">8</PaginationButton>
          </PaginationItem>

          <PaginationItem>
            <PaginationButton variant="outline">9</PaginationButton>
          </PaginationItem>

          <PaginationItem>
            <PaginationButton variant="outline">10</PaginationButton>
          </PaginationItem> */}

          <PaginationItem>
            <PaginationButtonNext
              variant="outline"
              isRightRounded
              onClick={handlePageChange({
                updateAParam,
                visiblePage: {
                  type: "page",
                  page: (paginationProps?.currentPage ?? 0) + 1,
                  disabled:
                    paginationProps?.currentPage ===
                    paginationProps?.totalPages,
                },
              })}
              disabled={
                paginationProps?.currentPage === paginationProps?.totalPages
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default OutlinePagination;
