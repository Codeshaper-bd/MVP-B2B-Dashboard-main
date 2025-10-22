"use client";
import { AvatarImage } from "@radix-ui/react-avatar";
import type { ColumnDef } from "@tanstack/react-table";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TShipmentHistory } from "@/store/api/shipment/shipment.types";
import { Avatar } from "@/components/ui/avatar";

export const columns: ColumnDef<TShipmentHistory>[] = [
  {
    accessorKey: "id",
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
        <div>
          <h2 className="whitespace-nowrap">{original?.name}</h2>
          <div className="text-xs text-default-700">12 oz</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span>
        {convertUTCToLocal({
          utcDateTime: row.getValue("createdAt"),
          format: "DD/MM/YYYY",
        })}
      </span>
    ),
  },
  {
    accessorKey: "newStock",
    header: "Units receive",
    cell: ({ row }) => <span>{row.getValue("newStock")}</span>,
  },
  {
    accessorKey: "cost",
    header: "Total Price",
    cell: ({ row }) => <span>{row.getValue("cost")}</span>,
  },
];
