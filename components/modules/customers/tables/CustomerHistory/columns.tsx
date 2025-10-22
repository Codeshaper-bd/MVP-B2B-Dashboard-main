"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { getRefundStatusColor } from "@/lib/get-status-colors";
import type { TInvitedCustomer } from "@/store/api/customer-lookup/customer-lookup.types";
import { Badge } from "@/components/ui/badge";

export type TGetColumns = (props: {
  currentPage: number;
}) => ColumnDef<TInvitedCustomer>[];
export const getColumns: TGetColumns = ({ currentPage }) => [
  {
    accessorKey: "userId",
    header: "Customer Id",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("userId") || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("email")}
      </span>
    ),
  },

  {
    id: "phone",
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        +{row.getValue("phone")}
      </span>
    ),
  },
  {
    id: "statusObj",
    accessorKey: "statusObj",
    header: "Status",
    cell: ({ row: { original } }) => {
      const statusName = original?.Status?.name;
      return (
        <Badge className={getRefundStatusColor(statusName ?? "")}>
          {statusName}
        </Badge>
      );
    },
  },
];
