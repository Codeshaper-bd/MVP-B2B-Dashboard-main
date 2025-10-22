"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TInventoryTransferHistoryData } from "@/store/api/transfer-history/inventory-transfer.types";
import { Badge } from "@/components/ui/badge";

import HistoryAction from "./history-action";

export const columns: ColumnDef<TInventoryTransferHistoryData>[] = [
  {
    accessorKey: "id",
    header: "Transfer ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "barback",
    header: "Initiated By",
    cell: ({ row: { original } }) => (
      <span className="text-default-1000">{original?.barback}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row: { original } }) => (
      <div className="space-y-1">
        <span>{original?.role}</span>
        {original?.eventId && (
          <Image
            src="/images/all-img/fennec-live.png"
            alt="Fennec Live"
            width={100}
            height={16}
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: "from",
    header: "Origin",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-2">
        <div>
          <Image
            src={getImageFallback({
              src: original?.sourceMedia?.[0]?.url,
              fallbackImageSize: 100,
            })}
            alt="origin"
            width={56}
            height={32}
            className="h-10 w-12 rounded-md"
          />
        </div>
        <span className="whitespace-nowrap">{original?.from}</span>
      </div>
    ),
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-2">
        <div>
          <Image
            src={getImageFallback({
              src: original?.destinationMedia?.[0]?.url,
              fallbackImageSize: 100,
            })}
            alt="origin"
            width={56}
            height={32}
            className="h-10 w-12 rounded-md"
          />
        </div>
        <span className="whitespace-nowrap">{original?.to}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original } }) => {
      const status = original?.status;
      return (
        <Badge className={status === "Success" ? "statusGreen" : "statusError"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {convertUTCToLocal({
          utcDateTime: row.getValue("createdAt"),
          format: "h:mm A",
        })}
      </span>
    ),
  },
  {
    accessorKey: crypto.randomUUID(),
    header: "Action",
    cell: HistoryAction,
  },
];
