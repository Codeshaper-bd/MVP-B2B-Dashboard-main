"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { TDataProps } from "./data";

export const columns: ColumnDef<TDataProps>[] = [
  {
    id: "category",
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    id: "orders",
    accessorKey: "orders",
    header: "ORDERS",
    cell: ({ row }) => <div>{row.getValue("orders")}</div>,
  },
  {
    id: "percentage",
    accessorKey: "percentage",
    header: "%",
    cell: ({ row }) => <div>{row.getValue("percentage")}</div>,
  },
  {
    id: "grossSales",
    accessorKey: "grossSales",
    header: "GROSS SALES",
    cell: ({ row }) => <div>{row.getValue("grossSales")}</div>,
  },
  {
    id: "netSales",
    accessorKey: "netSales",
    header: "NET SALES",
    cell: ({ row }) => <div>{row.getValue("netSales")}</div>,
  },
  {
    id: "avgOrderPercentage",
    accessorKey: "avgOrderPercentage",
    header: "% AVG ORDer",
    cell: ({ row }) => <div>{row.getValue("avgOrderPercentage")}</div>,
  },
];
