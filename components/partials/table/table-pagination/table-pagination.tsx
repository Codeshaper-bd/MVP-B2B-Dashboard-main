"use client";
import { memo } from "react";

import type { TGeneratePaginationProps } from "@/lib/pagination/generate-pagination";

import { useTableContext } from "../TableProvider";
import GeneralPagination from "./GeneralPagination";
import OutlinePagination from "./OutlinePagination";

interface DataTablePaginationProps {
  // table: Table<any>;
  type?: "general" | "outline";
  paginationProps?: TGeneratePaginationProps | null;
}

function TablePagination({
  type = "general",
  paginationProps,
}: DataTablePaginationProps) {
  const { table } = useTableContext();

  if (type === "outline") {
    return <OutlinePagination paginationProps={paginationProps} />;
  }

  return <GeneralPagination paginationProps={paginationProps} />;
}

export default memo(TablePagination);
