"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import type { TTopPromotion } from "@/store/api/promotion/promotion.types";

import PageNumber from "./page-number";

export const columns: ColumnDef<TTopPromotion>[] = [
  {
    accessorKey: "id",
    header: "NO",
    cell: PageNumber,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="block min-w-[120px] text-sm font-medium leading-5 text-default-1000">
        {row.getValue("name")}
      </span>
    ),
    minSize: 600,
  },
  {
    accessorKey: "totalRevenue",
    header: "Revenue",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        $
        {convertToNumber({
          value: row.getValue("totalRevenue"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "completed",
    header: "Completed Users",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("completed")}
      </span>
    ),
  },
];
