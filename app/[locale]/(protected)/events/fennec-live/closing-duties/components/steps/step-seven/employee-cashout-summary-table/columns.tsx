"use client";
import type { ColumnDef } from "@tanstack/react-table";

import { getStatusColors } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import ActionCell from "./action-cell";

export type TDataProps = {
  id: string | number;
  employee: string;
  role: string;
  amount: number | string;
};

function HeaderText<T>({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-xs font-medium normal-case leading-[18px] text-default-600">
        {title}
      </p>
    </div>
  );
}

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "employee",
    header: "EMPLOYEE",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        {row.getValue("employee")}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="text-xs">
        <Badge className={cn(getStatusColors(row.getValue("role")))}>
          {row.getValue("role")}
        </Badge>
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-1000">
        ${row.getValue("amount")}
      </span>
    ),
  },

  {
    accessorKey: "id",
    header: () => <HeaderText title="ACTION" />,
    cell: ActionCell,
  },
];
