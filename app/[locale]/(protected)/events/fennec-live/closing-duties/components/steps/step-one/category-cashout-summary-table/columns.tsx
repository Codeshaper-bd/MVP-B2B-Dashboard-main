"use client";

import type { ColumnDef } from "@tanstack/react-table";

import ActionCell from "./action-cell";

export type TDataProps = {
  id: string | number;
  category: number | string;
  cashOnHand: number | string;
  pra: number | string;
  debitTerminal: number | string;
  completed: number | string;
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
  {
    accessorKey: "cashOnHand",
    header: "Cash On Hand",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {((val) => (typeof val === "number" ? `$${val}` : val))(
          row.getValue("cashOnHand"),
        )}
      </span>
    ),
  },
  {
    accessorKey: "pra",
    header: "POS Read Amount",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        ${row.getValue("pra")}
      </span>
    ),
  },
  {
    accessorKey: "debitTerminal",
    header: "Debit Terminal",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {((val) => (typeof val === "number" ? `$${val}` : val))(
          row.getValue("debitTerminal"),
        )}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "ACTION",
    cell: ActionCell,
  },
];
