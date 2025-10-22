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
    header: "AMOUNT",
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    id: "avgCustomerSpend",
    accessorKey: "avgCustomerSpend",
    header: "AVG. CUSTOMER SPEND",
    cell: ({ row }) => <div>{row.getValue("avgCustomerSpend")}</div>,
  },
];
