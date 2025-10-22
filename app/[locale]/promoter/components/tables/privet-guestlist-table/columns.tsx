"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type TDataProps = {
  id: string | number;
  no: string | number;
  name: string;
  spotsReserved: string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "no",
    header: "NO",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("no")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "spotsReserved",
    header: "Spots Reserved",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {row.getValue("spotsReserved")}
        </span>
      </div>
    ),
  },
];
