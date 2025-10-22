"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo } from "react";

import useManageSearchParams from "@/hooks/useManageSearchParams";
import { ESortOrder, type TSortOrder } from "@/store/api/common-api-types";

type TMustHave = {
  sortBy?: string;
  sortOrder?: string;
};

const sortingSequence = [
  ESortOrder["DESC"],
  ESortOrder["ASC"],
  undefined,
] as const;
const sortingSequenceLength = sortingSequence.length;

type TColumnSortHeaderProps<T extends TMustHave> = {
  headerTitle: string;
  sortBy: keyof T;
};

function ColumnSortHeader<T extends TMustHave>({
  headerTitle,
  sortBy,
}: TColumnSortHeaderProps<T>) {
  const { getAParamValue, updateMultipleParam } = useManageSearchParams<T>();
  // Exclude<TGetSalesReportByItemListArgs, void | undefined>
  const currentSortBy = getAParamValue("sortBy");
  const currentSortOrder = getAParamValue("sortOrder");
  const isSortingByCurrent =
    typeof currentSortBy !== "undefined" ? currentSortBy === sortBy : true;
  const currentIndex = useMemo(
    () =>
      sortingSequence?.findIndex((order) => order === currentSortOrder) ?? -1,
    [currentSortOrder],
  );

  return (
    <button
      type="button"
      className="flex w-full items-center gap-1"
      onClick={() => {
        let newSortOrder: TSortOrder | undefined = undefined;
        if (!isSortingByCurrent) {
          newSortOrder = sortingSequence?.[0];
        } else {
          newSortOrder =
            sortingSequence?.[(currentIndex + 1) % sortingSequenceLength];
        }

        updateMultipleParam({
          sortBy: newSortOrder ? sortBy : undefined,
          sortOrder: newSortOrder,
        } as Partial<T>);
      }}
    >
      {headerTitle}

      {!!isSortingByCurrent && typeof currentSortOrder !== "undefined" ? (
        currentSortOrder === ESortOrder["ASC"] ? (
          <ArrowUp className="size-4" />
        ) : (
          <ArrowDown className="size-4" />
        )
      ) : null}
    </button>
  );
}

export default ColumnSortHeader;
