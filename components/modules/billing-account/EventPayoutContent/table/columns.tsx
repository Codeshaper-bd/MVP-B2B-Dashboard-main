"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getRefundStatusColor } from "@/lib/get-status-colors";
import { cn } from "@/lib/utils";
import type { TGetAnEventPayout } from "@/store/api/events/events.types";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { MailIcon as EmailIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<TGetAnEventPayout>[] = [
  {
    accessorKey: "id",
    header: "ID INVOICES",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "eventDetails",
    header: "EVENT NAME",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap">{original?.eventDetails?.name}</span>
    ),
  },
  {
    accessorKey: "eventDetails.startDate",
    header: "Event date",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap">
        {convertUTCToLocal({
          utcDateTime: original?.eventDetails?.startDate,
          format: "MMM DD, YYYY",
        })}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Invoice date",
    cell: ({ row }) => (
      <span>
        {convertUTCToLocal({
          utcDateTime: row.getValue("createdAt"),
          format: "MMM DD, YYYY",
        })}
      </span>
    ),
  },
  {
    accessorKey: "grossRevenue",
    header: "Total Revenue",
    cell: ({ row }) => (
      <span>
        $
        {convertToNumber({
          value: row.getValue("grossRevenue"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "totalTaxCollected",
    header: "Total Taxes",
    cell: ({ row }) => (
      <span>
        $
        {convertToNumber({
          value: row.getValue("totalTaxCollected"),
          digit: 2,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "netRevenue",
    header: "Total Payout",
    cell: ({ row: { original } }) => {
      const totalRevenue = convertToNumber({
        value: original.grossRevenue,
        digit: 2,
        fallback: 0,
      });
      const totalTax = convertToNumber({
        value: original.totalTaxCollected,
        digit: 2,
        fallback: 0,
      });
      const totalPayout = totalRevenue + totalTax;
      return <span>${totalPayout}</span>;
    },
  },
  {
    accessorKey: "payoutStatus",
    header: "STATUS",
    cell: ({ row }) => (
      <Badge className={getRefundStatusColor(row.getValue("payoutStatus"))}>
        {row.getValue("payoutStatus")}
      </Badge>
    ),
    size: 150,
  },
  {
    accessorKey: "organizationId",
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
