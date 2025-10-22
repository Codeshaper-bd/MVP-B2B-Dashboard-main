"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type TDataProps = {
  id: string | number;
  name: string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "name",
    header: "EMPLOYEE",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("name")}
      </span>
    ),
  },
];
