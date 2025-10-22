"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { cn } from "@/lib/utils";
import EmailIcon from "@/components/icons/EmailIcon";

export type TDataProps = {
  id: string | number;
  date: string;
  invoiceDate: string;
  amount: number;
  status:
    | "Paid"
    | "Pending"
    | "Failed"
    | "Cancelled"
    | "Refunded"
    | "Partially Paid"
    | "Overdue"
    | "Draft";
};

export const columns: ColumnDef<TDataProps>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      return (
        <span className="text-sm font-medium leading-5 text-default-600">
          {convertUTCToLocal({
            format: "MMMM DD, YYYY",
            utcDateTime: date,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
    size: 130,
    cell: ({ row }) => {
      const invoiceDate = row.getValue("invoiceDate") as string;
      return (
        <span className="line-clamp-2 text-sm font-normal leading-5 text-default-600">
          {convertUTCToLocal({
            format: "MMMM DD, YYYY",
            utcDateTime: invoiceDate,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Total Amount",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        ${row.getValue("amount")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => (
      <span
        className={cn(
          "flex w-fit items-center justify-center text-xs font-medium leading-[18px] text-default-600",
          {
            "rounded-full border border-[#085D3A] bg-[#053321] px-2 py-0.5 text-[#75E0A7]":
              row.getValue("status") === "Paid",
            "rounded-full border border-[#93370D] bg-[#4E1D09] px-2 py-0.5 text-[#FEC84B]":
              row.getValue("status") === "Pending",
            "rounded-full border border-red-200 bg-red-100 px-2 py-0.5 text-red-600":
              row.getValue("status") === "Failed",
            "rounded-full border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-yellow-600":
              row.getValue("status") === "Cancelled",
            "rounded-full border border-blue-200 bg-blue-100 px-2 py-0.5 text-blue-600":
              row.getValue("status") === "Refunded",
            "rounded-full border border-purple-200 bg-purple-100 px-2 py-0.5 text-purple-600":
              row.getValue("status") === "Partially Paid",
            "rounded-full border border-orange-200 bg-orange-100 px-2 py-0.5 text-orange-600":
              row.getValue("status") === "Overdue",
            "rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 text-gray-600":
              row.getValue("status") === "Draft",
          },
        )}
      >
        {row.getValue("status")}
      </span>
    ),
    size: 150,
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
