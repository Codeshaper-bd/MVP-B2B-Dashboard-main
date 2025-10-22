"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import type { TGetFennecLiveB2BPromotions } from "@/store/api/fennec-live/fennec-live.types";

import ActionCell from "./action-cell";

export const columns: ColumnDef<TGetFennecLiveB2BPromotions>[] = [
  {
    accessorKey: "id",
    header: "NO",
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-5 text-default-900">
        {row.index + 1}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="w-[100px] truncate text-sm font-medium leading-5 text-default-900 md:w-[150px]">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "uses",
    header: "Uses",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-900">
        {row.getValue("uses")}
      </span>
    ),
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-900">
        $
        {convertToNumber({
          value: row.getValue("revenue"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ActionCell,
  },
];
