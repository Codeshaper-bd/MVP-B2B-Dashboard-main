"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TDataProps } from "./data";

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="text-nowrap">{row.getValue("type") || "-"}</div>
    ),
  },
  {
    id: "discount",
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => <div>{row.getValue("discount") || "-"}</div>,
  },
  {
    id: "actual",
    accessorKey: "actual",
    header: "Actual",
    cell: ({ row }) => <div>{row.getValue("actual") || "-"}</div>,
  },
  {
    id: "reason",
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <div>{row.getValue("reason") || "-"}</div>,
  },
  {
    id: "authBy",
    accessorKey: "authBy",
    header: "AUTH.BY",
    cell: ({ row }) => <div>{row.getValue("authBy") || "-"}</div>,
  },
  {
    id: "checkNo",
    accessorKey: "checkNo",
    header: "CHECK no.",
    cell: ({ row }) => <div>{row.getValue("checkNo") || "-"}</div>,
  },
  {
    id: "date",
    accessorKey: "date",
    header: "date",
    cell: ({ row }) => <div>{row.getValue("date") || "-"}</div>,
  },
];
