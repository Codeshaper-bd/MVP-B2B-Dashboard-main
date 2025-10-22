"use client";
import type { ColumnDef } from "@tanstack/react-table";

import type { TOrderItemPurchased } from "@/store/api/order-history/order-history.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<TOrderItemPurchased>[] = [
  {
    accessorKey: "itemName",
    header: "Item name",
    cell: ({ row: { original } }) => (
      <div className="flex h-[39px] items-center gap-3">
        <Avatar className="bg-default-200">
          <AvatarImage
            src={original?.media?.url || ""}
            alt={original?.itemName}
          />
          <AvatarFallback>{original?.itemName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-normal leading-5 text-default-600">
          {original?.itemName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row: { original } }) => (
      <div className="flex h-[39px] items-center">
        <span className="text-sm font-normal leading-5 text-default-600">
          {original?.quantity}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="flex h-[39px] items-center">
        <span className="text-sm font-normal leading-5 text-default-600">
          {row.getValue("price")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => (
      <span className="text-sm font-normal leading-5 text-default-600">
        ${row.getValue("totalPrice")}
      </span>
    ),
  },
];
