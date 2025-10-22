"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TChallengePromotion } from "@/store/api/past-event/past-event.types";

export const columns: ColumnDef<TChallengePromotion>[] = [
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
        ${row.getValue("revenue")}
      </span>
    ),
  },
];
