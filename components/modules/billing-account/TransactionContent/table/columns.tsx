"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getPaymentStatusColor } from "@/lib/get-status-colors";
import type { TTransaction } from "@/store/api/transactions/transactions.types";
import { Badge } from "@/components/ui/badge";

import TransactionAction from "./TransactionAction";

export const columns: ColumnDef<TTransaction>[] = [
  {
    accessorKey: "id",
    header: "ID INVOICES",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "CUSTOMER NAME",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {row.getValue("customerName")}
      </span>
    ),
  },
  {
    accessorKey: "eventName",
    header: "EVENT NAME",
    cell: ({ row }) => (
      <span className="block max-w-[256px] truncate text-sm font-medium leading-5 text-default-600">
        {row.getValue("eventName")}
      </span>
    ),
    size: 300,
  },
  {
    accessorKey: "eventStartTime",
    header: "Event date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: row.getValue("eventStartTime"),
          format: "MMM D, YYYY",
        })}
      </span>
    ),
  },
  {
    accessorKey: "transactionTime",
    header: "INVOICE DATE",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: row.getValue("transactionTime"),
          format: "MMM D, YYYY",
        })}
      </span>
    ),
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Invoice TIME",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-medium lowercase leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: original.transactionTime,
          format: "hh:mm A",
        })}
      </span>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <Badge className={getPaymentStatusColor(row.getValue("paymentStatus"))}>
        {row.getValue("paymentStatus")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        $
        {convertToNumber({
          value: row.getValue("amount"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "ACTION",
    cell: TransactionAction,
  },
];
