"use client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getRefundStatusColor } from "@/lib/get-status-colors";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TPastEventOrder } from "@/store/api/past-event/past-event.types";
import { Badge } from "@/components/ui/badge";

import ActionCell from "./action-cell";

export const columns: ColumnDef<TPastEventOrder>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        {row.getValue("orderId")}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row: { original } }) => (
      <span className="text-nowrap text-sm font-medium text-[#F5F5F6]">
        {original?.customerName || "-"}
      </span>
    ),
  },
  {
    accessorKey: "barName",
    header: "Bar",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-12 rounded-md">
          <Image
            src={getImageFallback({
              src: original?.barImage?.url,
              fallbackImageSize: 100,
            })}
            alt={original?.barName || ""}
            width={50}
            height={32}
            className="size-full"
          />
        </div>
        <h3 className="whitespace-nowrap text-sm text-default-600">
          {original?.barName || "-"}
        </h3>
      </div>
    ),
  },
  {
    accessorKey: "bartenderName",
    header: "Bartender",
    cell: ({ row: { original } }) => (
      <span className="text-nowrap">{original?.bartenderName || "-"}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original } }) => {
      const status = original?.status;
      return (
        <Badge className={getRefundStatusColor(status as string)}>
          {status || "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Amount",
    cell: ({ row }) => (
      <span>
        ${convertToNumber({ value: row.getValue("total"), digit: 3 })}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => (
      <span className="text-nowrap">
        {convertUTCToLocal({
          utcDateTime: row.getValue("createdAt"),
          format: "DD MMM YYYY, h:mm A",
        })}
      </span>
    ),
  },

  {
    accessorKey: "id",
    header: () => <div className="w-full text-center">ACTIONS</div>,
    cell: ActionCell,
  },
];
