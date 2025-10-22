"use client";
import { AvatarImage } from "@radix-ui/react-avatar";
import type { ColumnDef } from "@tanstack/react-table";

import { convertToNumber } from "@/lib/data-types/number";
import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TShipmentHistory } from "@/store/api/shipment/shipment.types";
import { Avatar } from "@/components/ui/avatar";

export const getColumns = (soldBy: string): ColumnDef<TShipmentHistory>[] => {
  const isUnit = soldBy === "UNIT";

  return [
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

          <h2 className="whitespace-nowrap">{original?.name}</h2>
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
      accessorKey: isUnit ? "currentStockInCase" : "currentStock",
      header: isUnit ? "Old Stock (cases)" : "Old Stock",
      cell: ({ row }) => (
        <span>
          {row.getValue(isUnit ? "currentStockInCase" : "currentStock")}
        </span>
      ),
    },
    // {
    //   accessorKey: isUnit ? "newStockInCase" : "currentStock",
    //   header: isUnit ? "Cases received" : "Units received",
    //   cell: ({ row }) => (
    //     <span>{row.getValue(isUnit ? "newStockInCase" : "currentStock")}</span>
    //   ),
    // },
    {
      accessorKey: "casesReceived",
      header: isUnit ? "Cases received" : "Units received",
      cell: ({ row }) => <span>{row.getValue("casesReceived")}</span>,
    },
    {
      accessorKey: isUnit ? "newStockInCase" : "newStock",
      header: isUnit ? "New Stock (cases)" : "New Stock",
      cell: ({ row }) => (
        <span>{row.getValue(isUnit ? "newStockInCase" : "newStock")}</span>
      ),
    },
    {
      accessorKey: "cost",
      header: "Total Price",
      cell: ({ row }) => (
        <span>
          ${convertToNumber({ value: row.getValue("cost"), digit: 2 })}
        </span>
      ),
    },
  ];
};
