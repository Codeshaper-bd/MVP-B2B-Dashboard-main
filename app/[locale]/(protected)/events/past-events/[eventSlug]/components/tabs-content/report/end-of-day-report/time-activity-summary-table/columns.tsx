"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TDataProps } from "./data";

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "time",
    accessorKey: "time",
    header: "TIME",
    cell: ({ row }) => (
      <div className="text-nowrap">{row.getValue("time")}</div>
    ),
  },
  {
    id: "sales",
    accessorKey: "sales",
    header: "SALES",
    cell: ({ row }) => <div>{row.getValue("sales")}</div>,
  },
  {
    id: "percentageCheck",
    accessorKey: "percentageCheck",
    header: "% CHECKS",
    cell: ({ row }) => <div>{row.getValue("percentageCheck")}</div>,
  },
  {
    id: "salesPercentage",
    accessorKey: "salesPercentage",
    header: "% SALES",
    cell: ({ row }) => <div>{row.getValue("salesPercentage")}</div>,
  },
  {
    id: "avgCheck",
    accessorKey: "avgCheck",
    header: "AVG CHECK",
    cell: ({ row }) => <div>{row.getValue("avgCheck")}</div>,
  },
  {
    id: "guest",
    accessorKey: "guest",
    header: "GUESTS",
    cell: ({ row }) => <div>{row.getValue("guest")}</div>,
  },
  {
    id: "avgGuestPercentage",
    accessorKey: "avgGuestPercentage",
    header: "% AVG GUESTS",
    cell: ({ row }) => <div>{row.getValue("avgGuestPercentage")}</div>,
  },
];
