const getProcessedPropsValue = (props: TGeneratePaginationProps) => {
  const nonNullProps = props || {};
  const modifiedProps: {
    totalPages: number;
    currentPage: number;
    siblingCount: number;
  } = {
    totalPages: nonNullProps.totalPages || 1,
    currentPage: nonNullProps.currentPage || 1,
    siblingCount: nonNullProps.siblingCount || 1,
  };
  return modifiedProps;
};

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export type TPaginationItemType =
  | {
      type: "page";
      page: number;
      disabled: boolean;
    }
  | {
      type: "ellipsis";
      disabled: boolean;
    };

export type TGeneratePaginationProps =
  | {
      totalPages?: number | undefined | null;
      currentPage?: number | undefined | null;
      siblingCount?: number | undefined | null;
    }
  | void
  | null
  | undefined;

export type TGeneratePaginationReturnType = {
  generatedPagination: TPaginationItemType[];
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
};

export const generatePagination = (
  props: TGeneratePaginationProps,
): TGeneratePaginationReturnType => {
  const { totalPages, currentPage, siblingCount } =
    getProcessedPropsValue(props);

  if (totalPages <= 1) {
    return {
      generatedPagination: [
        {
          type: "page",
          page: 1,
          disabled: true,
        },
      ],
      isPreviousButtonDisabled: true,
      isNextButtonDisabled: true,
    };
  }

  const pagination: TPaginationItemType[] = [];

  const leftSiblingStart = Math.max(2, currentPage - siblingCount);
  const rightSiblingEnd = Math.min(totalPages - 1, currentPage + siblingCount);

  const shouldShowLeftEllipsis = leftSiblingStart > 2;
  const shouldShowRightEllipsis = rightSiblingEnd < totalPages - 1;

  // Add the first page
  pagination.push({
    type: "page",
    page: 1,
    disabled: currentPage === 1,
  });

  // Add left ellipsis if needed
  if (shouldShowLeftEllipsis) {
    pagination.push({
      type: "ellipsis",
      disabled: true,
    });
  }

  // Add sibling pages
  for (const page of range(leftSiblingStart, rightSiblingEnd)) {
    pagination.push({
      type: "page",
      page,
      disabled: page === currentPage,
    });
  }

  // Add right ellipsis if needed
  if (shouldShowRightEllipsis) {
    pagination.push({
      type: "ellipsis",
      disabled: true,
    });
  }

  // Add the last page
  pagination.push({
    type: "page",
    page: totalPages,
    disabled: currentPage === totalPages,
  });

  return {
    generatedPagination: pagination,
    isPreviousButtonDisabled: currentPage <= 1,
    isNextButtonDisabled: currentPage >= totalPages,
  };
};
