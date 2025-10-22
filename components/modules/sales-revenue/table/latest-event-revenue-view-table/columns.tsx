"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { convertUTCToLocal } from "@/lib/date-time/utc-date";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TEventRevenue } from "@/store/api/sales-revenue/sales-revenue.types";

export const columns: ColumnDef<TEventRevenue>[] = [
  {
    accessorKey: "name",
    header: "EVENT NAME",
    cell: ({ row: { original } = {} }) => (
      <div className="flex items-center gap-3">
        <Image
          src={getImageFallback({ src: original?.media?.url })}
          alt={String(original?.name)}
          width={46}
          height={32}
          className="shrink-0"
        />

        <p className="w-full max-w-[220px] truncate text-sm font-medium leading-5 text-default-900">
          {original?.name}
        </p>
      </div>
    ),
    minSize: 500,
  },
  {
    header: "START DATE",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: original?.startTime,
        })}
      </span>
    ),
  },
  {
    header: "END DATE",
    cell: ({ row: { original } }) => (
      <span className="whitespace-nowrap text-sm font-medium leading-5 text-default-600">
        {convertUTCToLocal({
          utcDateTime: original?.endTime,
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
