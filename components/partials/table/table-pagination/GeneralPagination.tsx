import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import {
  type TGeneratePaginationProps,
  type TPaginationItemType,
  generatePagination,
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

interface IGeneralPaginationProps {
  paginationProps?: TGeneratePaginationProps;
}

function GeneralPagination({ paginationProps }: IGeneralPaginationProps) {
  const { updateAParam } = useManageSearchParams<{
    page: number;
  }>();
  const { generatedPagination } = generatePagination(paginationProps);

  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationButtonPrevious
            onClick={handlePageChange({
              updateAParam,
              visiblePage: {
                type: "page",
                page: (paginationProps?.currentPage ?? 2) - 1,
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

        <PaginationItem>
          <PaginationContent>
            {generatedPagination?.map((visiblePage, index) => (
              <PaginationItem key={index}>
                <PaginationButton
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
              <PaginationButton>1</PaginationButton>
            </PaginationItem>

            <PaginationItem>
              <PaginationButton isActive>2</PaginationButton>
            </PaginationItem>

            <PaginationItem>
              <PaginationButton>3</PaginationButton>
            </PaginationItem>

            <PaginationItem>
              <PaginationButton>...</PaginationButton>
            </PaginationItem>

            <PaginationItem>
              <PaginationButton>8</PaginationButton>
            </PaginationItem>

            <PaginationItem>
              <PaginationButton>9</PaginationButton>
            </PaginationItem>

            <PaginationItem>
              <PaginationButton>10</PaginationButton>
            </PaginationItem> */}
          </PaginationContent>
        </PaginationItem>

        <PaginationItem>
          <PaginationButtonNext
            onClick={handlePageChange({
              updateAParam,
              visiblePage: {
                type: "page",
                page: (paginationProps?.currentPage ?? 1) + 1,
                disabled:
                  paginationProps?.currentPage === paginationProps?.totalPages,
              },
            })}
            disabled={
              paginationProps?.currentPage === paginationProps?.totalPages
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default GeneralPagination;
