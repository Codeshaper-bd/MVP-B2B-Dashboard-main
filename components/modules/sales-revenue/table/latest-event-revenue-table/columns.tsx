"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TEventRevenue } from "@/store/api/sales-revenue/sales-revenue.types";
import TablePageNumber from "@/components/features/TablePageNumber";

export const columns: ColumnDef<TEventRevenue>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "No.",
    cell: TablePageNumber,
  },
  {
    accessorKey: "name",
    header: "EVENT NAME",
    cell: ({ row: { original } = {} }) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-[46px]">
          <Image
            src={getImageFallback({ src: original?.media?.url })}
            alt={String(original?.name)}
            width={48}
            height={48}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>

        <p className="w-full max-w-[220px] truncate text-sm font-medium leading-5 text-default-900">
          {original?.name}
        </p>
      </div>
    ),
    minSize: 500,
  },
  {
    header: "Start Date & Time",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: original?.startTime,
          format: "DD MMM YYYY, hh:mm A",
        })}
      </span>
    ),
  },
  {
    header: "End Date & Time",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: original?.endTime,
          format: "DD MMM YYYY, hh:mm A",
        })}
      </span>
    ),
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row: { original } }) => {
      const revenue = original?.revenue?.toFixed(2);
      return (
        <span className="text-sm font-medium leading-5 text-default-600">
          ${revenue}
        </span>
      );
    },
  },
];
