"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getStatusColors } from "@/lib/get-status-colors";
import { calculateSerialNumber } from "@/lib/pagination/calculate-serial-number";
import { cn } from "@/lib/utils";
import type { TPastEventTransaction } from "@/store/api/past-event/past-event.types";
import { MailIcon as EmailIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export type TGetColumns = (props: {
  currentPage: number;
}) => ColumnDef<TPastEventTransaction>[];

export const getColumns: TGetColumns = ({ currentPage }) => [
  {
    accessorKey: "serialNo",
    header: "NO",
    cell: ({ row: { index } }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {calculateSerialNumber({
          index,
          page: currentPage,
          pageSize: 6,
          mode: "page",
        })}
      </span>
    ),
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="text-sm font-medium leading-5 text-default-600">
        {row.getValue("transactionId")}
      </span>
    ),
  },
  {
    accessorKey: "clientName",
    header: "Customer Name",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {row.getValue("clientName")}
      </span>
    ),
  },
  {
    accessorKey: "transactionTime",
    header: "Transaction Time",
    size: 130,
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: original?.transactionTime,
          format: "DD MMMM YYYY, HH:mm",
        })}
      </span>
    ),
  },
  {
    accessorKey: "receiptDate",
    header: "Receipt Date",
    size: 130,
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: original?.receiptDate,
          format: "DD MMMM YYYY",
        })}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row: { original } }) => {
      const category = original?.category;
      return <Badge className={getStatusColors(category)}>{category}</Badge>;
    },
  },
  {
    accessorKey: "id",
    header: "ACTION",
    cell: ({ row: { original } }) => (
      <div className={cn("flex w-fit items-center gap-4")}>
        <a
          className="flex items-center gap-3"
          href="/files/event.csv"
          download="event.csv"
          target="_blank"
        >
          <DownloadIcon className="h-4 w-4 cursor-pointer text-default-600" />
        </a>
        <Link href={"/en/support/contact-support"}>
          <EmailIcon className="size-4" />
        </Link>
      </div>
    ),
  },
];
