"use client";
import { AvatarImage } from "@radix-ui/react-avatar";
import type { ColumnDef } from "@tanstack/react-table";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TInventoryTransferHistoryData } from "@/store/api/inventory-transfer/inventory-transfer.types";
import { Avatar } from "@/components/ui/avatar";
export const columns: ColumnDef<TInventoryTransferHistoryData>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3.5">
        <Avatar>
          <AvatarImage
            src={getImageFallback({
              src: original?.media?.url,
              fallbackImageSize: 100,
            })}
          />
        </Avatar>

        <h2 className="whitespace-nowrap">{original?.name}</h2>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span>
        {convertUTCToLocal({
          utcDateTime: row.getValue("date"),
          format: "DD/MM/YYYY",
        })}
      </span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => <span>{row.getValue("source")}</span>,
  },
  {
    accessorKey: "quantity",
    header: "Transfer Quantity",
    cell: ({ row }) => <span>{row.getValue("quantity")}</span>,
  },
];
