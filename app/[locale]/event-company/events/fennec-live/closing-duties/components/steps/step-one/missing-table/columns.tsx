"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type TDataProps = {
  id: string | number;
  category: number | string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("category")}
      </span>
    ),
  },
];
