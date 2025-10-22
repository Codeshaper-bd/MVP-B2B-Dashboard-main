"use client";
import type { ColumnDef } from "@tanstack/react-table";

import { getRefundStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import type { TOrder } from "@/store/api/order-history/order-history.types";
import { Badge } from "@/components/ui/badge";

import ActionCell from "./action-cell";
import PageNumber from "./page-number";

export const columns: ColumnDef<TOrder>[] = [
  {
    id: "no",
    accessorKey: "no",
    header: "No.",
    cell: PageNumber,
  },
  {
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row: { original } }) => <span>{original?.id}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap">{original?.customer?.name}</span>
    ),
  },
  {
    id: "orderDate",
    accessorKey: "date",
    header: "Order Date AND TIME",
    cell: ({ row: { original } }) => <span>{original?.date}</span>,
  },

  {
    id: "totalAmount",
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row: { original } }) => <span>${original?.totalAmount}</span>,
  },
  {
    id: "orderStatus",
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row: { original } }) => (
      <Badge className={cn(getRefundStatusColor(original?.status?.name))}>
        {original?.status?.name}
      </Badge>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="w-full text-center">ACTIONS</div>,
    cell: ActionCell,
  },
];
