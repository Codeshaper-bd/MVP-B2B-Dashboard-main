"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { convertToNumber } from "@/lib/data-types/number";
import { getImageFallback } from "@/lib/media/get-image-fallback";
import type { TBarInventoryItem } from "@/store/api/bars/bars.types";

export const columns: ColumnDef<TBarInventoryItem>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row: { original } }) => (
      <div className="flex items-center gap-3">
        <div className="size-12 flex-none">
          <Image
            src={getImageFallback({
              src:
                original?.media?.find((media) => media?.isFeatured)?.url ||
                original?.media?.[0]?.url,
            })}
            alt={original?.name}
            width={50}
            height={50}
            className="size-full object-cover"
          />
        </div>
        <span className="whitespace-nowrap text-sm font-normal leading-5 text-default-600">
          {original?.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "currentStock",
    header: "Stock Remaning",
    cell: ({ row: { original } }) => (
      <span>
        {convertToNumber({
          value: original?.currentStock,
          digit: 0,
          fallback: 0,
        })}
      </span>
    ),
  },
  {
    accessorKey: "sold",
    header: "Sold",
    cell: ({ row: { original } }) => (
      <span>
        {convertToNumber({ value: original?.sold, digit: 0, fallback: 0 })}
      </span>
    ),
  },
  {
    accessorKey: "stockPercent",
    header: "Stock Percent",
    cell: ({ row: { original } }) => (
      <span className="text-end">
        {convertToNumber({
          value: original?.stockPercentage,
          digit: 0,
          fallback: 0,
        })}
        %
      </span>
    ),
  },
];
