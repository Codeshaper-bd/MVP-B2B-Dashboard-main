"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TDataProps } from "./data";

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "barArea",
    accessorKey: "barArea",
    header: "BAR/AREA",
    cell: ({ row }) => <div>{row.getValue("barArea")}</div>,
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: () => <div className="text-end">AMOUNT</div>,
    cell: ({ row }) => (
      <div className="text-end text-success">{row.getValue("amount")}</div>
    ),
  },
];
