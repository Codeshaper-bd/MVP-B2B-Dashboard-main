"use client";
import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type TDataProps = {
  id?: string | number;
  rank?: string | number;
  paymentMethod?: string;
  totalTransactions?: string | number;
  totalRevenue?: string | number;
  totalPercentage?: string | number;
  logo?: string;
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "rank",
    header: () => <span className="normal-case">Rank</span>,
    cell: ({ row }) => (
      <div className="text-sm font-normal leading-5 text-default-600">
        {row.original?.rank}
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: () => <span className="normal-case">Payment Method</span>,
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-10 rounded-[4px]">
          <AvatarImage src={original?.logo} alt={original?.paymentMethod} />
          <AvatarFallback>
            {original?.paymentMethod?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {original?.paymentMethod}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalTransactions",
    header: () => <span className="normal-case">Total Transactions</span>,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-sm font-normal leading-5 text-default-600">
          {row.getValue("totalTransactions")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalRevenue",
    header: () => <span className="normal-case">Total Revenue</span>,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-sm font-normal leading-5 text-default-600">
          {row.getValue("totalRevenue")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalPercentage",
    header: () => <span className="normal-case">% of Total</span>,
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="text-sm font-normal leading-5 text-default-600">
          {row.getValue("totalPercentage")}
        </span>
      </div>
    ),
  },
];
